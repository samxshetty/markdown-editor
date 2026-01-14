import { Router } from 'express';
import { createDocument, getDocuments, getAllDocuments, getDocumentById } from '../controllers/documentController';

const router = Router();

router.post('/', createDocument);
router.get('/', getDocuments);
router.get('/all', getAllDocuments);
router.get('/:id', getDocumentById);

export default router;
