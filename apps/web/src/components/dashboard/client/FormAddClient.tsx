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
import useAddClient from '@/hooks/useAddClient';
import { validateAddClient } from '@/lib/validation';
import { useFormik } from 'formik';
import { Asterisk } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FormAddClient() {
  const { mutate, isPending } = useAddClient();
  const router = useRouter();
  const { toast } = useToast();

  const formik: any = useFormik({
    initialValues: {
      name: '',
      email: '',
      paymentPreference: '',
      address: '',
      phone: '',
    },
    validationSchema: validateAddClient,
    onSubmit: ({ name, email, paymentPreference, address, phone }) => {
      mutate(
        {
          name,
          email,
          paymentPreference,
          address,
          phone,
        },
        {
          onSuccess: () => {
            toast({
              variant: 'success',
              title: 'Client created successfully !',
            });
            router.push('/dashboard/clients');
          },
          onError: (res: any) => {
            toast({
              variant: 'destructive',
              title: 'Failed to create client !',
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
        {/* name */}
        <div>
          <div className="mb-2 font-semibold flex items-start">
            Name <Asterisk className="text-red-500 w-4 h-4" />
          </div>
          <Input
            name="name"
            type="text"
            className="border-slate-300 w-1/2"
            {...formik.getFieldProps('name')}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-xs text-red-500">{formik.errors.name}</div>
          ) : null}
        </div>

        {/* email */}
        <div>
          <div className="mb-2 font-semibold flex items-start">
            Email <Asterisk className="text-red-500 w-4 h-4" />
          </div>
          <Input
            name="email"
            type="email"
            className="border-slate-300 w-1/2"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-xs text-red-500">{formik.errors.email}</div>
          ) : null}
        </div>

        {/* payment preference */}
        <div>
          <div className="mt-8 mb-4 text-xl font-semibold">
            Additional Information
          </div>
          <div className="mb-2 font-semibold">Payment Preference</div>
          <Select
          onValueChange={(value) => {
            formik.setFieldValue('paymentPreference', value);
          }}>
            <SelectTrigger className="w-1/2">
              <SelectValue placeholder="payment preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="debit">Debit</SelectItem>
              <SelectItem value="transfer">Transfer</SelectItem>
            </SelectContent>
          </Select>
          {formik.touched.paymentPreference &&
          formik.errors.paymentPreference ? (
            <div className="text-xs text-red-500">
              {formik.errors.paymentPreference}
            </div>
          ) : null}
        </div>

        {/* address */}
        <div>
          <div className="mb-2 font-semibold">Address</div>
          <Input
            name="address"
            type="text"
            className="border-slate-300 w-1/2"
            {...formik.getFieldProps('address')}
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="text-xs text-red-500">{formik.errors.address}</div>
          ) : null}
        </div>

        {/* phone */}
        <div>
          <div className="mb-2 font-semibold">Phone Number</div>
          <Input
            name="phone"
            type="text"
            className="border-slate-300 w-1/2"
            {...formik.getFieldProps('phone')}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-xs text-red-500">{formik.errors.phone}</div>
          ) : null}
        </div>
        <Button disabled={isPending}>Submit !</Button>
      </div>
    </form>
  );
}
