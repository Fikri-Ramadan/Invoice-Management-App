import { useMutation } from "@tanstack/react-query";
import useSession from "./useSession";
import axios from "axios";

type Props = {
  file: File | any;
  name: string;
  price: number;
  description: string;
};

export default function useAddProduct() {
  const { session } = useSession();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({ file, name, price, description }: Props) => {
      if (!session?.token) return null;
      const formData = new FormData();

      formData.append('name', name);
      formData.append('price', String(price));
      formData.append('description', description);
      formData.append('file', file);

      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${session?.token}`,
        },
      };

      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/products`,
        formData,
        config
      );

      return await res.data;
    }
  });

  return {
    mutate,
    isPending,
    isError
  };
}