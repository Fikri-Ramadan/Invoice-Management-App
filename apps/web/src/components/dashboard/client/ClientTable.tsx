'use client';

import LoadingComp from '@/components/LoadingComp';
import Pagination from '@/components/Pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useMyClients from '@/hooks/useMyClients';
import { SquarePen } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ClientTable({ setTotal }: { setTotal: any }) {
  const searchParams = useSearchParams();
  const { data, isLoading, isError } = useMyClients({
    page: searchParams.get('page') || '1',
    search: searchParams.get('search') || '',
  });

  const [clients, setClients] = useState<any>([]);

  useEffect(() => {
    if (!isLoading) {
      setClients(() => {
        return data?.results?.clients?.map((client: any) => {
          return {
            id: client?.id,
            name: client?.name,
            email: client?.email,
            paymentPreference: client?.paymentPreference,
            phone: client?.phone,
            address: client?.address,
          };
        });
      });
      setTotal(data?.results?.totalClient);
    }
  }, [isLoading, data]);

  if (isLoading) return <LoadingComp />;
  if (isError) return <div>Error</div>;

  return (
    <div className="max-w-7xl w-full mx-auto flex flex-col items-end gap-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">name</TableHead>
            <TableHead className="">email</TableHead>
            <TableHead className="">payment</TableHead>
            <TableHead className="">phone</TableHead>
            <TableHead className="">address</TableHead>
            <TableHead className="text-center">action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients?.map((client: any) => (
            <TableRow key={client.name}>
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell className="">{client.email}</TableCell>
              <TableCell>{client.paymentPreference}</TableCell>
              <TableCell className="">{client.phone}</TableCell>
              <TableCell className="">{client.address}</TableCell>
              <TableCell className="">
                <div className="flex items-center justify-center cursor-pointer">
                  <Link href={`/dashboard/clients/${client.id}`}>
                    <SquarePen className="w-4 h-4 text-yellow-500" />
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        totalItem={data?.results?.totalClient || 0}
        page={Number(searchParams.get('page')) || 1}
      />
    </div>
  );
}
