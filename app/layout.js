"use client"; // This directive marks this module as a Client Component

import { ThemeProvider } from 'next-themes';
import { SWRConfig } from 'swr';
import { SessionProvider } from 'next-auth/react';
import TopBarProgress from 'react-topbar-progress-indicator';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import progressBarConfig from '@/config/progress-bar/index';
import swrConfig from '@/config/swr/index';
import WorkspaceProvider from '@/providers/workspace';

import '@/styles/globals.css';

const Layout = ({ children, pageProps }) => {
  const swrOptions = swrConfig();
  const router = useRouter();

  // Removed useEffect hook that sets up route change event listeners

  TopBarProgress.config(progressBarConfig());

  useEffect(() => {
    // Redirect to login if session is undefined
    if (!pageProps.session) {
      console.error('Session is undefined in Layout component');
      router.push('/auth/login');
    }
  }, [pageProps.session, router]);

  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig value={swrOptions}>
        <ThemeProvider attribute="class">
          <WorkspaceProvider>
            <TopBarProgress />
            <header>
              {/* Navigation bar, logo, etc. */}
            </header>
            <main>{children}</main>
            <footer>
              {/* Footer content */}
            </footer>
          </WorkspaceProvider>
        </ThemeProvider>
      </SWRConfig>
    </SessionProvider>
  );
};

export default Layout;
