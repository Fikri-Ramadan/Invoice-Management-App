import { useMutation } from "@tanstack/react-query";
import useSession from "./useSession";
import axios from "axios";

type Props = {
  firstname: string;
  lastname: string;
  phone: string;
  norek: string;
  companyName: string;
  bio: string;
};

export default function useEditProfile() {
  const { session } = useSession();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({ firstname, lastname, phone, norek, companyName, bio }: Props) => {
      if (!session?.token) return null;
      const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_API_URL}/profile`, {
        firstname, lastname, phone, norek, companyName, bio
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