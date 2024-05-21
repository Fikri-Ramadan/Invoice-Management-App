'use client';

import FormEditProduct from '@/components/dashboard/product/FormEditProduct';
import { ArrowLeftToLine, PackageOpen } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function EditProductPage() {
  const params = useParams();

  return (
    <div className="hidden w-full max-w-7xl h-full flex-col space-y-8 p-8 md:flex">
      <Link href={'/dashboard/products'}>
        <ArrowLeftToLine className="w-4 h-4 cursor-pointer" />
      </Link>
      <div className="text-3xl font-extrabold flex items-center gap-2">
        <PackageOpen className="w-8 h-8" /> Edit Product{' '}
        <span className="text-slate-500 text-base">(id: {params?.id})</span>
      </div>
      <FormEditProduct id={params?.id as string} />
    </div>
  );
}
