import BaseInput from '@components/Input/BaseInput';
import { ChangeEvent, KeyboardEvent, RefObject } from 'react';

interface GoalTitleSectionProps {
  title: string;
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputRef?: RefObject<HTMLInputElement>;
  onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
}

function GoalTitleSection({
  title,
  onTitleChange,
  inputRef,
  onKeyPress,
}: GoalTitleSectionProps) {
  return (
    <div className="flex flex-col items-start justify-start self-stretch">
      <div className="mb-3 text-base font-semibold leading-normal text-slate-800">
        목표
      </div>
      <BaseInput
        size="lg"
        value={title}
        onChange={onTitleChange}
        placeholder="목표를 입력해주세요."
        onKeyDown={onKeyPress}
        ref={inputRef}
      />
    </div>
  );
}

export default GoalTitleSection;
