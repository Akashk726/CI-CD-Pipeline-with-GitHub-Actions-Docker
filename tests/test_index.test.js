const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('To-Do List HTML', () => {
    let dom;
    let document;

    beforeAll(() => {
        const html = fs.readFileSync(path.resolve(__dirname, '../src/index.html'), 'utf8');
        dom = new JSDOM(html);
        document = dom.window.document;
    });

    test('should have a title', () => {
        expect(document.title).toBe('To-Do List');
    });

    test('should have a task input field', () => {
        const taskInput = document.getElementById('taskInput');
        expect(taskInput).not.toBeNull();
        expect(taskInput.placeholder).toBe('Add a new task');
    });

    test('should have a task list container', () => {
        const taskList = document.getElementById('taskList');
        expect(taskList).not.toBeNull();
        expect(taskList.className).toContain('list-group');
    });
});
