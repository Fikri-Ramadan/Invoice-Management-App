'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import useClientById from '@/hooks/useClientById';
import useEditClient from '@/hooks/useEditClient';
import { validateAddClient } from '@/lib/validation';
import { useFormik } from 'formik';
import { Asterisk } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function FormEditClient({ id }: { id: string }) {
  const { data, isLoading, isError } = useClientById({ id });
  const { mutate, isPending } = useEditClient();
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
          id,
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
              title: 'Client updated successfully !',
            });
            router.push('/dashboard/clients');
          },
          onError: (res: any) => {
            toast({
              variant: 'destructive',
              title: 'Failed to update client !',
              description: res?.response?.data?.message,
            });
          },
        },
      );
    },
  });

  useEffect(() => {
    if (!isLoading && data?.results) {
      formik.setFieldValue('name', data?.results?.name);
      formik.setFieldValue('email', data?.results?.email);
      formik.setFieldValue(
        'paymentPreference',
        data?.results?.paymentPreference,
      );
      formik.setFieldValue('address', data?.results?.address);
      formik.setFieldValue('phone', data?.results?.phone);
    }
  }, [data, isLoading]);

  if (isLoading) return <div>Loading...</div>;

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
          <Input
            name="paymentPreference"
            type="text"
            className="border-slate-300 w-1/2"
            {...formik.getFieldProps('paymentPreference')}
          />
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
