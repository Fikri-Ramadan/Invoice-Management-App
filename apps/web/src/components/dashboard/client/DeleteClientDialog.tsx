'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import useDeleteClient from '@/hooks/useDeleteClient';
import { Trash2 } from 'lucide-react';

type Props = {
  id: string;
  name: string;
  refetch: any;
};

export default function DeleteClientDialog({ id, name, refetch }: Props) {
  const { mutate, isPending } = useDeleteClient();
  const { toast } = useToast();

  const handleDelete = () => {
    mutate(
      { id },
      {
        onSuccess: () => {
          toast({
            variant: 'success',
            title: 'Client deleted !',
          });
          refetch();
        },
        onError: (res: any) => {
          toast({
            variant: 'destructive',
            title: 'Client Failed to delete !',
            description: res?.response?.data?.message,
          });
        },
      },
    );
  };

  return (
    <Dialog>
      <DialogTrigger className="text-red-500 flex items-center justify-center">
        <Trash2 className="w-4 h-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Client</DialogTitle>
          <DialogDescription>Client &quot;{name}&quot;, will be deleted !</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                handleDelete();
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
