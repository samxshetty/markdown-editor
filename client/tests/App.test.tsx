import { render, screen, fireEvent } from '@testing-library/react';
import { MarkdownEditor } from '../src/components/MarkdownEditor';
import { describe, it, expect, vi } from 'vitest';

describe('MarkdownEditor', () => {
    it('renders editor and preview', () => {
        render(<MarkdownEditor onSave={async () => {}} />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByText('Save Document')).toBeInTheDocument();
    });

    it('updates preview when typing', async () => {
        render(<MarkdownEditor onSave={async () => {}} />);
        const textarea = screen.getByRole('textbox');
        fireEvent.change(textarea, { target: { value: '# New Title' } });
        
        // marked is async, but for this simple case it might update fast. 
        // In a real test we might wait for the text to appear.
        expect(await screen.findByRole('heading', { level: 1, name: 'New Title' })).toBeInTheDocument();
    });

    it('calls onSave when save button is clicked', async () => {
        const mockSave = vi.fn();
        render(<MarkdownEditor onSave={mockSave} />);
        
        const button = screen.getByText('Save Document');
        fireEvent.click(button);

        expect(mockSave).toHaveBeenCalled();
    });
});
