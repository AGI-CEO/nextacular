import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Bars3Icon } from '@heroicons/react/24/outline';
import sidebarMenu from '@/config/menu/sidebar-static';
import { useWorkspace } from '@/providers/workspace';

// Dynamically import Menu, Actions, and useWorkspaces for client-side rendering only
const Menu = dynamic(() => import('./menu'), {
  ssr: false,
});
const Actions = dynamic(() => import('./actions'), {
  ssr: false,
});
const useWorkspaces = dynamic(() => import('@/hooks/data').then((hooks) => hooks.useWorkspaces), {
  ssr: false,
  loading: () => null,
});

const staticMenu = sidebarMenu();

// Dynamically import useState to use it only on the client-side
const useState = dynamic(() => import('react').then((mod) => mod.useState), {
  ssr: false,
  loading: () => null,
});

const Sidebar = ({ menu }) => {
  const [showMenu, setMenuVisibility] = useState(false);
  const { data, isLoading } = useWorkspaces();
  const { workspace } = useWorkspace();

  const renderMenu = () => {
    return (
      workspace &&
      menu.map((item, index) => (
        <Menu
          key={index}
          data={item}
          isLoading={isLoading}
          showMenu={data?.workspaces.length > 0 || isLoading}
        />
      ))
    );
  };

  const renderStaticMenu = () => {
    return staticMenu.map((item, index) => (
      <Menu key={index} data={item} showMenu={true} />
    ));
  };

  const toggleMenu = () => setMenuVisibility(!showMenu);

  return (
    <aside className="sticky z-40 flex flex-col space-y-5 text-white bg-gray-800 dark:bg-gray-900 md:overflow-y-auto md:w-1/4 md:h-screen overscroll-contain">
      <div className="relative flex items-center justify-center p-5 text-center border-b border-b-gray-900">
        <Link href="/" className="flex-grow text-2xl font-bold">
          Nextacular
        </Link>
        <button className="absolute right-0 p-5 md:hidden" onClick={toggleMenu}>
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>
      <div
        className={[
          'flex-col space-y-5 md:flex md:relative md:top-0',
          showMenu
            ? 'absolute top-12 bg-gray-800 right-0 left-0 h-screen'
            : 'hidden',
        ].join(' ')}
      >
        <Actions />
        <div className="flex flex-col p-5 space-y-10">
          {renderStaticMenu()}
          {renderMenu()}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
