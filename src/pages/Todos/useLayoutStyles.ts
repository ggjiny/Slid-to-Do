import useWindowHeight from '@hooks/useWindowHeight';
import useWindowWidth from '@hooks/useWindowWidth';
import cn from '@utils/cn';

function useLayoutStyles() {
  const windowHeight = useWindowHeight();
  const windowWidth = useWindowWidth();
  const isTablet = windowWidth >= 744;

  const mobileHeight = windowHeight - 88;
  const defaultHeight = windowHeight - 196;
  const tabletHeight = windowHeight - 184;

  const containerClass = cn('w-full overflow-auto rounded-xl', {
    'tablet:h-dvh': isTablet,
  });

  const style = { height: `${isTablet ? tabletHeight : defaultHeight}px` };

  const entireContainerClass = cn(
    'flex w-full flex-col gap-4 p-4 tablet:p-6 desktop:w-[1152px] desktop:py-6 desktop:pl-[360px]',
    {
      'tablet:h-dvh': isTablet,
    },
  );

  const entireContainerStyle = !isTablet ? { height: `${mobileHeight}px` } : {};

  return {
    containerClass,
    style,
    entireContainerClass,
    entireContainerStyle,
  };
}

export default useLayoutStyles;
