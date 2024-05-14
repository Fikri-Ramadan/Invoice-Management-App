'use client';

import LoadingComp from '@/components/LoadingComp';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useMyClients from '@/hooks/useMyClients';
import { ChevronLeft, ChevronRight, SquarePen } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// const clients = [
//   {
//     name: 'client 1',
//     email: 'clientclient1@gmail.com',
//     paymentPreference: 'cash',
//     phone: '081999929292',
//     address: 'JL. danau ngebel',
//   },
//   {
//     name: 'client 2',
//     email: 'clientclient2@gmail.com',
//     paymentPreference: 'cash',
//     phone: '081239817232',
//     address: 'JL. danau ngebel lorem lorem',
//   },
// ];

export default function ClientTable() {
  const { data, isLoading, isError } = useMyClients();

  const [clients, setClients] = useState<any>([]);

  useEffect(() => {
    if (!isLoading) {
      setClients(() => {
        return data?.results?.map((client: any) => {
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
      <div className="flex items-center">
        <Button className="h-min w-min" variant={'ghost'}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <span className="w-8 h-8 border-2 border-slate-100 rounded-md flex items-center justify-center">
          1
        </span>
        <Button className="h-min w-fit" variant={'ghost'}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
