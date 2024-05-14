'use client';

import { ImagePlus, X } from 'lucide-react';
import { useState } from 'react';
import { imageSchema } from '@/lib/validation';
import { Input } from './ui/input';

type Props = {
  id: string;
  file: File | any;
  setFile: React.Dispatch<React.SetStateAction<File>> | any;
  setRemovedFiles?: React.Dispatch<React.SetStateAction<number>>;
  imageUrl?: string;
};

export default function Uploader({
  id,
  file: fs,
  setFile,
  imageUrl = '',
}: Props) {
  const [image, setImage] = useState(imageUrl);
  const [fileName, setFileName] = useState(imageUrl ? '' : 'No selected file');
  const [error, setError] = useState('');

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[100px] h-[100px]">
        <X
          className="absolute right-0 top-0 text-cyan-200 z-10 cursor-pointer"
          onClick={() => {
            const file: any = document.getElementById(id);
            setImage('');
            setFileName('No selected file');
            setError('');
            setFile(null);
            file.value = '';
          }}
        />
        <div
          className="flex items-center justify-center w-[100px] h-[100px] border-dashed border-blue-200 border-2 rounded-md cursor-pointer"
          onClick={() => document.getElementById(id)?.click()}
        >
          <Input
            type="file"
            accept="image/*"
            id={id}
            className="hidden"
            onChange={async ({ target: { files } }) => {
              try {
                if (files) {
                  await imageSchema.validate(files[0]);
                  files && files[0] && setFileName(files[0]?.name);
                  setImage(URL.createObjectURL(files[0]));
                  setFile(() => files[0]);
                }
              } catch (error: any) {
                setError(error.message);
              }
            }}
          />
          {image ? (
            <img src={image} width={100} height={100} alt="" />
          ) : (
            <ImagePlus className="text-cyan-200" />
          )}
        </div>
      </div>
      <section>
        {error && <div className="text-xs text-red-500">{error}</div>}
        {!!!error && <span className="text-slate-800 text-xs">{fileName}</span>}
      </section>
    </div>
  );
}
