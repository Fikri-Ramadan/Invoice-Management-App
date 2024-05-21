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
import useMyProducts from '@/hooks/useMyProducts';
import { SquarePen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import DeleteProductDialog from './DeleteProductDialog';

export default function ProductTable({ setTotal }: { setTotal: any }) {
  const searchParams = useSearchParams();
  const { data, isLoading, isError, refetch } = useMyProducts({
    page: searchParams.get('page') || '1',
    search: searchParams.get('search') || '',
  });

  const [products, setproducts] = useState<any>([]);

  useEffect(() => {
    if (!isLoading) {
      setproducts(() => {
        return data?.results?.products?.map((product: any) => {
          return {
            id: product?.id,
            image: product?.picture,
            name: product?.name,
            price: product?.price,
            description: product?.description,
          };
        });
      });
      setTotal(data?.results?.totalProduct);
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
              <TableCell className="h-[100px] flex items-center justify-center gap-2">
                <div className="flex items-center justify-center cursor-pointer">
                  <Link href={`/dashboard/products/${product.id}`}>
                    <SquarePen className="w-4 h-4 text-yellow-500" />
                  </Link>
                </div>
                <DeleteProductDialog
                  id={product.id}
                  name={product.name}
                  refetch={refetch}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        totalItem={data?.results?.totalProduct || 0}
        page={Number(searchParams.get('page')) || 1}
      />
    </div>
  );
}
