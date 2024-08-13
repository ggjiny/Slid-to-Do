import { ChangeEvent } from 'react';

interface TitleInputProps {
  title: string | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  titleCount: number;
  maxLength: number;
}

function TitleInput({
  title,
  onChange,
  titleCount,
  maxLength,
}: TitleInputProps) {
  return (
    <div className="flex w-full items-center justify-between border-b border-b-slate-200 px-1 py-[2px]">
      <input
        placeholder="노트의 제목을 입력해주세요"
        className="w-full py-3 text-lg font-medium leading-7 text-slate-800 outline-none"
        value={title}
        onChange={onChange}
        maxLength={maxLength}
      />
      <div className="text-xs font-medium text-slate-800">
        <span
          className={`${
            titleCount === maxLength ? 'text-red-500' : 'text-blue-500'
          }`}
        >
          {titleCount}
        </span>
        /{maxLength}
      </div>
    </div>
  );
}

export default TitleInput;
