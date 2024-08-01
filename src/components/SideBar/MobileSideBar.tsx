import { FoldIcon, HamburgerIcon } from '@assets';
import MobileSideBarContents from './MobileSideBarContents';

interface MobileSideBarProps {
  isOpen: boolean;
  toggleSideBar: () => void;
}

function MobileSideBar({ isOpen, toggleSideBar }: MobileSideBarProps) {
  return (
    <>
      <div className="h-12 w-full bg-white">
        <button
          type="button"
          aria-label="hamburger button"
          onClick={toggleSideBar}
          className="ml-4 mt-3"
        >
          <HamburgerIcon />
        </button>
      </div>
      <div
        className={`fixed left-0 top-0 z-50 h-dvh w-full px-6 py-4 ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-white transition-transform duration-300 ease-in-out`}
      >
        <button
          type="button"
          aria-label="expend button"
          onClick={toggleSideBar}
          className="fixed right-6 top-5"
        >
          <FoldIcon />
        </button>
        {isOpen && <MobileSideBarContents />}
      </div>
    </>
  );
}

export default MobileSideBar;
