'use client';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import SideNavbar from '@/components/SideNavbar';
import { usePathname } from 'next/navigation';

export default function ApplicationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname.includes(`/dashboard`))
    return (
      <div className="min-h-screen w-full bg-white text-black flex">
        {/* sidebar */}
        <SideNavbar />
        {/* main page */}
        <div className='pl-[160px] w-full'>{children}</div>
      </div>
    );
  else if (pathname.includes(`/auth`))
    return (
      <div className="relative min-h-screen w-full bg-gray-100 ">
        {children}
      </div>
    );
  else if (pathname == '/auth/admin/login')
    return <div className="w-full h-screen bg-gray-300">{children}</div>;

  return (
    <>
      <Header />
      <div className="relative h-auto w-full bg-gray-100 ">{children}</div>
      <Footer />
    </>
  );
}
