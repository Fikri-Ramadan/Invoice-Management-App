import { useMutation } from "@tanstack/react-query";
import useSession from "./useSession";
import axios from "axios";

type Props = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export default function useEditProduct() {
  const { session } = useSession();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({ id, name, price, description }: Props) => {
      if (!session?.token) return null;
      const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_API_URL}/products/${id}`, {
        name, price, description
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