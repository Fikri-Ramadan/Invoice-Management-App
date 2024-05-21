import SignIn from '@/components/auth/SignIn';
import Image from 'next/image';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="w-full h-screen bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-center h-[600px] pb-32 pt-16 px-12 bg-white">
        <div className="hidden lg:block relative w-1/3">
          <p className="text-4xl font-bold tracking-wide mb-2">Sign in</p>
          <p className="text-4xl font-bold tracking-wide">To Invoice App</p>
          <p className="text-sm font-medium mt-8">
          if you don&apos;t have an account
        </p>
        <p className="text-sm font-medium">
          you can{' '}
          <Link href="/auth/signup" className="text-blue-700 font-semibold">
            register here !
          </Link>
        </p>
          <div className="-z-50 absolute -top-32 w-[400px] h-[400px] p-8 bg-slate-50 rounded-full"></div>
        </div>
        <div className="hidden w-1/3 h-full lg:flex justify-start items-end">
          <Image src="/undraw_login.svg" width={300} height={300} alt="" />
        </div>
        <div className="w-full lg:w-1/3 h-full flex flex-col justify-start lg:justify-center">
          <p className="lg:hidden text-2xl font-bold mb-8">Login</p>
          <SignIn />
        </div>
      </div>
    </div>
  );
}
