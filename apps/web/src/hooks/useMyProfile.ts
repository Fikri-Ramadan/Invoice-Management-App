import { useQuery } from "@tanstack/react-query";
import useSession from "./useSession";
import axios from "axios";

export default function useMyProfile() {
  const { session } = useSession();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [`/profile-${session?.token}`],
    queryFn: async () => {
      if (!session?.token) return null;
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/profile`, {
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