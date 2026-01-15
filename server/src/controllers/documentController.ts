import { Request, Response } from 'express';
import prisma from '../db/prisma';
import { CreateDocumentRequest } from '../types';

export const createDocument = async (req: Request<{}, {}, CreateDocumentRequest>, res: Response) => {
  const { name, markdown } = req.body;

  if (!name || !markdown) {
    return res.status(400).json({ error: 'Name and markdown are required' });
  }

  try {
    const newDoc = await prisma.document.create({
      data: {
        name,
        markdownContent: markdown,
      },
      select: {
        id: true,
        name: true,
        markdownContent: true,
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
              markdownContent: true,
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
              markdownContent: true,
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
        markdownContent: true,
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

export const updateDocument = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const { markdown } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Document ID is required' });
  }

  if (!markdown) {
    return res.status(400).json({ error: 'Markdown content is required' });
  }

  try {
    const updatedDoc = await prisma.document.update({
      where: {
        id: parseInt(id, 10),
      },
      data: {
        markdownContent: markdown,
      },
      select: {
        id: true,
        name: true,
        markdownContent: true,
        createdAt: true,
      }
    });

    res.status(200).json({
      message: 'Document updated successfully',
      document: updatedDoc
    });
  } catch (error) {
    console.error(`Error updating document with ID ${id}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteDocument = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Document ID is required' });
  }

  try {
    await prisma.document.delete({
      where: {
        id: parseInt(id, 10),
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error(`Error deleting document with ID ${id}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
