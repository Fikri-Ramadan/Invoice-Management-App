'use client';

import Filter from '@/components/dashboard/Filter';
import FilterByDate from '@/components/dashboard/FilterByDate';
import FilterByStatus from '@/components/dashboard/FilterByStatus';
import InvoiceTable from '@/components/dashboard/invoice/InvoiceTable';
import { Button } from '@/components/ui/button';
import { CircleFadingPlus, ScrollText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DashboardInvoice() {
  const router = useRouter();
  const [total, setTotal] = useState(0);

  return (
    <div className="hidden w-full h-full flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between">
        <div className="max-w-7xl w-full mx-auto">
          <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <ScrollText />
            Invoice List
          </h2>
          <p className="text-muted-foreground">
            You have {total}, Here&apos;s a list of all your invoices !
          </p>
          <div className="mt-4 w-full flex justify-between items-center">
            <div className='space-y-2'>
              <Filter placeholder="Filter by invoice number / client" />
              <div className='flex items-center gap-2'>
                <FilterByStatus />
                <FilterByDate />
              </div>
            </div>
            <Button
              className="flex gap-2 w-fit"
              onClick={() => router.push('/dashboard/invoices/create')}
            >
              <CircleFadingPlus className="w-4 h-4" />
              Create Invoice
            </Button>
          </div>
        </div>
      </div>
      <InvoiceTable setTotal={setTotal} />
    </div>
  );
}
