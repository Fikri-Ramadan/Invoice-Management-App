'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import useAddInvoice from '@/hooks/useAddInvoice';
import { validateNewInvoice } from '@/lib/validation';
import { useFormik } from 'formik';
import { Asterisk, CalendarDays } from 'lucide-react';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MultiProductField from './MultiProductField';
import TotalPrice from './TotalPrice';
import { useState } from 'react';

type Props = {
  clients: { id: string; name: string }[];
  products: { id: string; name: string }[];
};

export default function FormAddInvoice({ clients, products }: Props) {
  const { mutate, isPending } = useAddInvoice();
  const router = useRouter();
  const { toast } = useToast();
  const [data, setData] = useState([
    { id: '', name: '', quantity: 0, price: 0 },
  ]);

  const formik: any = useFormik({
    initialValues: {
      clientId: '',
      dueDate: '',
      payment: '',
    },
    validationSchema: validateNewInvoice,
    onSubmit: ({ clientId, dueDate, payment }) => {
      mutate(
        {
          clientId,
          dueDate,
          payment,
          products: data,
        },
        {
          onSuccess: () => {
            toast({
              variant: 'success',
              title: 'Invoice created successfully !',
            });
            router.push('/dashboard/invoices');
          },
          onError: (res: any) => {
            toast({
              variant: 'destructive',
              title: 'Failed to create invoice !',
              description: res?.response?.data?.message,
            });
          },
        },
      );
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="space-y-4">
        {/* Client */}
        <div>
          <div className="mb-2 font-semibold">Client</div>
          <Select
            onValueChange={(value) => {
              formik.setFieldValue('clientId', value);
            }}
          >
            <SelectTrigger className="w-1/2 border-slate-300 border-2">
              <SelectValue placeholder="Choose a Client" />
            </SelectTrigger>
            <SelectContent className="max-h-[400px]">
              {clients?.map((client: any, i: number) => {
                return (
                  <SelectItem key={i} value={`${client?.id}`}>
                    {client?.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          {formik.touched.clientId && formik.errors.clientId ? (
            <div className="text-xs text-red-500">{formik.errors.clientId}</div>
          ) : null}
        </div>

        {/* due date  */}
        <div>
          <div className="mb-2 font-semibold flex items-start">
            Due Date <Asterisk className="text-red-500 w-4 h-4" />
          </div>
          <div className="flex items-center gap-2">
            <DatePicker
              showTimeSelect
              timeInputLabel="Time:"
              dateFormat={'yyyy/MM/dd h:mm aa'}
              onChange={(date) => {
                formik.setFieldValue('dueDate', date);
              }}
              selected={formik.getFieldProps('dueDate').value}
              className="border-2 rounded-md border-slate-300 w-[200px] h-[40px]"
            />
            <CalendarDays className="opacity-50" />
          </div>
        </div>

        {/* <div className="flex items-center gap-2"> */}
        {/* product */}
        {/* <div className="w-1/4">
            <div className="mb-2 font-semibold">Product</div>
            <Select
              onValueChange={(value) => {
                formik.setFieldValue('productId', value.split('-')[0]);
                formik.setFieldValue('price', value.split('-')[1]);
                setProductIds((prev: any) => [...prev, value.split('-')[0]]);
              }}
            >
              <SelectTrigger className="w-full border-slate-300 border-2">
                <SelectValue placeholder="Choose a Product" />
              </SelectTrigger>
              <SelectContent className="max-h-[400px]">
                {products?.map((product: any, i: number) => {
                  return (
                    <SelectItem
                      key={i}
                      value={`${product?.id}-${product?.price}`}
                    >
                      {product?.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {formik.touched.product && formik.errors.product ? (
              <div className="text-xs text-red-500">
                {formik.errors.product}
              </div>
            ) : null}
          </div> */}
        {/* quantity */}
        {/* <div className="w-1/4">
            <div className="mb-2 font-semibold">Quantity</div>
            <Input
              name="quantity"
              type="number"
              className="border-slate-500"
              {...formik.getFieldProps('quantity')}
            />
            {formik.touched.quantity && formik.errors.quantity ? (
              <div className="text-xs text-red-500">
                {formik.errors.quantity}
              </div>
            ) : null}
          </div> */}
        {/* </div> */}

        {/* payment description */}
        <div>
          <div className="mb-2 font-semibold flex items-center">
            Payment Description <Asterisk className="text-red-500 w-4 h-4" />
          </div>
          <Input
            name="payment"
            type="text"
            className="border-slate-500 w-1/2"
            {...formik.getFieldProps('payment')}
          />
          {formik.touched.payment && formik.errors.payment ? (
            <div className="text-xs text-red-500">{formik.errors.payment}</div>
          ) : null}
        </div>

        {/* multi product */}
        <div>
          <MultiProductField
            products={products}
            data={data}
            setData={setData}
          />
        </div>

        {/* Total price */}
        <div>
          <TotalPrice data={data} />
        </div>
        <Button disabled={isPending} type="submit">
          Submit !
        </Button>
      </div>
    </form>
  );
}
