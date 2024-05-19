import { useMutation } from "@tanstack/react-query";
import useSession from "./useSession";
import axios from "axios";

type Props = {
  clientId: string;
  dueDate: string;
  payment: string;
  productId: string;
  quantity: number;
  price: number;
  subTotal: number;
};

export default function useAddInvoice() {
  const { session } = useSession();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({ clientId, dueDate, payment, productId, quantity, price, subTotal }: Props) => {
      if (!session?.token) return null;
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/invoices`, {
        clientId, dueDate, payment, productId, quantity, price, subTotal
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