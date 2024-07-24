import { DeleteIcon } from '@assets';

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
            <button
              type="button"
              className="flex h-12 w-[120px] items-center justify-center rounded-xl border border-blue-500 bg-white text-base font-semibold leading-normal text-blue-500"
              onClick={onCancel}
              aria-label="Cancel"
            >
              취소
            </button>
          )}
          <button
            type="button"
            className="flex h-12 w-[120px] items-center justify-center rounded-xl bg-blue-500 text-base font-semibold leading-normal text-white"
            onClick={onConfirm}
            aria-label="Confirm"
          >
            <span className="block tablet:hidden">확인</span>
            <span className="hidden tablet:block">{confirmMessage}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
