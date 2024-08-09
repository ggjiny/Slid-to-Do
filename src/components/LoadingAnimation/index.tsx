import cn from '@utils/cn';

interface LoadingAnimationProps {
  width?: number;
  height?: number;
  className?: string;
}

function LoadingAnimation({
  width = 24,
  height = 24,
  className,
}: LoadingAnimationProps) {
  return (
    <div
      className={cn(`h-8 w-8 ${className} animate-spin`)}
      style={{
        width,
        height,
      }}
    >
      <img src="img/loading.webp" alt="loading" />
    </div>
  );
}

export default LoadingAnimation;
