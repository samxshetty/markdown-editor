import { useState, useRef } from 'react';
import { MarkdownEditor, MarkdownEditorRef } from './components/MarkdownEditor';
import { saveDocument } from './api';
import MyDocumentsModal from './components/MyDocumentsModal';
import SaveDocumentModal from './components/SaveDocumentModal';

function App() {
  const [isMyDocumentsModalOpen, setIsMyDocumentsModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const editorRef = useRef<MarkdownEditorRef>(null);

  const handleSave = async (title: string) => {
    if (editorRef.current) {
      const htmlContent = await editorRef.current.getHtml();
      await saveDocument(title, htmlContent);
      alert('Document saved successfully!');
    }
  };

  const handleClear = () => {
    setMarkdown('');
  };

  const handleLoadContent = (content: string) => {
    setMarkdown(content);
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-white">
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
            onClick={() => setIsSaveModalOpen(true)}
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
      <MarkdownEditor ref={editorRef} initialMarkdown={markdown} />
      <MyDocumentsModal
        isOpen={isMyDocumentsModalOpen}
        onClose={() => setIsMyDocumentsModalOpen(false)}
        onLoadContent={handleLoadContent}
      />
      <SaveDocumentModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}

export default App;