import { Injectable, inject, NgZone } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Injectable({ providedIn: 'root' })
export class ExportService {
  private readonly ngZone = inject(NgZone);

  async exportToPdf(element: HTMLElement, filename: string = 'resume.pdf'): Promise<void> {
    return this.ngZone.runOutsideAngular(async () => {
      try {
        console.log('Starting PDF Export...', {
          elementWidth: element.offsetWidth,
          elementHeight: element.offsetHeight,
          className: element.className
        });

        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          logging: true,
          backgroundColor: '#ffffff',
        });

        console.log('Canvas generated successfully:', {
          canvasWidth: canvas.width,
          canvasHeight: canvas.height
        });

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 0;

        console.log('Adding canvas to PDF...', {
          pdfWidth,
          pdfHeight,
          ratio,
          destWidth: imgWidth * ratio,
          destHeight: imgHeight * ratio
        });

        pdf.addImage(canvas, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio, undefined, 'FAST');
        
        // Clean filename of any invalid chars
        const safeFilename = filename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
        console.log('Saving PDF as:', safeFilename);
        
        pdf.save(safeFilename);
        console.log('PDF export complete!');
      } catch (e) {
        console.error('Failed to export PDF:', e);
        throw e;
      }
    });
  }
}
