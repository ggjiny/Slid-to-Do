import { DeleteIcon } from '@assets';
import Button from '@components/Button';
import BaseInput from '@components/Input/BaseInput';
import { VALID_URL_REGEX } from '@constants/regex';
import useOutsideClick from '@hooks/useOutsideClick';
import useVisibility from '@hooks/useVisibility';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

interface LinkModalProps {
  onCancel: () => void;
  onConfirm: (link: string) => void;
  fullscreen?: boolean;
}

function LinkModal({
  onCancel,
  onConfirm,
  fullscreen = false,
}: LinkModalProps) {
  const [link, setLink] = useState('');
  const [isValid, setIsValid] = useState(true);

  const {
    isVisible: isOpen,
    handleClose: handleCancel,
    handleConfirm,
  } = useVisibility(onCancel, () => onConfirm(link));

  const linkInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && linkInputRef.current) {
      linkInputRef.current.focus();
    }
  }, [isOpen]);

  const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLink(value);
    const isValidLink = VALID_URL_REGEX.test(value);
    setIsValid(isValidLink);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && isValid && link.length > 0 && handleConfirm) {
      handleConfirm();
    }
  };

  useEffect(() => {
    if (isValid && link.length > 0) {
      document.addEventListener('keydown', handleKeyPress);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isValid, link]);

  const handleOutsideClose = () => {
    if (!isOpen) return;

    handleCancel();
  };

  useOutsideClick(modalRef, () => handleOutsideClose());

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={(e) => {
        if (!fullscreen) {
          e.stopPropagation();
        }
      }}
    >
      <div
        ref={modalRef}
        className={`flex h-auto flex-col items-start justify-start gap-2.5 rounded-xl bg-white p-6 transition-transform duration-300 ${
          fullscreen
            ? 'tablet:w-[520px] tablet:overflow-auto'
            : 'tablet:w-[450px]'
        } w-[311px] transform ${isOpen ? 'translate-y-0' : '-translate-y-10'}`}
      >
        <div className="flex flex-col items-start justify-start gap-6 self-stretch">
          <div className="inline-flex w-full items-center justify-between gap-4">
            <div className="text-lg font-bold leading-7 text-slate-800">
              링크 업로드
            </div>
            <div
              className="inline-flex h-6 w-6 cursor-pointer items-center justify-center"
              onClick={handleCancel}
            >
              <DeleteIcon />
            </div>
          </div>
          <div className="flex flex-col items-start justify-start self-stretch">
            <div className="mb-3 text-base font-semibold leading-normal text-slate-800">
              링크
            </div>
            <BaseInput
              size="lg"
              value={link}
              onChange={handleLinkChange}
              placeholder="링크를 입력해주세요."
              isInvalid={!isValid}
              ref={linkInputRef}
            />
            {!isValid && (
              <div className="mt-1.5 pl-2 text-sm font-normal leading-tight text-red-500">
                잘못된 링크 주소입니다.
              </div>
            )}
          </div>
        </div>
        <div className="invisible flex-grow">grow</div>
        <Button
          shape="solid"
          size="lg"
          additionalClass="inline-flex self-stretch py-3 w-full"
          disabled={!isValid || link.length === 0}
          onClick={handleConfirm}
        >
          확인
        </Button>
      </div>
    </div>
  );
}

export default LinkModal;
