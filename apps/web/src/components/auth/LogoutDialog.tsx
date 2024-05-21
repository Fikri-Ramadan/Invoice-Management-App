'use client';

import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button, buttonVariants } from '../ui/button';
import { useRouter } from 'next/navigation';
import useSession from '@/hooks/useSession';

export default function LogoutDialog() {
  const router = useRouter();
  const { removeSessionCookie } = useSession();

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants({ variant: 'link' }),
          'w-full mt-4 flex items-center gap-2',
        )}
      >
        Logout
      </DialogTrigger>
      <DialogContent className="w-[300px]">
        <DialogHeader>
          <DialogTitle>Logout !</DialogTitle>
          <DialogDescription>
            Will be redirect to sign in page
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                removeSessionCookie();
                router.push('/auth/signin');
              }}
            >
              Yes !
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
