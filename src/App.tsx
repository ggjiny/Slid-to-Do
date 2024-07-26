import SideBar from '@components/SideBar';
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const { pathname } = useLocation();

  const bgColor =
    pathname === '/signin' || pathname === '/signup'
      ? 'bg-white'
      : 'bg-slate-200';

  return (
    <div
      className={`h-dvh w-dvw ${bgColor} font-Pretendard text-base font-normal`}
    >
      {pathname !== '/signin' && pathname !== '/signup' && <SideBar />}
      <div className="ml-0 tablet:ml-[60px] desktop:ml-0">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
