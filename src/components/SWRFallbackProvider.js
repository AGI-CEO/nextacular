'use client';

import React from 'react';
import { SWRConfig } from 'swr';

export const SWRFallbackProvider = ({ children, fallback }) => {
  // This component sets up an SWRConfig context with fallback data for client-side components.
  // It should be used to wrap components that will use the useSWR hook for data fetching.
  // The fallback data is used for initial hydration on the client side.
  return (
    <SWRConfig value={{ fallback }}>
      {children}
    </SWRConfig>
  );
};
