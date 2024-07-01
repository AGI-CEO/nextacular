import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Prevents the server from rendering until the client is ready
  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center px-2 py-2 space-x-2 text-sm text-gray-800 rounded hover:bg-blue-600 hover:text-white"
    >
      {theme === 'dark' ? (
        <>
          <SunIcon className="w-5 h-5" />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <MoonIcon className="w-5 h-5" />
          <span>Dark Mode</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggler;
