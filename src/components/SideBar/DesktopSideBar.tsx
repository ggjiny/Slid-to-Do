import { FoldIcon, LogoIcon } from '@assets';
import DesktopSideBarContents from './DesktopSideBarContents';

interface SideBarProps {
  isOpen: boolean;
  width: number;
  toggleSideBar: () => void;
}

function DesktopSideBar({ isOpen, width, toggleSideBar }: SideBarProps) {
  return (
    <>
      {isOpen && width <= 1920 && (
        <div
          className="fixed left-0 top-0 z-40 h-dvh w-dvw bg-black opacity-50"
          onClick={toggleSideBar}
        />
      )}
      <div
        className={`fixed left-0 top-0 z-50 h-dvh w-[280px] px-6 py-4 ${isOpen ? 'translate-x-0' : '-translate-x-[220px]'} border-r-[1px] bg-white transition-transform duration-300 ease-in-out`}
      >
        <div
          className={`fixed ${isOpen ? 'right-6' : 'right-[18px]'} top-5 h-5 w-6`}
        >
          {!isOpen && <LogoIcon width={23} height={23} className="mb-4" />}
          <button
            type="button"
            aria-label="expend button"
            onClick={toggleSideBar}
          >
            <FoldIcon className={`${isOpen ? 'rotate-0' : 'rotate-180'}`} />
          </button>
        </div>
        {isOpen && <DesktopSideBarContents />}
      </div>
    </>
  );
}

export default DesktopSideBar;
