import { useMediaQuery } from '@uidotdev/usehooks';

const useMedia = () => {
  const isExtraSmallDevice = useMediaQuery('(max-width : 576px)');
  const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)');
  const isMediumDevice = useMediaQuery('(max-width: 992px)');
  const isLargeDevice = useMediaQuery('only screen and (max-width : 1240px)');
  const isExtraLargeDevice = useMediaQuery('only screen and  (max-width : 1440px)');

  return { isExtraSmallDevice, isSmallDevice, isMediumDevice, isLargeDevice, isExtraLargeDevice };
};

export default useMedia;
