'use client';

import FormAddClient from '@/components/dashboard/client/FormAddClient';
import { ArrowLeftToLine, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function CreateClientPage() {
  return (
    <div className="hidden w-full max-w-7xl h-full flex-col space-y-8 p-8 md:flex">
      <Link href={'/dashboard/clients'}>
        <ArrowLeftToLine className="w-4 h-4 cursor-pointer" />
      </Link>
      <div className="text-3xl font-extrabold flex items-center gap-2">
        <UserPlus className="w-8 h-8" />
        Add New Client
      </div>
      <FormAddClient />
    </div>
  );
}
