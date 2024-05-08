import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { Toaster } from 'react-hot-toast';

// Dynamically import useEffect and useRouter for client-side rendering only
const useEffect = dynamic(() => import('react').then((mod) => mod.useEffect), {
  ssr: false,
});
const useRouter = dynamic(() => import('next/navigation').then((mod) => mod.useRouter), {
  ssr: false,
});

const AuthLayout = ({ children }) => {
  const { status } = useSession();
  const { setTheme } = useTheme();
  const router = useRouter();

  // useEffect to set the theme should be called at the top level, not conditionally
  useEffect(() => {
    setTheme('light');
  }, [setTheme]);

  // Redirect authenticated users to the '/account' page
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/account');
    }
  }, [status, router]);

  if (status === 'loading') return <></>;
  return (
    <main className="relative flex flex-col items-center justify-center h-screen p-10 space-y-10">
      <Toaster position="bottom-center" toastOptions={{ duration: 10000 }} />
      {children}
    </main>
  );
};

export default AuthLayout;
