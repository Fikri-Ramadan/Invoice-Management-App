'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import useSendEmailClient from '@/hooks/useSendEmailClient';
import { Send } from 'lucide-react';

type Props = {
  invoiceId: string;
  refetch: any;
};

export default function SendEmailDialog({ invoiceId, refetch }: Props) {
  const { mutate, isPending } = useSendEmailClient();
  const { toast } = useToast();

  const handleSend = () => {
    mutate(
      { invoiceId },
      {
        onSuccess: () => {
          toast({
            variant: 'success',
            title: 'Email sended !',
          });
          refetch();
        },
        onError: (res: any) => {
          toast({
            variant: 'destructive',
            title: 'Failed to send email !',
            description: res?.response?.data?.message,
          });
        },
      },
    );
  };

  return (
    <Dialog>
      <DialogTrigger className="text-yellow-500 flex items-center justify-center">
        <Send className="w-4 h-4" />
      </DialogTrigger>
      <DialogContent className="w-[250px]">
        <DialogHeader>
          <DialogTitle>Send Email to Client !</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                handleSend();
              }}
              disabled={isPending}
            >
              Yes !
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
