'use client';

import { validateRegister } from '@/lib/validation';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useFormik } from 'formik';
import { useToast } from '../ui/use-toast';
import useSignUp from '@/hooks/useSignUp';

export default function SignUp() {
  const { toast } = useToast();
  const { mutate, isPending, isError } = useSignUp();

  const formik: any = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validateRegister,
    onSubmit: ({ email, password, confirmPassword }, { resetForm }) => {
      if (password !== confirmPassword) {
        toast({
          variant: 'destructive',
          title: 'Password is not equals !',
          description: 'Password and Confirm Password must be equals.',
        });
        return;
      }
      mutate(
        { email, password },
        {
          onSuccess: () => {
            toast({
              variant: 'success',
              title: 'Sign Up Successfully !',
              description: 'Please check your email for verification !',
            });
            resetForm();
          },
          onError: (res: any) => {
            toast({
              variant: 'destructive',
              title: 'Sign Up Failed !',
              description: res?.response?.data?.message,
            });
          },
        },
      );
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-4">
          {/* email */}
          <div>
            <div className="">Email</div>
            <Input
              name="email"
              type="email"
              className="border-slate-300"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-xs text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>
          {/* password */}
          <div>
            <div className="">Password</div>
            <Input
              name="password"
              type="password"
              className="border-slate-300"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-xs text-red-500">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          {/* confirm password */}
          <div>
            <div className="">Confirm Password</div>
            <Input
              name="confirmPassword"
              type="password"
              className="border-slate-300"
              {...formik.getFieldProps('confirmPassword')}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-xs text-red-500">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>
          <Button className="w-full" disabled={isPending}>
            Submit !
          </Button>
        </div>
      </form>
    </div>
  );
}
