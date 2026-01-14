import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const domPurify = DOMPurify(window as any);

async function test() {
    const markdown = '# Hello World\n\nThis is a paragraph.';
    const rawHtml = await marked.parse(markdown);
    const cleanHtml = domPurify.sanitize(rawHtml);
    console.log('Markdown:', markdown);
    console.log('Raw HTML:', rawHtml);
    console.log('Clean HTML:', cleanHtml);
}

test();

