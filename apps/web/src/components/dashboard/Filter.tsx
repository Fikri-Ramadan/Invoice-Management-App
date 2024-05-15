'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState } from 'react';

export default function Filter({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get('search') || '');

  return (
    <div className="w-fit flex items-center gap-2">
      <Input
        placeholder={placeholder}
        className="border-slate-500"
        defaultValue={searchParams.get('search') || ''}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          router.push(`${pathname}?search=${search}`);
        }}
      >
        Filter
      </Button>
      <Button
        variant={'outline'}
        onClick={() => {
          setSearch('');
          router.push(pathname);
        }}
      >
        Reset
      </Button>
    </div>
  );
}
