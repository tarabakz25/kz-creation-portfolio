import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '~/lib/constants';

/**
 * デバイスパラメータ
 */
export interface DeviceParams {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
}

/**
 * デバイスサイズに応じたパラメータを返すフック
 * レスポンシブデザインのためのデバイス判定
 *
 * @returns デバイス情報
 */
export function useDeviceParams(): DeviceParams {
  const [params, setParams] = useState<DeviceParams>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    width: 0,
  });

  useEffect(() => {
    const updateParams = () => {
      const width = window.innerWidth;
      setParams({
        isMobile: width < BREAKPOINTS.MOBILE,
        isTablet: width >= BREAKPOINTS.MOBILE && width < BREAKPOINTS.DESKTOP,
        isDesktop: width >= BREAKPOINTS.DESKTOP,
        width,
      });
    };

    updateParams();
    window.addEventListener('resize', updateParams);
    return () => window.removeEventListener('resize', updateParams);
  }, []);

  return params;
}
