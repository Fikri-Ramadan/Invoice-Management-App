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
      recurringFrequency: '',
      startDate: '',
      endDate: '',
    },
    validationSchema: validateNewInvoice,
    onSubmit: ({
      clientId,
      dueDate,
      payment,
      recurringFrequency,
      startDate,
      endDate,
    }) => {
      mutate(
        {
          clientId,
          dueDate,
          payment,
          products: data,
          recurringFrequency,
          startDate,
          endDate,
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
        <div className="flex gap-4">
          <div className="w-1/2 space-y-4">
            {/* Client */}
            <div>
              <div className="mb-2 font-semibold flex items-start">
                Client <Asterisk className="text-red-500 w-4 h-4" />
              </div>
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
                <div className="text-xs text-red-500">
                  {formik.errors.clientId}
                </div>
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
              {formik.touched.dueDate && formik.errors.dueDate ? (
                <div className="text-xs text-red-500">
                  {formik.errors.dueDate}
                </div>
              ) : null}
            </div>

            {/* payment description */}
            <div>
              <div className="mb-2 font-semibold flex items-center">
                Payment Description{' '}
                <Asterisk className="text-red-500 w-4 h-4" />
              </div>
              <Input
                name="payment"
                type="text"
                className="border-slate-500 w-full"
                {...formik.getFieldProps('payment')}
              />
              {formik.touched.payment && formik.errors.payment ? (
                <div className="text-xs text-red-500">
                  {formik.errors.payment}
                </div>
              ) : null}
            </div>
          </div>

          {/* recurring sectio */}
          <div className="w-1/2 space-y-4">
            {/* recurring type */}
            <div>
              <div className="mb-2 font-semibold">Recurring Frequency</div>
              <Select
                onValueChange={(value) => {
                  formik.setFieldValue('recurringFrequency', value);
                }}
              >
                <SelectTrigger className="w-1/2 border-slate-300 border-2">
                  <SelectValue placeholder="Choose a Frequency" />
                </SelectTrigger>
                <SelectContent className="max-h-[400px]">
                  <SelectItem value={`DAILY`}>Daily</SelectItem>
                  <SelectItem value={`WEEKLY`}>Weekly</SelectItem>
                  <SelectItem value={`MONTHLY`}>Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              {/* recurring start */}
              <div>
                <div className="mb-2 font-semibold">Recurring Start</div>
                <div className="flex items-center gap-2">
                  <DatePicker
                    showTimeSelect
                    timeInputLabel="Time:"
                    dateFormat={'yyyy/MM/dd h:mm aa'}
                    onChange={(date) => {
                      formik.setFieldValue('startDate', date);
                    }}
                    selected={formik.getFieldProps('startDate').value}
                    className="border-2 rounded-md border-slate-300 w-[200px] h-[40px]"
                  />
                  <CalendarDays className="opacity-50" />
                </div>
              </div>
              {/* recurring end */}
              <div>
                <div className="mb-2 font-semibold">Recurring End</div>
                <div className="flex items-center gap-2">
                  <DatePicker
                    showTimeSelect
                    timeInputLabel="Time:"
                    dateFormat={'yyyy/MM/dd h:mm aa'}
                    onChange={(date) => {
                      formik.setFieldValue('endDate', date);
                    }}
                    selected={formik.getFieldProps('endDate').value}
                    className="border-2 rounded-md border-slate-300 w-[200px] h-[40px]"
                  />
                  <CalendarDays className="opacity-50" />
                </div>
              </div>
            </div>
          </div>
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
        <div className="w-full flex justify-end">
          <Button className="" disabled={isPending} type="submit">
            Submit !
          </Button>
        </div>
      </div>
    </form>
  );
}
