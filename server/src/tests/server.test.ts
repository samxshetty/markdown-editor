import request from 'supertest';
import app from '../app';

// Mock the prisma client
jest.mock('../src/db/prisma', () => ({
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
    const mockHtml = '<h1>Hello World</h1>';
    const mockName = 'Test Document';
    const mockDoc = { id: 1, name: mockName, htmlContent: mockHtml, createdAt: new Date() };
    
    (prisma.document.create as jest.Mock).mockResolvedValue(mockDoc);

    const response = await request(app)
      .post('/documents')
      .send({ name: mockName, html: mockHtml });

    expect(response.status).toBe(201);
    expect(response.body.document).toEqual(expect.objectContaining({
      id: 1,
      name: mockName,
      htmlContent: mockHtml
    }));
  });

  it('should return 400 if html is missing', async () => {
    const response = await request(app)
      .post('/documents')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Name and html are required');
  });
});

describe('GET /documents', () => {
  it('should return the last 10 documents', async () => {
    const mockDocs = Array.from({ length: 15 }, (_, i) => ({ id: i + 1, htmlContent: `<p>${i}</p>`, createdAt: new Date() }));
    (prisma.document.findMany as jest.Mock).mockResolvedValue(mockDocs.slice(0, 10));

    const response = await request(app).get('/documents');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(10);
  });
});

describe('GET /documents/all', () => {
  it('should return all documents', async () => {
    const mockDocs = Array.from({ length: 15 }, (_, i) => ({ id: i + 1, htmlContent: `<p>${i}</p>`, createdAt: new Date() }));
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