'use client';

import Filter from '@/components/dashboard/Filter';
import ClientTable from '@/components/dashboard/client/ClientTable';
import { Button } from '@/components/ui/button';
import { BookUser, CircleFadingPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardClient() {
  const router = useRouter();

  return (
    <div className="hidden w-full h-full flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between">
        <div className="max-w-7xl w-full mx-auto">
          <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <BookUser />
            Client List
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of all your clients !
          </p>
          <div className="mt-4 w-full flex justify-between items-center">
            <Filter placeholder="Filter by name or email" />
            <Button
              className="flex gap-2 w-fit"
              onClick={() => router.push('/dashboard/clients/create')}
            >
              <CircleFadingPlus className="w-4 h-4" />
              Create Client
            </Button>
          </div>
        </div>
      </div>
      <ClientTable />
    </div>
  );
}
