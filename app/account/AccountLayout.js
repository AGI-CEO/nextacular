import { useSession } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';

import Content from '@/components/Content/index';
import Header from '@/components/Header/index';
import Sidebar from '@/components/Sidebar/index';
import menu from '@/config/menu/index';
import { useWorkspace } from '@/providers/workspace';

// Dynamically import useRouter to use it only on the client-side
const useRouter = dynamic(() => import('next/router'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const AccountLayout = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();
  const { workspace } = useWorkspace();

  if (typeof window !== 'undefined' && status === 'unauthenticated') {
    router.replace('/auth/login');
  }

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
