import { DeleteIcon } from '@assets';
import Button from '@components/Button';

export interface PopupProps {
  message: string;
  confirmMessage?: string;
  singleButton?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function Popup({
  message,
  confirmMessage = '확인',
  singleButton = false,
  onConfirm,
  onCancel,
}: PopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex h-[203px] w-[300px] flex-col items-center justify-center gap-2.5 rounded-lg bg-white p-6 tablet:h-[216px] tablet:w-[450px]">
        <div className="flex w-full justify-end">
          <button
            type="button"
            className="flex items-center justify-center"
            onClick={onCancel}
            aria-label="Close"
          >
            <DeleteIcon width={24} height={24} />
          </button>
        </div>
        <div className="flex w-full flex-grow items-center justify-center">
          <div className="whitespace-pre-wrap text-center text-base font-medium leading-normal text-slate-800">
            {message}
          </div>
        </div>
        <div className="flex w-full justify-center gap-2">
          {!singleButton && (
            <Button
              shape="outlined"
              size="lg"
              onClick={onCancel}
              additionalClass="text-base leading-normal"
              aria-label="Cancel"
            >
              취소
            </Button>
          )}
          <Button
            shape="solid"
            size="lg"
            onClick={onConfirm}
            additionalClass="text-base leading-normal"
            aria-label="Confirm"
          >
            <span className="block tablet:hidden">확인</span>
            <span className="hidden tablet:block">{confirmMessage}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
