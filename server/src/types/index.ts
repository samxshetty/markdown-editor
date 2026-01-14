export interface Document {
  id: number;
  name: string;
  htmlContent: string;
  createdAt: Date;
}

export interface CreateDocumentRequest {
  name: string;
  html: string;
}

export interface CreateDocumentResponse {
  message: string;
  document: Document;
}
