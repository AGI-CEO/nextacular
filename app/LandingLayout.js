"use client";
import { useEffect } from 'react';
import { useTheme } from 'next-themes';

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
