import { Document } from '../types/document';
import mockData from './mockData.json';

class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}

class MockDatabase {
  private readonly DB_VERSION = '1.0';
  private readonly STORAGE_KEY = 'mockDb';
  
  private documents: Document[] = [];

  constructor() {
    this.seed();
  }

  private validateDocument(document: Partial<Document>): void {
    if (!document.type?.trim()) {
      throw new DatabaseError('Document type is required and cannot be empty');
    }
  }

  private reorderPositions(): void {
    this.documents = [...this.documents]
      .sort((a, b) => a.position - b.position)
      .map((doc, index) => ({ ...doc, position: index }));
  }

  public reset(): void {
    this.documents = [...mockData];
    this.persist();
  }

  private seed() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) {
        this.reset();
        return;
      }

      const data = JSON.parse(stored);
      if (data.version !== this.DB_VERSION) {
        this.reset();
        return;
      }

      this.documents = data.documents;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error initializing database:', error.message);
      } else {
        console.error('Unknown error initializing database');
      }
      this.reset();
    }
  }

  private persist() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
      version: this.DB_VERSION,
      documents: this.documents,
      lastUpdated: new Date().toISOString()
    }));
  }

  updateDocuments(documents: Document[]): Document[] {
    try {
      documents.forEach(this.validateDocument);
      this.documents = [...documents];
      this.reorderPositions();
      this.persist();
      return this.documents;
    } catch (error: unknown) {
      if (error instanceof DatabaseError) {
        throw error;
      }
      throw new DatabaseError(`Failed to update documents: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  getAllDocuments(): Document[] {
    return [...this.documents];
  }

  getDocument(type: string): Document {
    if (!type?.trim()) {
      throw new DatabaseError('Document type is required');
    }
    
    const document = this.documents.find(doc => doc.type === type);
    if (!document) {
      throw new DatabaseError(`Document with type "${type}" not found`);
    }
    
    return { ...document };
  }

  createDocument(document: Omit<Document, 'position'>): Document {
    try {
      this.validateDocument(document);
      
      if (this.documents.some(doc => doc.type === document.type)) {
        throw new DatabaseError(`Document with type "${document.type}" already exists`);
      }

      const newDocument = {
        ...document,
        position: this.documents.length,
      };
      
      this.documents.push(newDocument);
      this.persist();
      return { ...newDocument };
    } catch (error: unknown) {
      if (error instanceof DatabaseError) {
        throw error;
      }
      throw new DatabaseError(`Failed to create document: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  updateDocument(type: string, update: Partial<Document>): Document {
    try {
      if (update.type && update.type !== type) {
        throw new DatabaseError('Document type cannot be changed');
      }

      const document = this.getDocument(type);
      const updatedDocument = {
        ...document,
        ...update,
        type,
      };

      this.validateDocument(updatedDocument);
      
      const index = this.documents.findIndex(doc => doc.type === type);
      this.documents[index] = updatedDocument;
      this.persist();
      
      return { ...updatedDocument };
    } catch (error: unknown) {
      if (error instanceof DatabaseError) {
        throw error;
      }
      throw new DatabaseError(`Failed to update document: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  deleteDocument(type: string): void {
    try {
      const index = this.documents.findIndex(doc => doc.type === type);
      if (index === -1) {
        throw new DatabaseError(`Document with type "${type}" not found`);
      }

      this.documents.splice(index, 1);
      this.reorderPositions();
      this.persist();
    } catch (error: unknown) {
      if (error instanceof DatabaseError) {
        throw error;
      }
      throw new DatabaseError(`Failed to delete document: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const db = new MockDatabase();