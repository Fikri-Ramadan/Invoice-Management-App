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
import useMyProducts from '@/hooks/useMyProducts';
import { ChevronLeft, ChevronRight, SquarePen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProductTable() {
  const { data, isLoading, isError } = useMyProducts();

  const [products, setproducts] = useState<any>([]);

  useEffect(() => {
    if (!isLoading) {
      setproducts(() => {
        return data?.results?.map((product: any) => {
          return {
            id: product?.id,
            image: product?.picture,
            name: product?.name,
            price: product?.price,
            description: product?.description,
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
            <TableHead className="">picture</TableHead>
            <TableHead className="">name</TableHead>
            <TableHead className="">price</TableHead>
            <TableHead className="">description</TableHead>
            <TableHead className="text-center">action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product: any) => (
            <TableRow key={product.name}>
              <TableCell className="w-[100px]">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.image}`}
                  alt="product picture"
                  width={60}
                  height={60}
                />
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell className="">Rp. {product.price}</TableCell>
              <TableCell>
                {product.description?.length < 20 ? (
                  <span>{product.description}</span>
                ) : (
                  <span>{product.description.substring(0, 20)}...</span>
                )}
              </TableCell>
              <TableCell className="">
                <div className="flex items-center justify-center cursor-pointer">
                  <Link href={`/dashboard/products/${product.id}`}>
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
