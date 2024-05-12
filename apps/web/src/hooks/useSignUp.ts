import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  email: string;
  password: string;
};

export default function useSignUp() {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({ email, password }: Props) => {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/register`, {
        email, password
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