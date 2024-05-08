import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

// Dynamically import useEffect for client-side rendering only
const useEffect = dynamic(() => import('react').then((mod) => mod.useEffect), {
  ssr: false,
});

const LandingLayout = ({ children }) => {
  const { setTheme } = useTheme();

  // useEffect to set the theme should be called at the top level, not conditionally
  useEffect(() => {
    setTheme('light');
  }, [setTheme]);

  return (
    <main className="relative flex flex-col text-gray-800">{children}</main>
  );
};

export default LandingLayout;
