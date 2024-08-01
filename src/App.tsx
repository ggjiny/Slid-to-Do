import SideBar from '@components/SideBar';
import useApiError from '@hooks/api/useApiError';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const { handleError } = useApiError();

  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        onError: handleError,
      },
      queries: {
        retry: false,
      },
    },
    queryCache: new QueryCache({
      onError: handleError,
    }),
  });
  const { pathname } = useLocation();

  const bgColor =
    pathname === '/sign-in' || pathname === '/sign-up'
      ? 'bg-white'
      : 'bg-slate-200';

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={`h-dvh w-dvw ${bgColor} font-Pretendard text-base font-normal`}
      >
        {pathname !== '/sign-in' && pathname !== '/sign-up' && <SideBar />}
        <div className="ml-0 tablet:ml-[60px] desktop:ml-0">
          <Outlet />
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
