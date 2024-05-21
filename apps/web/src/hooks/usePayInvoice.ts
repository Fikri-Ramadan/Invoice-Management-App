import { useMutation } from "@tanstack/react-query";
import useSession from "./useSession";
import axios from "axios";

export default function usePayInvoice() {
  const { session } = useSession();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({ invoiceId }: { invoiceId: string; }) => {
      if (!session?.token) return null;
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/invoices/pay`, {
        invoiceId
      }, {
        headers: {
          Authorization: `Bearer ${session?.token}`
        }
      });
      return await res.data;
    }
  });

  return {
    mutate,
    isPending,
    isError
  };
}