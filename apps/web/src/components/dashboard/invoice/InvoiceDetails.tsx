'use client';

import useInvoiceById from '@/hooks/useInvoiceById';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import Image from 'next/image';

export default function InvoiceDetails({ id }: { id: string }) {
  const { data, isLoading, isError } = useInvoiceById({ id });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  console.log(data?.results);
  const total = data?.results?.invoiceDetails?.reduce(
    (acc: number, curr: any) => acc + curr?.subTotal,
    0,
  );
  return (
    <div className="space-y-8 tracking-widest">
      {/* recurring info */}
      {data?.results?.recurringInvoices?.length > 0 && (
        <div className="flex flex-col items-start gap-2">
          <div className="flex gap-2">
            <div>Recurring :</div>
            <div>{data?.results?.recurringInvoices[0]?.paymentFrequency}</div>
          </div>
          <div className="flex gap-2">
            <div>Start Date :</div>
            <div>
              {new Date(
                data?.results?.recurringInvoices[0]?.startDate,
              ).toLocaleString('en-US')}
            </div>
          </div>
          <div className="flex gap-2">
            <div>End Date :</div>
            {new Date(
              data?.results?.recurringInvoices[0]?.endDate,
            ).toLocaleString('en-US')}
          </div>
          <div className="flex gap-2">
            <div>Last Created :</div>
            <div>
              {new Date(
                data?.results?.recurringInvoices[0]?.lastCreated,
              ).toLocaleString('en-US')}
            </div>
          </div>
        </div>
      )}

      {/* status */}
      <div
        className={cn(
          'font-semibold text-2xl py-2 flex items-center justify-center',
          data?.results?.status == 'PENDING'
            ? 'bg-yellow-200'
            : data?.results?.status == 'PAID'
              ? 'bg-green-300'
              : 'bg-red-300',
        )}
      >
        {data?.results?.status}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-slate-500">
            ({new Date(data?.results?.createdAt).toLocaleString('en-US')})
          </div>

          <div className="flex items-center gap-2">
            {data?.results?.status != 'PAID' ? (
              <div>Due Date :</div>
            ) : (
              <div>Paid Date :</div>
            )}
            {data?.results?.status != 'PAID' ? (
              <div className="text-slate-500">
                {new Date(data?.results?.dueDate).toLocaleString('en-US')}
              </div>
            ) : (
              <div className="text-slate-500">
                {new Date(data?.results?.paidDate).toLocaleString('en-US')}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-start justify-between">
          {/* client info */}
          <div className="flex items-start gap-2">
            <div className="font-semibold text-xl">Client :</div>
            <div>
              <div className="tracking-wider">
                {data?.results?.client?.name}
              </div>
              <div className="tracking-wider">
                {data?.results?.client?.phone}
              </div>
              <div className="tracking-wider">
                {data?.results?.client?.email}
              </div>
              <div className="tracking-wider">
                {data?.results?.client?.address}
              </div>
            </div>
          </div>

          {/* invoice number */}
          <div className="font-semibold text-xl">
            {data?.results?.invoiceNumber}
          </div>
        </div>
      </div>

      {/* payment description */}
      <div className="flex items-start gap-2">
        <div className="font-semibold text-xl">Payment Description :</div>
        <div className="max-w-[500px] text-lg text-justify">
          {data?.results?.payment}
        </div>
      </div>

      {/* invoice product details */}
      <div>
        <div className="font-semibold text-xl text-center mb-4">
          Order Summary
        </div>
        <div className="flex flex-col gap-8">
          {data?.results?.invoiceDetails?.map((detail: any, i: number) => {
            return (
              <div key={i} className="flex items-center gap-4">
                <Image
                  src={
                    process.env.NEXT_PUBLIC_IMAGE_URL +
                    '/' +
                    detail?.product?.picture
                  }
                  alt="prod picture"
                  width={80}
                  height={80}
                />
                <div className="w-full flex items-center justify-between">
                  <div className="text-lg">
                    {detail?.product?.name}{' '}
                    <span className="text-base text-slate-600">
                      (x{detail?.quantity})
                    </span>
                  </div>
                  <div>Rp. {detail?.price}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="my-4 border-t-2 border-black" />

        {/* subtotal */}
        <div className="flex items-center justify-end gap-64">
          <div className="font-semibold text-xl">Total</div>
          <div className="font-semibold text-lg">Rp. {total}</div>
        </div>
      </div>
    </div>
  );
}
