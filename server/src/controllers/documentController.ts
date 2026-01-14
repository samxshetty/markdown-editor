import { Request, Response } from 'express';
import prisma from '../db/prisma';
import { CreateDocumentRequest } from '../types';

export const createDocument = async (req: Request<{}, {}, CreateDocumentRequest>, res: Response) => {
  const { name, html } = req.body;

  if (!name || !html) {
    return res.status(400).json({ error: 'Name and html are required' });
  }

  try {
    const newDoc = await prisma.document.create({
      data: {
        name,
        htmlContent: html,
      },
      select: {
        id: true,
        name: true,
        htmlContent: true,
        createdAt: true,
      }
    });
    
    res.status(201).json({
      message: 'Document saved successfully',
      document: newDoc
    });
  } catch (error) {
    console.error('Error saving document:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getDocuments = async (_req: Request, res: Response) => {
    try {
        const documents = await prisma.document.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: 10,
            select: {
              id: true,
              name: true,
              htmlContent: true,
              createdAt: true,
            }
        });
        res.json(documents);
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getAllDocuments = async (_req: Request, res: Response) => {
    try {
        const documents = await prisma.document.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            select: {
              id: true,
              name: true,
              htmlContent: true,
              createdAt: true,
            }
        });
        res.json(documents);
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getDocumentById = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Document ID is required' });
  }

  try {
    const document = await prisma.document.findUnique({
      where: {
        id: parseInt(id, 10),
      },
      select: {
        id: true,
        name: true,
        htmlContent: true,
        createdAt: true,
      }
    });

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json(document);
  } catch (error) {
    console.error(`Error fetching document with ID ${id}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
