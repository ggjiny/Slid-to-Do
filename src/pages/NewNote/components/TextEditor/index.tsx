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
import Toolbar from './Toolbar';
import './index.css';

function TextEditor() {
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
      Placeholder.configure({ placeholder: '이곳에 내용을 작성하세요.' }),
    ],
  });

  return (
    <div>
      {editor && <Toolbar editor={editor} />}
      <EditorContent editor={editor} className="bg-white text-slate-700" />
    </div>
  );
}

export default TextEditor;
