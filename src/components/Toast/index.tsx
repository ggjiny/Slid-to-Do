import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

interface ToastProps {
  message: string;
  type: 'completed' | 'error';
  onRemove: () => void;
}

function Toast({ message, type, onRemove }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fadeInTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onRemove, 500);
    }, 3000);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
    };
  }, [message, onRemove]);

  return (
    <div
      className={`fixed bottom-0 left-1/2 -translate-x-1/2 transform font-Pretendard transition-all duration-500 ${
        isVisible ? 'bottom-12 opacity-100' : 'bottom-0 opacity-0'
      }`}
    >
      <div
        className={`rounded-full px-6 py-3 text-white shadow-md ${
          type === 'completed' ? 'bg-green-500' : 'bg-red-500'
        }`}
      >
        {message}
      </div>
    </div>
  );
}

export const showToast = (
  message: string,
  type: 'completed' | 'error' = 'completed',
) => {
  const toastContainer = document.createElement('div');
  document.body.appendChild(toastContainer);
  const root = createRoot(toastContainer);

  const removeToast = () => {
    root.unmount();
    document.body.removeChild(toastContainer);
  };

  root.render(<Toast message={message} type={type} onRemove={removeToast} />);
};

export const showErrorToast = (message: string) => {
  showToast(message, 'error');
};
