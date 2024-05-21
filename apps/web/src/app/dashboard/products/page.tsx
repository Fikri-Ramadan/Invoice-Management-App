'use client';

import Filter from '@/components/dashboard/Filter';
import ProductTable from '@/components/dashboard/product/ProductTable';
import { Button } from '@/components/ui/button';
import { Box, CircleFadingPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DashboardProduct() {
  const router = useRouter();
  const [total, setTotal] = useState(0);

  return (
    <div className="hidden w-full h-full flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between">
        <div className="max-w-7xl w-full mx-auto">
          <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <Box />
            Product List
          </h2>
          <p className="text-muted-foreground">
            You have {total}, Here&apos;s a list of all your products !
          </p>
          <div className="mt-4 w-full flex justify-between items-center">
            <Filter placeholder="Filter by name" />
            <Button
              className="flex gap-2 w-fit"
              onClick={() => router.push('/dashboard/products/create')}
            >
              <CircleFadingPlus className="w-4 h-4" />
              Create Product
            </Button>
          </div>
        </div>
      </div>
      <ProductTable setTotal={setTotal} />
    </div>
  );
}
