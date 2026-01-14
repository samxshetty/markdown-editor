import React, { useState, useEffect } from 'react';
import { getDocument, getAllDocuments } from '../api';
import { Document } from '../api'; // Import the Document interface from the api module

interface MyDocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadContent: (content: string) => void;
}

const MyDocumentsModal: React.FC<MyDocumentsModalProps> = ({ isOpen, onClose, onLoadContent }) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Fetch all documents when the modal opens
      getAllDocuments().then(setDocuments);
    }
  }, [isOpen]);

  const handleLoadContent = async (id: number) => {
    const document = await getDocument(id.toString());
    onLoadContent(document.htmlContent); // Use htmlContent from the fetched document
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">My Documents</h3>
          <div className="mt-2 px-7 py-3">
            <ul>
              {documents.map((doc) => (
                <li key={doc.id} className="border-t border-gray-200 py-2">
                  <button
                    onClick={() => handleLoadContent(doc.id)}
                    className="text-blue-500 hover:underline"
                  >
                    {doc.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="items-center px-4 py-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDocumentsModal;
