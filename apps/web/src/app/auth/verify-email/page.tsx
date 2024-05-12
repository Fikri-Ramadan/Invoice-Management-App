'use client';

import { Button } from '@/components/ui/button';
import useEmailVerified from '@/hooks/useEmailVerified';
import { BadgeAlert, BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const { data, isLoading, isError, refetch } = useEmailVerified({
    token: token as string,
  });

  useEffect(() => {}, []);

  if (isLoading) return <div>Loading...</div>;

  if (isError)
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
        <span>
          <BadgeAlert className='w-24 h-24 text-red-500' />
        </span>
        <h2 className="text-[42px] text-red-500 font-bold">Error Token</h2>
      </div>
    );

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
      <div className="max-w-xl text-center flex flex-col justify-center items-center bg-slate-200 p-16 rounded-md">
        <span className="text-center">
          <BadgeCheck className="h-24 w-24 text-green-600" />
        </span>
        <h2 className="mb-2 text-[42px] font-bold text-green-600">
          Email Successfully Verified !
        </h2>
        <div className="flex justify-center">
          <Link href="/auth/signin" className="text-blue-500 font-semibold">
            Continue Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
