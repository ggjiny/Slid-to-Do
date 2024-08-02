import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import Toolbar from './Toolbar';
import './index.css';

interface TextEditorProps {
  onContentChange: (text: string, content: string) => void;
}

function TextEditor({ onContentChange }: TextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      Underline,
      Color,
      Highlight,
      TextStyle,
      TaskList,
      TaskItem.configure({ nested: true }),
      TextAlign.configure({ types: ['paragraph'] }),
      Placeholder.configure({
        placeholder: '이 곳을 클릭해 노트 작성을 시작해주세요',
      }),
    ],
  });

  useEffect(() => {
    if (!editor) return undefined;

    const handleUpdate = () => {
      const text = editor.getText();
      const content = editor.getHTML();
      onContentChange(text, content);
    };

    editor.on('update', handleUpdate);

    return () => {
      editor.off('update', handleUpdate);
    };
  }, [editor, onContentChange]);

  return (
    <div className="mb-8 flex-grow">
      {editor && <Toolbar editor={editor} />}
      <EditorContent
        editor={editor}
        className="overflow-auto bg-white text-slate-700"
      />
    </div>
  );
}

export default TextEditor;
