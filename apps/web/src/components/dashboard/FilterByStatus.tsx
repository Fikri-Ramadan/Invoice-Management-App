'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export default function FilterByStatus() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  return (
    <Select
      onValueChange={(value) => {
        params.set('status', value);
        router.push(`${pathname}?${params.toString()}`);
      }}
      value={searchParams.get('status') || ''}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="PENDING">PENDING</SelectItem>
        <SelectItem value="PAID">PAID</SelectItem>
        <SelectItem value="DUE_DATE">DUE_DATE</SelectItem>
      </SelectContent>
    </Select>
  );
}
