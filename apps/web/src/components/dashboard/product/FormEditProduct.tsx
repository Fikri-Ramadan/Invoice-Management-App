import EditImage from '@/components/EditImage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import useEditProduct from '@/hooks/useEditProduct';
import useProductById from '@/hooks/useProductById';
import { validateNewProduct } from '@/lib/validation';
import { useFormik } from 'formik';
import { Asterisk } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function FormEditProduct({ id }: { id: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const { data, isLoading, isError } = useProductById({ id });
  const { mutate, isPending } = useEditProduct();
  const [file, setFile] = useState<File>();
  const [imageTouched, setImageTouched] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const formik: any = useFormik({
    initialValues: {
      name: '',
      price: 0,
      description: '',
    },
    validationSchema: validateNewProduct,
    onSubmit: async ({ name, price, description }) => {
      if (imageTouched && !file) {
        toast({
          variant: 'destructive',
          title: 'Image is required !',
          description: 'Must add image',
        });
        return;
      }
      if (imageTouched && file) {
        // do api call for edit image
      }
      mutate(
        {
          id,
          name,
          price,
          description,
        },
        {
          onSuccess: () => {
            toast({
              variant: 'success',
              title: 'Product updated successfully !',
            });
            router.push('/dashboard/products');
          },
          onError: (res: any) => {
            toast({
              variant: 'destructive',
              title: 'Failed to update product !',
              description: res?.response?.data?.message,
            });
          },
        },
      );
    },
  });

  useEffect(() => {
    if (!isLoading && data?.results) {
      formik.setFieldValue('name', data?.results?.name);
      formik.setFieldValue('price', data?.results?.price);
      formik.setFieldValue('description', data?.results?.description);
      setImageUrl(data?.results?.picture);
    }
  }, [data, isLoading]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="space-y-4">
        {/* image */}
        <div>
          <div className="mb-2 font-semibold">Image</div>
          <div className="flex gap-2">
            <EditImage
              id="image-1"
              file={file}
              setFile={setFile}
              imageUrl={
                data?.results &&
                `${process.env.NEXT_PUBLIC_IMAGE_URL}/${imageUrl}`
              }
              setImageTouched={setImageTouched}
            />
          </div>
        </div>

        {/* name */}
        <div>
          <div className="mb-2 font-semibold flex items-start">
            Name <Asterisk className="text-red-500 w-4 h-4" />
          </div>
          <Input
            name="name"
            type="text"
            className="border-slate-300 w-1/2"
            {...formik.getFieldProps('name')}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-xs text-red-500">{formik.errors.name}</div>
          ) : null}
        </div>

        {/* price */}
        <div>
          <div className="mb-2 font-semibold flex items-start">
            Price <Asterisk className="text-red-500 w-4 h-4" />
          </div>
          <Input
            name="price"
            type="number"
            className="border-slate-300 w-1/2"
            {...formik.getFieldProps('price')}
          />
          {formik.touched.price && formik.errors.price ? (
            <div className="text-xs text-red-500">{formik.errors.price}</div>
          ) : null}
        </div>

        {/* description */}
        <div>
          <div className="mb-2 font-semibold flex items-start">
            Description <Asterisk className="text-red-500 w-4 h-4" />
          </div>
          <Textarea
            name="description"
            className="border-slate-300 w-1/2"
            {...formik.getFieldProps('description')}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-xs text-red-500">
              {formik.errors.description}
            </div>
          ) : null}
        </div>
        <Button disabled={isPending}>Submit !</Button>
      </div>
    </form>
  );
}
