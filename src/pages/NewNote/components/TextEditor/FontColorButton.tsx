import { FontColorIcon } from '@assets';
import useOutsideClick from '@hooks/useOutsideClick';
import { Editor } from '@tiptap/react';
import { useRef, useState } from 'react';

interface FontColorButtonProps {
  editor: Editor;
  defaultColor: string;
}
function FontColorButton({ editor, defaultColor }: FontColorButtonProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState('');
  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, () => setIsDropdownOpen(false));

  const handleClickColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
    switch (color) {
      case '#334155':
        setCurrentColor('fill-slate-700');
        break;
      case '#ef4444':
        setCurrentColor('fill-red-500');
        break;
      case '#22c55e':
        setCurrentColor('fill-green-500');
        break;
      case '#1d4ed8':
        setCurrentColor('fill-blue-700');
        break;
      case '#facc15':
        setCurrentColor('fill-yellow-400');
        break;
      default:
        setCurrentColor(defaultColor);
        break;
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <FontColorIcon
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className={`${currentColor || defaultColor} cursor-pointer`}
      />
      {isDropdownOpen && (
        <div className="absolute bottom-6 z-10 flex w-fit gap-1 rounded-md border border-slate-300 bg-white p-2">
          <div
            onClick={() => handleClickColor('#334155')}
            className="h-3 w-3 cursor-pointer rounded-full bg-slate-700"
          />
          <div
            onClick={() => handleClickColor('#ef4444')}
            className="h-3 w-3 cursor-pointer rounded-full bg-red-500"
          />
          <div
            onClick={() => handleClickColor('#22c55e')}
            className="h-3 w-3 cursor-pointer rounded-full bg-green-500"
          />
          <div
            onClick={() => handleClickColor('#1d4ed8')}
            className="h-3 w-3 cursor-pointer rounded-full bg-blue-700"
          />
          <div
            onClick={() => handleClickColor('#facc15')}
            className="h-3 w-3 cursor-pointer rounded-full bg-yellow-400"
          />
        </div>
      )}
    </div>
  );
}

export default FontColorButton;
