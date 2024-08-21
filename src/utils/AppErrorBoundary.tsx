import { showErrorToast } from '@components/Toast';
import { isAxiosError } from 'axios';
import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function handleFallbackError() {
  return (
    <div
      role="alert"
      className="mt-10 flex flex-col items-center justify-center text-2xl"
    >
      <p>오류가 발생했습니다. :(</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="underline"
      >
        돌아가기
      </button>
    </div>
  );
}

function AppErrorBoundary({ children }: { children: ReactNode }) {
  const onErrorHandler = (error: Error) => {
    if (isAxiosError(error)) {
      if (
        error.code === 'ERR_CANCELED' ||
        error.response?.data.message === 'Unauthorized'
      ) {
        window.location.href = '/sign-in';
        showErrorToast('로그인이 필요합니다.');
        return;
      }
      if (error.code === 'ERR_BAD_RESPONSE') {
        showErrorToast('서버 에러가 발생했습니다.');
        return;
      }
    }

    showErrorToast('알 수 없는 에러가 발생했습니다.');
  };
  return (
    <ErrorBoundary
      FallbackComponent={handleFallbackError}
      onError={onErrorHandler}
    >
      {children}
    </ErrorBoundary>
  );
}

export default AppErrorBoundary;
