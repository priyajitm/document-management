import { Document } from '../../types/document';
import { apiClient } from './client';

export const documentsApi = {
  getAll: () => {
    return apiClient.get<Document[]>('/documents');
  },

  getOne: (type: string) => {
    return apiClient.get<Document>(`/documents/${type}`);
  },

  create: (document: Omit<Document, 'position'>) => {
    return apiClient.post<Document, Omit<Document, 'position'>>('/documents', document);
  },

  update: (type: string, document: Partial<Document>) => {
    return apiClient.put<Document, Partial<Document>>(`/documents/${type}`, document);
  },

  delete: (type: string) => {
    return apiClient.delete(`/documents/${type}`);
  },

  updateAll: (documents: Document[]) => {
    return apiClient.put<Document[], Document[]>('/documents', documents);
  },
};