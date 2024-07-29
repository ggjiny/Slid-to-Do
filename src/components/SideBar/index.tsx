import useWindowWidth from '@hooks/useWindowWidth';
import { useState } from 'react';
import DesktopSideBar from './DesktopSideBar';
import MobileSideBar from './MobileSideBar';

function SideBar() {
  const width = useWindowWidth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>
      {width >= 744 ? (
        <DesktopSideBar
          toggleSideBar={toggleSidebar}
          isOpen={isOpen}
          width={width}
        />
      ) : (
        <MobileSideBar toggleSideBar={toggleSidebar} isOpen={isOpen} />
      )}
    </>
  );
}

export default SideBar;
