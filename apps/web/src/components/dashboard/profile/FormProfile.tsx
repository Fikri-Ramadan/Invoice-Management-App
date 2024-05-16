'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import useEditProfile from '@/hooks/useEditProfile';
import useMyProfile from '@/hooks/useMyProfile';
import { validateProfile } from '@/lib/validation';
import { useFormik } from 'formik';
import { useEffect } from 'react';

export default function FormProfile() {
  const { toast } = useToast();
  const { data, isLoading, refetch } = useMyProfile();
  const { mutate, isPending, isError } = useEditProfile();

  const formik: any = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      phone: '',
      norek: '',
      companyName: '',
      bio: '',
    },
    validationSchema: validateProfile,
    onSubmit: (
      { firstname, lastname, phone, norek, companyName, bio },
      { resetForm },
    ) => {
      mutate(
        { firstname, lastname, phone, norek, companyName, bio },
        {
          onSuccess: () => {
            toast({
              variant: 'success',
              title: 'Profile update Successfully !',
            });
            refetch();
          },
          onError: (res: any) => {
            toast({
              variant: 'destructive',
              title: 'Profile update Failed !',
              description: res?.response?.data?.message,
            });
          },
        },
      );
    },
  });

  useEffect(() => {
    if (!isLoading && data?.results) {
      formik.setFieldValue('email', data?.results?.email);
      formik.setFieldValue('firstname', data?.results?.firstname);
      formik.setFieldValue('lastname', data?.results?.lastname);
      formik.setFieldValue('phone', data?.results?.phone);
      formik.setFieldValue('norek', data?.results?.norek);
      formik.setFieldValue('companyName', data?.results?.companyName);
      formik.setFieldValue('bio', data?.results?.bio);
    }
  }, [data, isLoading]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-4">
          {/* email */}
          <div className="">
            <div className="font-medium">email</div>
            <Input
              name="email"
              type="email"
              className="border-slate-300"
              disabled
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-xs text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            {/* firstname */}
            <div className="w-1/2">
              <div className="font-medium">firstname</div>
              <Input
                name="firstname"
                type="text"
                className="border-slate-300"
                {...formik.getFieldProps('firstname')}
              />
              {formik.touched.firstname && formik.errors.firstname ? (
                <div className="text-xs text-red-500">
                  {formik.errors.firstname}
                </div>
              ) : null}
            </div>
            {/* lastname */}
            <div className="w-1/2">
              <div className="font-medium">lastname</div>
              <Input
                name="lastname"
                type="text"
                className="border-slate-300"
                {...formik.getFieldProps('lastname')}
              />
              {formik.touched.lastname && formik.errors.lastname ? (
                <div className="text-xs text-red-500">
                  {formik.errors.lastname}
                </div>
              ) : null}
            </div>
          </div>
          {/* phone */}
          <div className="">
            <div className="font-medium">phone</div>
            <Input
              name="phone"
              type="text"
              className="border-slate-300"
              {...formik.getFieldProps('phone')}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-xs text-red-500">{formik.errors.phone}</div>
            ) : null}
          </div>
          {/* norek */}
          <div className="">
            <div className="font-medium">norek</div>
            <Input
              name="norek"
              type="text"
              className="border-slate-300"
              {...formik.getFieldProps('norek')}
            />
            {formik.touched.norek && formik.errors.norek ? (
              <div className="text-xs text-red-500">{formik.errors.norek}</div>
            ) : null}
          </div>
          {/* company name */}
          <div className="">
            <div className="font-medium">companyName</div>
            <Input
              name="companyName"
              type="text"
              className="border-slate-300"
              {...formik.getFieldProps('companyName')}
            />
            {formik.touched.companyName && formik.errors.companyName ? (
              <div className="text-xs text-red-500">
                {formik.errors.companyName}
              </div>
            ) : null}
          </div>
          {/* bio */}
          <div className="">
            <div className="font-medium">bio</div>
            <Textarea
              name="bio"
              className="border-slate-300"
              {...formik.getFieldProps('bio')}
            />
            {formik.touched.bio && formik.errors.bio ? (
              <div className="text-xs text-red-500">{formik.errors.bio}</div>
            ) : null}
          </div>
          <div className="flex justify-end">
            <Button className="" disabled={isPending}>
              Submit !
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
