import request from 'supertest';
import app from '../app';

// Mock the prisma client
jest.mock('../db/prisma', () => ({
  __esModule: true,
  default: {
    document: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

import prisma from '../db/prisma';

describe('POST /documents', () => {
  it('should create a new document', async () => {
    const mockMarkdown = '# Hello World';
    const mockName = 'Test Document';
    const mockDoc = { id: 1, name: mockName, markdownContent: mockMarkdown, createdAt: new Date() };
    
    (prisma.document.create as jest.Mock).mockResolvedValue(mockDoc);

    const response = await request(app)
      .post('/documents')
      .send({ name: mockName, markdown: mockMarkdown });

    expect(response.status).toBe(201);
    expect(response.body.document).toEqual(expect.objectContaining({
      id: 1,
      name: mockName,
      markdownContent: mockMarkdown
    }));
  });

  it('should return 400 if markdown is missing', async () => {
    const response = await request(app)
      .post('/documents')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Name and markdown are required');
  });
});

describe('GET /documents', () => {
  it('should return the last 10 documents', async () => {
    const mockDocs = Array.from({ length: 15 }, (_, i) => ({ id: i + 1, markdownContent: `<p>${i}</p>`, createdAt: new Date() }));
    (prisma.document.findMany as jest.Mock).mockResolvedValue(mockDocs.slice(0, 10));

    const response = await request(app).get('/documents');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(10);
  });
});

describe('GET /documents/all', () => {
  it('should return all documents', async () => {
    const mockDocs = Array.from({ length: 15 }, (_, i) => ({ id: i + 1, markdownContent: `<p>${i}</p>`, createdAt: new Date() }));
    (prisma.document.findMany as jest.Mock).mockResolvedValue(mockDocs);

    const response = await request(app).get('/documents/all');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(15);
  });
});

describe('GET /health', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });
});