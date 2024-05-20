import { useQuery } from "@tanstack/react-query";
import useSession from "./useSession";
import axios from "axios";

export default function useInvoiceById({ id }: { id: string; }) {
  const { session } = useSession();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [`/${session?.token}/invoice/${id}`],
    queryFn: async () => {
      if (!session?.token) return null;
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/invoices/${id}`, {
        headers: {
          Authorization: `Bearer ${session?.token}`
        }
      });
      return await res.data;
    }
  });

  return {
    data,
    isLoading,
    isError,
    refetch
  };
}