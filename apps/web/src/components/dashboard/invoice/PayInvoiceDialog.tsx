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
import usePayInvoice from '@/hooks/usePayInvoice';
import useSendEmailClient from '@/hooks/useSendEmailClient';
import { DialogDescription } from '@radix-ui/react-dialog';
import { CircleCheckBig, Send } from 'lucide-react';

type Props = {
  invoiceId: string;
  refetch: any;
};
export default function PayInvoiceDialog({ invoiceId, refetch }: Props) {
  const { mutate, isPending } = usePayInvoice();
  const { mutate: sendEmail, isPending: emailPending } = useSendEmailClient();
  const { toast } = useToast();

  const handleSend = () => {
    mutate(
      { invoiceId },
      {
        onSuccess: () => {
          sendEmail({ invoiceId });
          toast({
            variant: 'success',
            title: 'Invoice Paid !',
          });
          refetch();
        },
        onError: (res: any) => {
          toast({
            variant: 'destructive',
            title: 'Failed to pay invoice !',
            description: res?.response?.data?.message,
          });
        },
      },
    );
  };

  return (
    <Dialog>
      <DialogTrigger className="text-green-500 flex items-center justify-center">
        <CircleCheckBig className="w-4 h-4" />
      </DialogTrigger>
      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle>Pay invoice !</DialogTitle>
          <DialogDescription>
            Invoice status will be change to PAID, and send email to client
          </DialogDescription>
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
