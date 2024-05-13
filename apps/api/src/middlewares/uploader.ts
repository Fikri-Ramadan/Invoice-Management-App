import { Request } from 'express';
import multer from 'multer';
import { join } from 'path';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FilenameCallback = (error: Error | null, filename: string) => void;

export const uploader = (filePrefix: string, folderName?: string) => {
  const defaultDir = join(__dirname, '../../public');

  const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback) => {
      const destination = folderName ? defaultDir + folderName : defaultDir;
      cb(null, destination);
    },
    filename(req: Request, file: Express.Multer.File, cb: FilenameCallback) {
      const originalNameParts = file.originalname.split('.');
      const fileExtension = originalNameParts[originalNameParts.length - 1];
      const newFilename = filePrefix + Date.now() + '.' + fileExtension;
      cb(null, newFilename);
    },
  });

  const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Hanya file PNG, JPG, JPEG, GIF yang diperbolehkan'));
    }
  };

  return multer({ storage, fileFilter, limits: { fileSize: 1024 * 1024 } });
};
