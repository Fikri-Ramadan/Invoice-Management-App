import { useMutation } from "@tanstack/react-query";
import useSession from "./useSession";
import axios from "axios";

export default function useDeleteClient() {
  const { session } = useSession();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({ id }: { id: string; }) => {
      if (!session?.token) return null;
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_API_URL}/clients/${id}`, {
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
    isError,
  };
}