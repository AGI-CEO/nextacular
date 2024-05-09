"use client"; // This directive marks this module as a Client Component

import { ThemeProvider } from 'next-themes';
import { SWRConfig } from 'swr';
import { SessionProvider } from 'next-auth/react';
import TopBarProgress from 'react-topbar-progress-indicator';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

import progressBarConfig from '@/config/progress-bar/index';
import swrConfig from '@/config/swr/index';
import WorkspaceProvider from '@/providers/workspace';

import '@/styles/globals.css';

const Layout = ({ children, pageProps }) => {
  const swrOptions = swrConfig();
  const router = useRouter(); // useRouter replaces useNavigation

  // Apply the progressBarConfig as an object directly without invoking it as a function
  TopBarProgress.config(progressBarConfig);

  useEffect(() => {
    // Client-side only code
  }, []); // Dependency array for client-side effects

  return (
    <html lang="en">
      <SessionProvider session={pageProps?.session}>
        <SWRConfig value={swrOptions}>
          <ThemeProvider attribute="class">
            <WorkspaceProvider>
              <TopBarProgress />
              <body>
                <header>
                  {/* Navigation bar, logo, etc. */}
                </header>
                <main>{children}</main>
                <footer>
                  {/* Footer content */}
                </footer>
              </body>
            </WorkspaceProvider>
          </ThemeProvider>
        </SWRConfig>
      </SessionProvider>
    </html>
  );
};

export default Layout;
