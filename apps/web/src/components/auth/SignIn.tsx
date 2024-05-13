'use client';

import { validateLogin } from '@/lib/validation';
import { useFormik } from 'formik';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import useSignIn from '@/hooks/useSignIn';
import { useRouter } from 'next/navigation';
import useSession from '@/hooks/useSession';
import LoadingComp from '../LoadingComp';

export default function SignIn() {
  const { toast } = useToast();
  const { mutate, isPending, isError } = useSignIn();
  const {setSessionCookie, session, isLoading} = useSession();
  const router = useRouter()

  const formik: any = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validateLogin,
    onSubmit: ({ email, password }) => {
      mutate(
        { email, password },
        {
          onSuccess: (data) => {
            if (data.success == false) {
              toast({
                variant: 'destructive',
                title: 'Sign In Failed !',
                description: data?.message,
              });
              return
            } 
            toast({
              variant: 'success',
              title: 'Sign In Successfully !',
              description: 'Redirect to Dashboard',
            });
            setSessionCookie({
              id: data?.results?.id,
              email: data?.results?.email,
              token: data?.results?.token,
            });
            router.push('/dashboard');
            router.refresh();
          },
          onError: (res: any) => {
            toast({
              variant: 'destructive',
              title: 'Sign In Failed !',
              description: res?.response?.data?.message,
            });
          },
        },
      );
    },
  });

  if (isLoading) {
    return <LoadingComp />;
  }

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
          <Button className="w-full" disabled={isPending}>
            Submit !
          </Button>
        </div>
      </form>
    </div>
  );
}
