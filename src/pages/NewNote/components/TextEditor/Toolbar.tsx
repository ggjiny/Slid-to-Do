import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  BulletIcon,
  ItalicIcon,
  NumberListIcon,
  UnderlineIcon,
} from '@assets';
import { Editor } from '@tiptap/react';
import FontColorButton from './FontColorButton';
import LinkButton from './LinkButton';

interface ToolbarProps {
  editor: Editor;
  setIsLinkModalOpen: (isOpen: boolean) => void;
}

function Toolbar({ editor, setIsLinkModalOpen }: ToolbarProps) {
  const ACTIVE_FILL_COLOR = 'fill-blue-600';
  const DEFAULT_FILL_COLOR = 'fill-slate-700';

  return (
    <div className="fixed bottom-6 z-10 flex w-full max-w-[792px] justify-between rounded-[21.5px] border border-slate-200 bg-white px-4 py-[10px] shadow-xs">
      <div className="flex gap-4">
        <div className="flex gap-1">
          <BoldIcon
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`${editor.isActive('bold') ? ACTIVE_FILL_COLOR : DEFAULT_FILL_COLOR} cursor-pointer`}
          />
          <ItalicIcon
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`${editor.isActive('italic') ? ACTIVE_FILL_COLOR : DEFAULT_FILL_COLOR} cursor-pointer`}
          />
          <UnderlineIcon
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`${editor.isActive('underline') ? ACTIVE_FILL_COLOR : DEFAULT_FILL_COLOR} cursor-pointer`}
          />
        </div>
        <div className="flex gap-1">
          <AlignLeftIcon
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`${editor.isActive({ textAlign: 'left' }) ? ACTIVE_FILL_COLOR : DEFAULT_FILL_COLOR} cursor-pointer`}
          />
          <AlignCenterIcon
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`${editor.isActive({ textAlign: 'center' }) ? ACTIVE_FILL_COLOR : DEFAULT_FILL_COLOR} cursor-pointer`}
          />
          <AlignRightIcon
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`${editor.isActive({ textAlign: 'right' }) ? ACTIVE_FILL_COLOR : DEFAULT_FILL_COLOR} cursor-pointer`}
          />
        </div>
        <div className="flex gap-1">
          <BulletIcon
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`${editor.isActive('bulletList') ? ACTIVE_FILL_COLOR : DEFAULT_FILL_COLOR} cursor-pointer`}
          />
          <NumberListIcon
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`${editor.isActive('orderedList') ? ACTIVE_FILL_COLOR : DEFAULT_FILL_COLOR} cursor-pointer`}
          />
          <FontColorButton editor={editor} defaultColor={DEFAULT_FILL_COLOR} />
        </div>
      </div>
      <LinkButton setIsLinkModalOpen={setIsLinkModalOpen} />
    </div>
  );
}

export default Toolbar;
