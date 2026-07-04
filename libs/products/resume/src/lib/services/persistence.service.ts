import { Injectable } from '@angular/core';
import { ResumeData } from '../models/resume.model';

const STORAGE_KEY = 'resume-builder-data';
const RESUMES_INDEX_KEY = 'resume-builder-index';

@Injectable({ providedIn: 'root' })
export class PersistenceService {
  save(data: ResumeData): void {
    try {
      localStorage.setItem(`${STORAGE_KEY}-${data.id}`, JSON.stringify(data));
      this.updateIndex(data.id, data.name);
    } catch (e) {
      console.error('Failed to save resume:', e);
    }
  }

  load(id: string): ResumeData | null {
    try {
      const raw = localStorage.getItem(`${STORAGE_KEY}-${id}`);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error('Failed to load resume:', e);
      return null;
    }
  }

  loadLatest(): ResumeData | null {
    const index = this.getIndex();
    if (index.length === 0) return null;
    return this.load(index[index.length - 1].id);
  }

  delete(id: string): void {
    localStorage.removeItem(`${STORAGE_KEY}-${id}`);
    const index = this.getIndex().filter((r) => r.id !== id);
    localStorage.setItem(RESUMES_INDEX_KEY, JSON.stringify(index));
  }

  getIndex(): { id: string; name: string }[] {
    try {
      const raw = localStorage.getItem(RESUMES_INDEX_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private updateIndex(id: string, name: string): void {
    const index = this.getIndex();
    const existing = index.findIndex((r) => r.id === id);
    if (existing >= 0) {
      index[existing].name = name;
    } else {
      index.push({ id, name });
    }
    localStorage.setItem(RESUMES_INDEX_KEY, JSON.stringify(index));
  }
}
