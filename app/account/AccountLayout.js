import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
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
  const { status } = useSession();
  const router = useRouter();
  const { workspace } = useWorkspace();

  // Ensure router logic is only executed on the client side
  useEffect(() => {
    if (status === 'unauthenticated') {
      // Check if window is defined to ensure this runs only in the browser
      if (typeof window !== 'undefined') {
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
