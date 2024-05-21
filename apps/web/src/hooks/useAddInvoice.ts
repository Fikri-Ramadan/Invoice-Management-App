import { useMutation } from "@tanstack/react-query";
import useSession from "./useSession";
import axios from "axios";

type Props = {
  clientId: string;
  dueDate: string;
  payment: string;
  products: { id: string; name: string; price: number; quantity: number; }[];
  recurringFrequency?: string;
  startDate?: string;
  endDate?: string;
};

export default function useAddInvoice() {
  const { session } = useSession();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({ clientId, dueDate, payment, products, recurringFrequency, startDate, endDate }: Props) => {
      if (!session?.token) return null;
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/invoices`, {
        clientId, dueDate, payment,
        recurring: recurringFrequency ? true : false,
        paymentFrequency: recurringFrequency,
        startDate, endDate
      }, {
        headers: {
          Authorization: `Bearer ${session?.token}`
        }
      });

      const results = await res?.data?.results;
      const invoiceId = results?.id;

      products?.map(async (product: any) => {
        await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/invoice/${invoiceId}`, {
          productId: Number(product?.id),
          quantity: Number(product?.quantity),
          price: Number(product?.price),
          subTotal: Number(product?.quantity) * Number(product?.price)
        }, {
          headers: {
            Authorization: `Bearer ${session?.token}`
          }
        });
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