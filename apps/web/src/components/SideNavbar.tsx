'use client';

import { useState } from 'react';
import { Nav } from './ui/nav';

import {
  ChevronRight,
  LayoutDashboard,
  UsersRound,
  ScrollText,
  NotebookPen,
  Store,
  BarChart3,
  LineChart,
  Tag,
  ArrowRightLeft,
  BookUser,
  UserCog,
} from 'lucide-react';
import { Button } from './ui/button';
import useSession from '@/hooks/useSession';
import { Badge } from './ui/badge';
import { useRouter } from 'next/navigation';
import LogoutDialog from './auth/LogoutDialog';
// import LogoutDialog from './dashboard/LogoutDialog';

type Props = {};
const SideNavbar = (props: Props) => {
  const { session, removeSessionCookie } = useSession();
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toogleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const links = [
    {
      title: 'Invoices',
      href: '/dashboard/invoices',
      icon: ArrowRightLeft,
      variant: 'ghost',
    },
    {
      title: 'Clients',
      href: '/dashboard/clients',
      icon: BookUser,
      variant: 'ghost',
    },
    {
      title: 'Products',
      href: '/dashboard/products',
      icon: ScrollText,
      variant: 'ghost',
    },
    {
      title: 'Profile',
      href: '/dashboard/profile',
      icon: UserCog,
      variant: 'ghost',
    },
  ];

  if (session?.role == 'Super_Admin')
    links.splice(1, 0, {
      title: 'Users',
      href: '/dashboard/users',
      icon: UsersRound,
      variant: 'ghost',
    });

  return (
    <div className="fixed min-w-[80px] min-h-screen border-r px-3 pb-10 pt-8 flex flex-col justify-between">
      <div className="absolute right-[-20px] top-7">
        <Button
          onClick={toogleSidebar}
          variant={'secondary'}
          className="rounded-full p-2"
        >
          <ChevronRight />
        </Button>
      </div>
      <div>
        <div className="mb-4 w-full flex items-center justify-center">
          <LayoutDashboard />
        </div>
        {!isCollapsed && (
          <Badge className="flex items-center justify-center w-full my-4">
            Hello, {session?.email?.split('@')[0]}
          </Badge>
        )}
        <Nav isCollapsed={isCollapsed} links={links} />
      </div>
      <LogoutDialog />
    </div>
  );
};
export default SideNavbar;
