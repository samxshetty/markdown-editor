import { useState } from 'react';
import { MarkdownEditor } from './components/MarkdownEditor';
import { Document, saveDocument, updateDocument } from './api';
import MyDocumentsModal from './components/MyDocumentsModal';
import SaveDocumentModal from './components/SaveDocumentModal';
import { Toaster, toast } from 'react-hot-toast';

function App() {
  const [isMyDocumentsModalOpen, setIsMyDocumentsModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [markdown, setMarkdown] = useState('# Welcome to the future of deployment!\n\nStart typing markdown...');
  const [currentDoc, setCurrentDoc] = useState<Document | null>(null);

  const handleSave = async () => {
    if (currentDoc) {
      try {
        await updateDocument(currentDoc.id, markdown);
        toast.success('Document updated successfully!');
      } catch (error) {
        toast.error('Failed to update document.');
      }
    } else {
      setIsSaveModalOpen(true);
    }
  };

  const handleSaveNew = async (title: string) => {
    try {
      const newDoc = await saveDocument(title, markdown);
      setCurrentDoc(newDoc.document);
      toast.success('Document saved successfully!');
    } catch (error) {
      toast.error('Failed to save document.');
    }
  };

  const handleClear = () => {
    setMarkdown('');
    setCurrentDoc(null);
  };

  const handleLoadContent = (doc: Document) => {
    setMarkdown(doc.markdownContent);
    setCurrentDoc(doc);
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-white">
      <Toaster />
      <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
        <h1 className="text-2xl font-bold">Markdown Editor</h1>
        <div>
          <button
            onClick={handleClear}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Clear
          </button>
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Save Document
          </button>
          <button
            onClick={() => setIsMyDocumentsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            My Documents
          </button>
        </div>
      </div>
      <MarkdownEditor markdown={markdown} onMarkdownChange={setMarkdown} />
      <MyDocumentsModal
        isOpen={isMyDocumentsModalOpen}
        onClose={() => setIsMyDocumentsModalOpen(false)}
        onLoadContent={handleLoadContent}
      />
      <SaveDocumentModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSaveNew}
      />
    </div>
  );
}

export default App;