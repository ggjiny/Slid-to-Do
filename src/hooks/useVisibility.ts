import { useEffect, useState } from 'react';

const useVisibility = (
  onClose: () => void,
  onConfirm?: () => void,
  initialState = false,
) => {
  const [isVisible, setIsVisible] = useState(initialState);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    if (!isVisible) return;
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (onConfirm) {
    const handleConfirm = () => {
      setIsVisible(false);
      setTimeout(onConfirm, 300);
    };
    return { isVisible, handleClose, handleConfirm };
  }

  return { isVisible, handleClose };
};

export default useVisibility;
