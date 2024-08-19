import { DeleteIcon } from '@assets';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface EmbedLinkProps {
  link: string;
  onClose: () => void;
}

const DESKTOP_WIDTH = 1920;
const MIN_WIDTH = 430;
const MAX_WIDTH = 750;
const MIN_HEIGHT = 200;
const MAX_HEIGHT = 600;

function LinkEmbed({ link, onClose }: EmbedLinkProps) {
  const [isResizing, setIsResizing] = useState(false);
  const [dimension, setDimension] = useState({ width: 700, height: 400 });
  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth);
  const resizerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;

      const isDesktop = windowWidth >= DESKTOP_WIDTH;
      const containerRect = containerRef.current.getBoundingClientRect();

      if (isDesktop) {
        const newWidth = e.clientX - containerRect.left;
        setDimension((prev) => ({
          ...prev,
          width: Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, newWidth)),
        }));
      } else {
        const newHeight = e.clientY - containerRect.top;
        setDimension((prev) => ({
          ...prev,
          height: Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, newHeight)),
        }));
      }
    },
    [isResizing, windowWidth],
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <div className="flex w-full flex-col items-center overflow-auto border-b-2 border-slate-200 bg-blue-50 px-[-16px] tablet:border-none desktop:h-screen desktop:w-auto desktop:flex-row">
      <div className="flex h-full w-full max-w-[792px] flex-col desktop:ml-[280px] desktop:w-auto">
        <div className="flex w-full justify-end bg-white p-2">
          <DeleteIcon
            className="cursor-pointer fill-slate-800"
            onClick={onClose}
          />
        </div>
        <div
          ref={containerRef}
          style={{
            width: windowWidth >= DESKTOP_WIDTH ? dimension.width : '100%',
            height: windowWidth < DESKTOP_WIDTH ? dimension.height : 'auto',
          }}
          className="flex h-[350px] items-center tablet:h-auto desktop:flex-1 desktop:justify-center"
        >
          <iframe
            src={link}
            title="link embed"
            className={`${windowWidth >= DESKTOP_WIDTH ? 'aspect-square w-full' : 'h-full w-full'} `}
          />
        </div>
      </div>
      <div
        ref={resizerRef}
        className={`${
          windowWidth >= DESKTOP_WIDTH
            ? 'ml-2 h-full w-1 cursor-col-resize'
            : 'mt-2 h-1 w-full cursor-row-resize'
        } hidden bg-blue-100 hover:bg-blue-500 tablet:block`}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}

export default LinkEmbed;
