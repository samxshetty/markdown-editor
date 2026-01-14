import axios from 'axios';

// Backend is running on port 3001 with /api prefix
const API_URL = 'http://localhost:3000/api';

export interface Document {
  id: number;
  name: string;
  htmlContent: string;
  createdAt: Date;
}

export interface DocumentResponse {
    message: string;
    document: Document;
}

export const saveDocument = async (name: string, htmlContent: string): Promise<DocumentResponse> => {
    const response = await axios.post<DocumentResponse>(`${API_URL}/documents`, { name, html: htmlContent });
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

export const getDocument = async (id: string): Promise<Document> => {
  const response = await axios.get<Document>(`${API_URL}/documents/${id}`);
  return response.data;
};
