"use client";
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

import Content from '@/components/Content/index';
import Header from '@/components/Header/index';
// Dynamically import Sidebar for client-side rendering only
const Sidebar = dynamic(() => import('@/components/Sidebar/index'), {
  ssr: false,
});
import menu from '@/config/menu/index';
import { useWorkspace } from '@/providers/workspace';

const AccountLayout = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { workspace } = useWorkspace();

  // Redirect unauthenticated users to the login page
  useEffect(() => {
    // Check if window is defined to ensure this runs only in the browser
    if (typeof window !== 'undefined') {
      // Check if the session token exists in local storage
      const sessionToken = localStorage.getItem('next-auth.session-token');
      // If the session token exists, consider the user as authenticated
      if (sessionToken) {
        router.replace('/account');
      } else if (status === 'unauthenticated') {
        router.replace('/auth/login');
      }
    }
  }, [status, router]);

  if (status === 'loading') return <></>;
  return (
    <main className="relative flex flex-col w-screen h-screen space-x-0 text-gray-800 dark:text-gray-200 md:space-x-5 md:flex-row bg-gray-50 dark:bg-gray-800">
      <Sidebar menu={menu(workspace?.slug)} />
      <Content>
        <Toaster position="bottom-left" toastOptions={{ duration: 10000 }} />
        <Header />
        {children}
      </Content>
    </main>
  );
};

export default AccountLayout;
