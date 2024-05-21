'use client';

import FormProfile from '@/components/dashboard/profile/FormProfile';
import { UserCog } from 'lucide-react';

export default function DashboardProfile() {
  return (
    <div className="hidden w-full max-w-7xl h-full flex-col space-y-8 p-8 md:flex">
      <h2 className="text-3xl font-extrabold flex items-center gap-2">
        <UserCog className="w-8 h-8" />
        Personal Data
      </h2>
      <FormProfile />
    </div>
  );
}
