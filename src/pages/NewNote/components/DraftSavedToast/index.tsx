import { CheckIcon } from '@assets';
import { useEffect, useState } from 'react';

interface DraftSavedToastProps {
  isVisible: boolean;
  onHide: () => void;
}

const TOAST_DURATION = 5;

function DraftSavedToast({ isVisible, onHide }: DraftSavedToastProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    if (!isVisible) return undefined;

    setIsRender(true);
    setElapsedTime(0);

    const timer = setTimeout(() => {
      setIsRender(false);
      setTimeout(onHide, 300);
    }, TOAST_DURATION * 1000);

    const interval = setInterval(() => {
      setElapsedTime((prevTime) => {
        if (prevTime >= TOAST_DURATION - 1) {
          clearInterval(interval);
          return prevTime;
        }
        return prevTime + 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isVisible]);

  return (
    <div
      className={`fixed bottom-[84px] flex w-full max-w-[792px] items-center rounded-[28px] bg-blue-50 py-3 pl-6 text-sm font-semibold text-blue-500 transition-all duration-300 ease-in-out ${isRender ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
    >
      <CheckIcon className="mr-2 flex-shrink-0" />
      임시 저장이 완료되었습니다 ㆍ
      <span className="text-xs font-medium"> {elapsedTime + 1}초 전</span>
    </div>
  );
}

export default DraftSavedToast;
