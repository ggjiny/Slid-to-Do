import {
  FlagIcon,
  FoldIcon,
  HomeIcon,
  LogoIcon,
  PlusIcon,
  ProfileIcon,
  TextLogoIcon,
} from '@assets';
import Button from '@components/Button';
import { useState } from 'react';

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const mockGoalData = {
    goals: [
      { title: '자바스크립트로 웹 서비스 만들기' },
      { title: '디자인 시스템 강의 듣기' },
    ],
  };

  return (
    <div
      className={`absolute left-0 top-0 h-dvh w-[280px] transform px-6 py-4 ${isOpen ? 'translate-x-0' : '-translate-x-[220px]'} bg-white transition-transform duration-300 ease-in-out`}
    >
      <button
        type="button"
        aria-label="expend button"
        onClick={toggleSidebar}
        className={`fixed ${isOpen ? 'right-6' : 'right-[18px]'} top-5 h-5 w-6`}
      >
        {!isOpen && <LogoIcon width={23} height={23} className="mb-4" />}
        <FoldIcon className={`${isOpen ? 'rotate-0' : 'rotate-180'}`} />
      </button>
      {isOpen && (
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
              <PlusIcon className="mr-2 stroke-white" />
              <span className="mr-2 text-base font-semibold">새 할 일</span>
            </Button>
          </div>
          <div className="absolute left-0 w-full border-b-[1px]"> </div>
          <div className="my-4 mt-10 flex h-8 flex-row items-center">
            <HomeIcon width={24} height={24} />
            <div className="ml-2 text-lg font-medium">대시보드</div>
          </div>
          <div className="absolute left-0 w-full border-b-[1px]"> </div>
          <div className="my-4 mt-8 flex h-8 flex-row items-center">
            <FlagIcon width={24} height={24} />
            <div className="ml-2 text-lg font-medium">목표</div>
          </div>
          <ul>
            {mockGoalData.goals.map((item) => (
              <li className="p-2 text-sm font-medium">• {item.title}</li>
            ))}
            {isEditing && (
              <li>
                <span>• </span>
                <input
                  className="mt-4 h-8 w-[218px] rounded-md border border-gray-300 p-2 text-sm"
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
              onClick={() => setIsEditing(true)}
              disabled={isEditing}
            >
              <PlusIcon
                className={`mr-2 ${isEditing ? 'stroke-slate-400' : 'stroke-blue-500'}`}
              />

              <span className="mr-2 text-base font-semibold">새 목표</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SideBar;
