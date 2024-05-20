'use client';

import { sumTotal } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function TotalPrice({ data }: { data: any }) {
  const priceData = data?.map((product: any) => ({
    quantity: Number(product?.quantity),
    price: Number(product?.price),
  }));

  const [totalPrice, setTotalPrice] = useState<number>();

  useEffect(() => {
    setTotalPrice(sumTotal(priceData));
  }, [priceData]);

  return (
    <div className="w-full space-y-4 mt-16 mb-8">
      <div className="mb-2 text-xl font-semibold">Invoice Info</div>
      <div>
        {data.length > 0 &&
          data?.map((product: any, i: number) => {
            return (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {!!product.name && (
                    <div className="text-lg">{product.name}</div>
                  )}
                  {!!product.quantity && (
                    <div className="text-sm text-slate-600">
                      (x{product.quantity})
                    </div>
                  )}
                </div>
                {!!product.price && <div>Rp. {product.price}</div>}
              </div>
            );
          })}
      </div>
      <div className="flex items-center justify-between border-t-2 border-black">
        <div className="font-semibold">Total</div>
        <div className="font-semibold">Rp. {totalPrice}</div>
      </div>
    </div>
  );
}
