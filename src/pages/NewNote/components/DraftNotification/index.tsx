import { CircleDeleteIcon } from '@assets';
import Button from '@components/Button';

interface DraftNotificationProps {
  onCloseDraftNotification: () => void;
  onOpenDraftModal: (value: boolean) => void;
}

function DraftNotification({
  onCloseDraftNotification,
  onOpenDraftModal,
}: DraftNotificationProps) {
  return (
    <div className="mb-6 flex items-center justify-between rounded-[28px] bg-blue-50 py-[10px] pl-4 pr-3 tablet:py-[18px]">
      <div className="flex items-center gap-4 font-semibold leading-5 text-blue-500">
        <CircleDeleteIcon
          className="flex-shrink-0 cursor-pointer fill-blue-500"
          onClick={onCloseDraftNotification}
        />
        임시 저장된 노트가 있어요. 저장된 노트를 불러오시겠어요?
      </div>
      <Button
        shape="outlined"
        size="xs"
        round="3xl"
        additionalClass="bg-white ml-3 flex-shrink-0"
        onClick={() => onOpenDraftModal(true)}
      >
        불러오기
      </Button>
    </div>
  );
}

export default DraftNotification;
