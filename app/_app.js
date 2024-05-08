import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Updated import to use next/navigation
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import ReactGA from 'react-ga';
import TopBarProgress from 'react-topbar-progress-indicator';
import { SWRConfig } from 'swr';

import progressBarConfig from '@/config/progress-bar/index';
import swrConfig from '@/config/swr/index';
import WorkspaceProvider from '@/providers/workspace';

import '@/styles/globals.css';

const App = ({ Component, pageProps }) => {
  const [progress, setProgress] = useState(false);
  const router = useRouter();
  const swrOptions = swrConfig();

  // Client-side only effect for route change progress bar
  useEffect(() => {
    const handleRouteChangeStart = () => setProgress(true);
    const handleRouteChangeComplete = () => setProgress(false);

    // Set up route change event listeners
    if (typeof window !== 'undefined') {
      router.events.on('routeChangeStart', handleRouteChangeStart);
      router.events.on('routeChangeComplete', handleRouteChangeComplete);
      TopBarProgress.config(progressBarConfig());

      // Clean up event listeners on unmount
      return () => {
        router.events.off('routeChangeStart', handleRouteChangeStart);
        router.events.off('routeChangeComplete', handleRouteChangeComplete);
      };
    }
  }, [router.events]);

  // Client-side only effect for Google Analytics
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID);
      const handleRouteChange = (url) => {
        ReactGA.pageview(url);
      };

      // Set up Google Analytics event listener
      router.events.on('routeChangeComplete', handleRouteChange);

      // Clean up the Google Analytics event listener on unmount
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
  }, [router.events]);

  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig value={swrOptions}>
        <ThemeProvider attribute="class">
          <WorkspaceProvider>
            {progress && <TopBarProgress />}
            <Component {...pageProps} />
          </WorkspaceProvider>
        </ThemeProvider>
      </SWRConfig>
    </SessionProvider>
  );
};

export default App;
