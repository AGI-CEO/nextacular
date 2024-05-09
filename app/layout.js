"use client"; // This directive marks this module as a Client Component

import dynamic from 'next/dynamic';
import { SWRConfig } from 'swr';
import { SessionProvider } from 'next-auth/react';
import TopBarProgress from 'react-topbar-progress-indicator';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

import progressBarConfig from '@/config/progress-bar/index';
import swrConfig from '@/config/swr/index';
import WorkspaceProvider from '@/providers/workspace';

import '@/styles/globals.css';

// Dynamically import ThemeProvider with ssr set to false to ensure it's only used client-side
const ThemeProvider = dynamic(() => import('next-themes').then((mod) => mod.ThemeProvider), {
  ssr: false,
  loadableGenerated: {
    webpack: () => [require.resolveWeak('next-themes')],
  },
});

const Layout = ({ children, pageProps }) => {
  const swrOptions = swrConfig();
  const router = useRouter(); // useRouter replaces useNavigation

  // Apply the progressBarConfig as an object directly without invoking it as a function
  TopBarProgress.config(progressBarConfig);

  useEffect(() => {
    // Client-side only code
  }, []); // Dependency array for client-side effects

  return (
    // The following html and body tags are required for Next.js 14 RootLayout
    <html lang="en">
      <body>
        <SessionProvider session={pageProps?.session}>
          <SWRConfig value={swrOptions}>
            <ThemeProvider attribute="class">
              <WorkspaceProvider>
                <TopBarProgress />
                <div> {/* Main content wrapper */}
                  <header>
                    {/* Navigation bar, logo, etc. */}
                  </header>
                  {/* Removed the <main> tag to prevent nesting within AuthLayout's <main> tag */}
                  {children}
                  <footer>
                    {/* Footer content */}
                  </footer>
                </div>
              </WorkspaceProvider>
            </ThemeProvider>
          </SWRConfig>
        </SessionProvider>
      </body>
    </html>
  );
};

export default Layout;
