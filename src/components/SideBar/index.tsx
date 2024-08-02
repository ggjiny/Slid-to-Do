import useWindowWidth from '@hooks/useWindowWidth';
import { useEffect, useState } from 'react';
import DesktopSideBar from './DesktopSideBar';
import MobileSideBar from './MobileSideBar';

function SideBar() {
  const width = useWindowWidth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  useEffect(() => {
    if (width >= 1920) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [width]);

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
