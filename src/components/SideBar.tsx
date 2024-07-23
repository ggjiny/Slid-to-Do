import {
  FlagIcon,
  FoldIcon,
  HomeIcon,
  LogoIcon,
  ProfileIcon,
  TextLogoIcon,
} from '@/assets';
import { useState } from 'react';

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const mockGoalData = {
    goals: [
      { title: '자바스크립트로 웹 서비스 만들기' },
      { title: '디자인 시스템 강의 듣기' },
    ],
  };

  return (
    <div
      className={`absolute left-0 h-dvh w-60 transform p-4 ${isOpen ? 'translate-x-0' : '-translate-x-48'} bg-white transition-transform duration-300 ease-in-out`}
    >
      <button
        type="button"
        aria-label="expend button"
        onClick={toggleSidebar}
        className="fixed right-4 top-5 h-5 w-5"
      >
        {!isOpen && <LogoIcon width={23} height={23} className="mb-4" />}
        <FoldIcon className={`${isOpen ? 'rotate-0' : 'rotate-180'}`} />
      </button>
      {isOpen && (
        <div className="flex-col">
          <TextLogoIcon />
          <div className="mt-4 flex flex-row">
            <ProfileIcon width={64} height={64} />
            <div className="ml-2">
              <div className="h-4 text-sm">체다치즈</div>
              <div className="h-4 text-sm">chedacheese@slid.kr</div>
              <button type="button" className="mt-1">
                <span className="text-xs">로그아웃</span>
              </button>
            </div>
          </div>
          <div className="mb-4 mt-4">
            <div className="h-10 w-full rounded-lg bg-blue-700"> </div>
          </div>
          <div className="absolute left-0 w-full border-b-2"> </div>
          <div className="mb-2 mt-6 flex h-8 flex-row items-center">
            <HomeIcon width={14} height={14} />
            <div className="ml-4">대시보드</div>
          </div>
          <div className="absolute left-0 w-full border-b-2"> </div>
          <div className="mb-2 mt-4 flex h-8 flex-row items-center">
            <FlagIcon width={14} height={14} />
            <div className="ml-4">목표</div>
          </div>
          <ul>
            {mockGoalData.goals.map((item) => (
              <li className="mt-2 text-sm">• {item.title}</li>
            ))}
          </ul>
          <div className="mb-4 mt-4">
            <div className="h-10 w-full rounded-lg bg-blue-700"> </div>
          </div>
        </div>
      )}
    </div>
  );
}
