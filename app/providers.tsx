'use client';
import { useEffect, type JSX } from 'react';
import { SWRConfig } from 'swr';
import { localStorageProvider } from '@/utils/swrCache';

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        provider: localStorageProvider,
      }}
    >
      {children}
    </SWRConfig>
  );
}

export function ViewportScaleProvider() {
  useEffect(() => {
    // Only run on iOS devices
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      let viewport = document.querySelector(
        'meta[name="viewport"]'
      ) as HTMLMetaElement;

      // Create one if it doesn't exist
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        document.head.appendChild(viewport);
      }

      // Set the viewport content
      viewport.content =
        'width=device-width, initial-scale=1.0, maximum-scale=1.0';

      // Cleanup function
      return () => {
        if (viewport) {
          viewport.content = 'width=device-width, initial-scale=1.0';
        }
      };
    }
  }, []);
  return <></>;
}
