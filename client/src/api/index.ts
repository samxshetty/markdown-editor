import axios from 'axios';

// Backend is running on port 3000 with /api prefix
const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000/api';

export interface Document {
  id: number;
  name: string;
  markdownContent: string;
  createdAt: Date;
}

export interface DocumentResponse {
    message: string;
    document: Document;
}

export const saveDocument = async (name: string, markdownContent: string): Promise<DocumentResponse> => {
    const response = await axios.post<DocumentResponse>(`${API_URL}/documents`, { name, markdown: markdownContent });
    return response.data;
};

export const getLatestDocuments = async (): Promise<Document[]> => {
  const response = await axios.get<Document[]>(`${API_URL}/documents`);
  return response.data;
};

export const getAllDocuments = async (): Promise<Document[]> => {
  const response = await axios.get<Document[]>(`${API_URL}/documents/all`);
  return response.data;
};

export const updateDocument = async (id: number, markdownContent: string): Promise<DocumentResponse> => {
  const response = await axios.patch<DocumentResponse>(`${API_URL}/documents/${id}`, { markdown: markdownContent });
  return response.data;
};

export const getDocument = async (id: string): Promise<Document> => {
  const response = await axios.get<Document>(`${API_URL}/documents/${id}`);
  return response.data;
};

export const deleteDocument = async (id: number): Promise<any> => {
    const response = await axios.delete(`${API_URL}/documents/${id}`);
    return response.data;
};
