'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
  totalItem: number;
  page: number;
};

export default function Pagination({ totalItem, page }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const totalPage = totalItem / 5;

  return (
    <div className="flex items-center">
      <Button
        className="h-min w-min"
        variant={'ghost'}
        onClick={() => {
          if (page > 1) {
            params.set(
              'page',
              String(Number(searchParams.get('page') || 1) - 1),
            );
            router.push(`${pathname}?${params.toString()}`);
          }
        }}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <Button
        className="h-min w-fit"
        variant={'ghost'}
        onClick={() => {
          if (page < totalPage)
            params.set(
              'page',
              String(Number(searchParams.get('page') || 1) + 1),
            );
          router.push(`${pathname}?${params.toString()}`);
        }}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
