import { useQuery } from "@tanstack/react-query";
import useSession from "./useSession";
import axios from "axios";

type Props = {
  page: string;
  search?: string;
};

export default function useMyClients({ page, search }: Props) {
  const { session } = useSession();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [`/myclients-${session?.token}?page=${page}&search=${search}`],
    queryFn: async () => {
      if (!session?.token) return null;
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/clients?page=${page}&search=${search}`, {
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