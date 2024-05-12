import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useEmailVerified({ token }: { token: string; }) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [`/verify-email/${token}`],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/verify-email?token=${token}`);
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