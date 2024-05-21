import { useQuery } from "@tanstack/react-query";
import useSession from "./useSession";
import axios from "axios";

type Props = {
  page: string;
  search?: string;
  date: string;
  status: string;
};

export default function useMyInvoices({ page, search, date, status }: Props) {
  const { session } = useSession();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [`/myinvoices-${session?.token}?page=${page}&search=${search}&date=${date}&status=${status}`],
    queryFn: async () => {
      if (!session?.token) return null;
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/invoices?page=${page}&search=${search}&date=${date}&status=${status}`, {
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