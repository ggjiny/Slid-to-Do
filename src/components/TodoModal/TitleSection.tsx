import BaseInput from '@components/Input/BaseInput';
import { ChangeEvent, RefObject } from 'react';

interface TitleSectionProps {
  title: string;
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isTitleValid: boolean;
  inputRef?: RefObject<HTMLInputElement>;
}

function TitleSection({
  title,
  onTitleChange,
  isTitleValid,
  inputRef,
}: TitleSectionProps) {
  return (
    <div className="flex flex-col items-start justify-start self-stretch">
      <div className="flex items-center justify-between">
        <div className="text-base font-semibold leading-normal text-slate-800">
          제목
        </div>
      </div>
      <div className="mt-3 flex flex-col items-start justify-start self-stretch rounded-xl">
        <BaseInput
          size="lg"
          value={title}
          onChange={onTitleChange}
          placeholder="제목을 입력해주세요."
          isInvalid={!isTitleValid}
          ref={inputRef}
        />
        {!isTitleValid && (
          <div className="mt-1.5 items-start justify-start pl-2 text-sm font-normal leading-tight text-red-500">
            제목은 30자를 넘을 수 없습니다. (현재 {title.length}자)
          </div>
        )}
      </div>
    </div>
  );
}

export default TitleSection;
