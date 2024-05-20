'use client';

import FormAddProduct from '@/components/dashboard/product/FormAddProduct';
import { ArrowLeftToLine, FileBox } from 'lucide-react';
import Link from 'next/link';

export default function AddProductPage() {
  return (
    <div className="hidden w-full max-w-7xl h-full flex-col space-y-8 p-8 md:flex">
      <Link href={'/dashboard/products'}>
        <ArrowLeftToLine className="w-4 h-4 cursor-pointer" />
      </Link>
      <div className="text-3xl font-extrabold flex items-center gap-2">
        <FileBox className="w-8 h-8" />
        Add New Product
      </div>
      <FormAddProduct />
    </div>
  );
}
