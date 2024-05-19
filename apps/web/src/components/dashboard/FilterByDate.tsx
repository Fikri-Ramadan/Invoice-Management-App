'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '../ui/input';

export default function FilterByDate() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  return (
    <Input
      type="date"
      className="w-fit"
      value={searchParams.get('date') || ''}
      onChange={(e) => {
        params.set('date', e.target.value);
        router.push(`${pathname}?${params.toString()}`);
      }}
    />
  );
}
