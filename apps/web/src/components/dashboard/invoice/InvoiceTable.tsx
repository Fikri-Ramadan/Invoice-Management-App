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
import useMyInvoices from '@/hooks/useMyInvoices';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SendEmailDialog from './SendEmailDialog';
import PayInvoiceDialog from './PayInvoiceDialog';
import Link from 'next/link';
import { CircleAlert } from 'lucide-react';

export default function InvoiceTable({ setTotal }: { setTotal: any }) {
  const searchParams = useSearchParams();
  const { data, isLoading, isError, refetch } = useMyInvoices({
    page: searchParams.get('page') || '1',
    search: searchParams.get('search') || '',
    date: searchParams.get('date') || '',
    status: searchParams.get('status') || '',
  });

  const [invoices, setInvoices] = useState<any>([]);

  useEffect(() => {
    if (!isLoading) {
      setInvoices(() => {
        return data?.results?.invoices?.map((invoice: any) => {
          return {
            id: invoice?.id,
            invoiceNumber: invoice?.invoiceNumber,
            clientName: invoice?.client?.name,
            status: invoice?.status,
            createdAt: invoice?.createdAt,
            paidDate: invoice?.paidDate,
            payment: invoice?.payment,
            emailSent: invoice?.emailSent,
          };
        });
      });
      setTotal(data?.results?.totalInvoice);
    }
  }, [isLoading, data]);

  if (isLoading) return <LoadingComp />;
  if (isError) return <div>Error</div>;

  return (
    <div className="max-w-7xl w-full mx-auto flex flex-col items-end gap-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">No INV</TableHead>
            <TableHead className="">client</TableHead>
            <TableHead className="">status</TableHead>
            <TableHead className="">created At</TableHead>
            <TableHead className="">paid date</TableHead>
            <TableHead className="">payment</TableHead>
            <TableHead className="">email sent</TableHead>
            <TableHead className="text-center">action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices?.map((invoice: any) => (
            <TableRow key={invoice.invoiceNumber}>
              <TableCell className="font-medium">
                {invoice.invoiceNumber}
              </TableCell>
              <TableCell className="w-[100px]">{invoice.clientName}</TableCell>
              <TableCell className="">
                <span
                  className={cn(
                    'flex justify-center rounded-md p-2 font-medium',
                    invoice?.status == 'PENDING'
                      ? 'bg-yellow-200'
                      : invoice?.status == 'PAID'
                        ? 'bg-green-300'
                        : 'bg-red-300',
                  )}
                >
                  {invoice.status}
                </span>
              </TableCell>
              <TableCell className="">
                {new Date(invoice?.createdAt).toLocaleString('en-US') || ''}
              </TableCell>
              <TableCell className="w-[150px]">
                {invoice?.paidDate ? (
                  new Date(invoice?.paidDate).toLocaleString('en-US')
                ) : (
                  <span className="p-2 bg-slate-200 rounded-md font-medium">
                    {'not paid yet'}
                  </span>
                )}
              </TableCell>
              <TableCell className="">{invoice.payment}</TableCell>
              <TableCell className="">
                {invoice.emailSent
                  ? new Date(invoice?.emailSent).toLocaleString('en-US')
                  : 'false'}
              </TableCell>
              <TableCell className="flex items-center gap-2 h-[100px]">
                <div className="flex items-center justify-center cursor-pointer">
                  <Link href={`/dashboard/invoices/${invoice.id}`}>
                    <CircleAlert className="w-4 h-4 text-blue-500" />
                  </Link>
                </div>
                <SendEmailDialog invoiceId={invoice?.id} refetch={refetch} />
                {invoice?.status != 'PAID' && (
                  <PayInvoiceDialog invoiceId={invoice?.id} refetch={refetch} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        totalItem={data?.results?.totalInvoice || 0}
        page={Number(searchParams.get('page')) || 1}
      />
    </div>
  );
}
