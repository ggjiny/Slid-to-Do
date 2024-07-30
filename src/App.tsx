import SideBar from '@components/SideBar';
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const { pathname } = useLocation();

  const bgColor =
    pathname === '/sign-in' || pathname === '/sign-up'
      ? 'bg-white'
      : 'bg-slate-200';

  return (
    <div
      className={`h-dvh w-dvw ${bgColor} font-Pretendard text-base font-normal`}
    >
      {pathname !== '/sign-in' && pathname !== '/sign-up' && <SideBar />}
      <div className="ml-0 tablet:ml-[60px] desktop:ml-0">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
