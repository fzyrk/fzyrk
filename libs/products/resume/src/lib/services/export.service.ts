import { Injectable, inject, NgZone, DOCUMENT } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { ToastService } from './toast.service';

// A4 dimensions in millimetres
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
// Margins inside the PDF page (top/bottom/left/right)
const MARGIN_MM = 12;

@Injectable({ providedIn: 'root' })
export class ExportService {
  private readonly ngZone = inject(NgZone);
  private readonly document = inject(DOCUMENT);
  private readonly toastService = inject(ToastService);

  async exportToPdf(element: HTMLElement, filename: string = 'resume.pdf'): Promise<void> {
    return this.ngZone.runOutsideAngular(async () => {
      try {
        // ── 1. Capture the entire resume element as a high-res canvas ──
        //    scale:2 gives crisp 2× DPI so text is sharp in the PDF.
        //    We snapshot at the element's actual rendered size, which may be
        //    taller than one A4 page.
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          allowTaint: false,
          backgroundColor: '#ffffff',
          logging: false,
          // Snapshot the full scroll height, not just the visible viewport
          windowWidth: element.scrollWidth,
          windowHeight: element.scrollHeight,
          width: element.offsetWidth,
          height: element.scrollHeight,
        });

        const canvasPxW = canvas.width;   // px at 2× scale
        const canvasPxH = canvas.height;  // full height at 2× scale

        // ── 2. Set up the PDF ──
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
          compress: true,
        });

        // Printable area inside the margins
        const printableW = A4_WIDTH_MM - MARGIN_MM * 2;  // mm
        const printableH = A4_HEIGHT_MM - MARGIN_MM * 2; // mm

        // Pixel height that corresponds to one printable page
        // (keep aspect ratio: px/page = canvasPxW × (printableH / printableW))
        const pxPerPage = Math.floor(canvasPxW * (printableH / printableW));

        const totalPages = Math.ceil(canvasPxH / pxPerPage);

        // ── 3. Slice the canvas into A4-sized strips ──
        for (let page = 0; page < totalPages; page++) {
          if (page > 0) pdf.addPage();

          const srcY = page * pxPerPage;              // canvas Y start for this page
          const srcH = Math.min(pxPerPage, canvasPxH - srcY); // actual pixels available

          // Draw only the slice for this page onto a temporary canvas
          const pageCanvas = this.document.createElement('canvas');
          pageCanvas.width = canvasPxW;
          pageCanvas.height = srcH;

          const ctx = pageCanvas.getContext('2d');
          if (!ctx) continue;

          // Fill background white (in case element has transparent areas)
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvasPxW, srcH);

          // Copy the strip from the full canvas
          ctx.drawImage(
            canvas,
            0, srcY,          // source x, y
            canvasPxW, srcH,  // source width, height
            0, 0,             // dest x, y
            canvasPxW, srcH,  // dest width, height
          );

          // Convert strip to JPEG data URL (JPEG compresses much better than PNG in PDFs)
          const imgData = pageCanvas.toDataURL('image/jpeg', 0.95);

          // The image height in mm for this strip (may be less than printableH on last page)
          const imgHeightMM = (srcH / canvasPxW) * printableW;

          pdf.addImage(
            imgData,
            'JPEG',
            MARGIN_MM,     // x position
            MARGIN_MM,     // y position
            printableW,    // width in mm
            imgHeightMM,   // height in mm
          );
        }

        // ── 4. Save the PDF ──
        const safeFilename = filename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
        pdf.save(safeFilename);

        this.ngZone.run(() => {
          this.toastService.show(
            `PDF saved as "${safeFilename}" (${totalPages} page${totalPages !== 1 ? 's' : ''})`,
            'success',
          );
        });
      } catch (e) {
        this.ngZone.run(() => {
          this.toastService.show('PDF export failed. Please try again.', 'danger');
        });
        throw e;
      }
    });
  }

  /**
   * Export all resumes as a JSON backup file
   */
  exportAsJson(data: object, filename: string = 'resumes-backup.json'): void {
    try {
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = this.document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      this.toastService.show('Backup exported successfully!', 'success');
    } catch {
      this.toastService.show('Failed to export backup', 'danger');
    }
  }
}
