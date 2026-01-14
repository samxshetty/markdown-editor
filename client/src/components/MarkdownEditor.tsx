import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export interface MarkdownEditorRef {
  getHtml: () => Promise<string>;
}

interface MarkdownEditorProps {
    initialMarkdown?: string;
    onSave: (html: string) => Promise<void>;
}

export const MarkdownEditor = forwardRef<MarkdownEditorRef, MarkdownEditorProps>(({ initialMarkdown, onSave }, ref) => {
    const [markdown, setMarkdown] = useState<string>(initialMarkdown || '# Hello World\n\nStart typing markdown...');
    const [html, setHtml] = useState<string>('');

    useEffect(() => {
        setMarkdown(initialMarkdown || '');
    }, [initialMarkdown]);

    useEffect(() => {
        const convert = async () => {
            const rawHtml = await marked.parse(markdown, { async: true, breaks: true, gfm: true });
            const cleanHtml = DOMPurify.sanitize(rawHtml);
            setHtml(cleanHtml);
        };
        convert();
    }, [markdown]);

    useImperativeHandle(ref, () => ({
        getHtml: async () => {
            return html;
        }
    }));

    return (
        <div className="flex flex-col h-full">
            {/* Toolbar */}
            <div className="flex items-center justify-end px-4 py-2 bg-gray-50 border-b">
                <button
                    onClick={() => onSave(html)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Save Document
                </button>
            </div>

            {/* Editor Area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Markdown Input */}
                <div className="flex-1 flex flex-col border-r">
                    <div className="px-4 py-2 bg-gray-50 border-b text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Markdown
                    </div>
                    <textarea
                        className="flex-1 p-6 resize-none font-mono text-sm focus:outline-none"
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        placeholder="Type your markdown here..."
                        spellCheck={false}
                    />
                </div>

                {/* Preview Output */}
                <div className="flex-1 flex flex-col bg-white">
                    <div className="px-4 py-2 bg-gray-50 border-b text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Preview
                    </div>
                    <div 
                        className="flex-1 p-6 overflow-auto prose prose-slate max-w-none markdown-preview"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </div>
            </div>
        </div>
    );
});