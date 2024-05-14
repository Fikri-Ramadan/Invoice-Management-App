import { useMutation } from '@tanstack/react-query';
import useSession from './useSession';
import axios from 'axios';

type Props = {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  paymentPreference: string;
};

export default function useEditClient() {
  const { session } = useSession();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({
      id,
      name,
      email,
      address,
      phone,
      paymentPreference,
    }: Props) => {
      if (!session?.token) return null;
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/clients/${id}`,
        {
          name,
          email,
          address,
          phone,
          paymentPreference,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        },
      );
      return await res.data;
    },
  });

  return {
    mutate,
    isPending,
    isError,
  };
}
