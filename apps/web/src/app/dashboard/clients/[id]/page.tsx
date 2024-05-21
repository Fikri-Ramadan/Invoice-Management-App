'use client';

import FormEditClient from '@/components/dashboard/client/FormEditClient';
import { ArrowLeftToLine, CircleUser } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function EditClientPage() {
  const params = useParams();

  return (
    <div className="hidden w-full max-w-7xl h-full flex-col space-y-8 p-8 md:flex">
      <Link href={'/dashboard/clients'}>
        <ArrowLeftToLine className="w-4 h-4 cursor-pointer" />
      </Link>
      <div className="text-3xl font-extrabold flex items-center gap-2">
        <CircleUser className='w-8 h-8' /> Edit Client{' '}
        <span className="text-slate-500 text-base">(id: {params?.id})</span>
      </div>
      <FormEditClient id={params?.id as string} />
    </div>
  );
}
