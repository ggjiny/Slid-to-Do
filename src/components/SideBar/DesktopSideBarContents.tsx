import {
  FlagIcon,
  HomeIcon,
  PlusIcon,
  ProfileIcon,
  TextLogoIcon,
} from '@assets';
import Button from '@components/Button';
import useOutsideClick from '@hooks/useOutsideClick';
import { MouseEvent, useRef, useState } from 'react';

function DesktopSideBarContents() {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const mockGoalData = {
    goals: [
      { title: '자바스크립트로 웹 서비스 만들기', id: 1 },
      { title: '디자인 시스템 강의 듣기', id: 2 },
    ],
  };
  useOutsideClick(inputRef, () => setIsEditing(false));

  const handleAddGoalBtn = (e: MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  return (
    <div className="flex-col">
      <TextLogoIcon />
      <div className="mt-4 flex flex-row">
        <ProfileIcon width={64} height={64} />
        <div className="ml-3 flex flex-col items-start justify-between">
          <div className="h-4 text-sm font-semibold leading-5 text-slate-800">
            체다치즈
          </div>
          <div className="h-4 text-sm font-medium leading-5 text-slate-600">
            chedacheese@slid.kr
          </div>
          <button type="button">
            <span className="text-xs font-normal leading-4 text-slate-400">
              로그아웃
            </span>
          </button>
        </div>
      </div>
      <div className="my-6 flex justify-center">
        <Button shape="solid" size="sm" additionalClass="w-full">
          <PlusIcon width={24} height={24} className="mr-2 stroke-white" />
          <span className="mr-2 text-base font-semibold">새 할 일</span>
        </Button>
      </div>
      <div className="absolute left-0 w-full border-b-[1px]"> </div>
      <div className="my-4 mt-10 flex h-8 flex-row items-center">
        <HomeIcon width={24} height={24} />
        <div className="ml-2 text-lg font-medium text-slate-800">대시보드</div>
      </div>
      <div className="absolute left-0 w-full border-b-[1px]"> </div>
      <div className="my-4 mt-8 flex h-8 flex-row items-center">
        <FlagIcon width={24} height={24} fill="#1E293B" />
        <div className="ml-2 text-lg font-medium text-slate-800">목표</div>
      </div>
      <ul>
        {mockGoalData.goals.map((item) => (
          <li key={item.id} className="p-2 text-sm font-medium text-slate-700">
            • {item.title}
          </li>
        ))}
        {isEditing && (
          <li className="flex items-center p-2 text-sm font-medium text-slate-700">
            <span>•</span>
            <input
              ref={inputRef}
              className="ml-1 h-8 w-max flex-grow rounded-md border border-gray-300 p-2 text-sm"
              placeholder="새 목표를 입력해주세요"
              onKeyDown={(event) => {
                // TODO: 엔터키 입력 시 목표 추가
                if (event.key === 'Enter') {
                  setIsEditing(false);
                }
              }}
            />
          </li>
        )}
      </ul>

      <div className="mt-6 flex justify-center">
        <Button
          shape="outlined"
          size="sm"
          additionalClass="w-full"
          onClick={(e) => handleAddGoalBtn(e)}
          disabled={isEditing}
        >
          <PlusIcon
            width={24}
            height={24}
            className={`mr-2 ${isEditing ? 'stroke-slate-400' : 'stroke-blue-500'}`}
          />

          <span className="mr-2 text-base font-semibold">새 목표</span>
        </Button>
      </div>
    </div>
  );
}

export default DesktopSideBarContents;
