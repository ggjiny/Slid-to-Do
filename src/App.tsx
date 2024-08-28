import SideBar from '@components/SideBar';
import routes from '@constants/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppErrorBoundary from '@utils/AppErrorBoundary';
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      throwOnError: true,
    },
  },
});

function App() {
  const { pathname } = useLocation();

  const bgColor =
    pathname === `${routes.signIn}` ||
    pathname === `${routes.signUp}` ||
    pathname.includes(`${routes.newNote}`)
      ? '#fff'
      : '#E2E8F0';

  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === '/') {
      if (localStorage.getItem('accessToken') === null) {
        navigate('sign-in');
      } else {
        navigate('dashboard');
      }
    }
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
  }, [bgColor]);

  useEffect(() => {
    if (process.env.REACT_APP_GTM_ID) {
      TagManager.initialize({ gtmId: process.env.REACT_APP_GTM_ID });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppErrorBoundary>
        <div className="h-dvh w-dvw max-w-full font-Pretendard text-base font-normal">
          {pathname !== '/sign-in' && pathname !== '/sign-up' && <SideBar />}
          <div className="ml-0 tablet:ml-[60px] desktop:ml-0">
            <Outlet />
          </div>
        </div>
      </AppErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
