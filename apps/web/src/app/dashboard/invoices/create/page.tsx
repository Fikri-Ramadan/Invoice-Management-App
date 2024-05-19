'use client';

import FormAddInvoice from '@/components/dashboard/invoice/FormAddInvoice';
import useMyClients from '@/hooks/useMyClients';
import useMyProducts from '@/hooks/useMyProducts';
import { ArrowLeftToLine, ClipboardPlus } from 'lucide-react';
import Link from 'next/link';

export default function AddInvoicePage() {
  const { data, isLoading, isError } = useMyClients({ page: '', search: '' });
  const {
    data: prodData,
    isLoading: prodLoading,
    isError: prodError,
  } = useMyProducts({ page: '', search: '' });

  if (isLoading || prodLoading) return <div>Loading...</div>;
  if (isError || prodError) return <div>isError...</div>;

  const clients = data?.results?.clients?.map((client: any) => {
    return {
      id: client?.id,
      name: client?.name,
    };
  });

  const products = prodData?.results?.products?.map((product: any) => {
    return {
      id: product?.id,
      name: product?.name,
      price: product?.price,
    };
  });

  return (
    <div className="hidden w-full max-w-7xl h-full flex-col space-y-4 p-8 md:flex">
      <Link href={'/dashboard/invoices'}>
        <ArrowLeftToLine className="w-4 h-4 cursor-pointer" />
      </Link>
      <div className="text-3xl font-extrabold flex items-center gap-2">
        <ClipboardPlus className="w-8 h-8" />
        Create Invoice
      </div>
      <FormAddInvoice clients={clients} products={products} />
    </div>
  );
}
