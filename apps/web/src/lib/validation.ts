import * as Yup from 'yup';

export const validateLogin = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

export const validateRegister = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required'),
});

export const validateAddClient = Yup.object({
  name: Yup.string().required('name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  address: Yup.string(),
  phone: Yup.string(),
  paymentPreference: Yup.string(),
});

export const validateNewProduct = Yup.object({
  name: Yup.string()
    .max(30, 'Must be 30 letters or less')
    .required('Product name is required'),
  price: Yup.number().required('Price is required'),
  description: Yup.string().required('Description is required'),
});

export const imageSchema = Yup.mixed()
  .required('File gambar harus diunggah')
  .test(
    'fileType',
    'Jenis file harus dalam jpeg, jpg atau png',
    (value: any) => {
      if (!value) return true;
      const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
      return supportedFormats.includes(value.type);
    },
  )
  .test('fileSize', 'Ukuran file tidak boleh lebih dari 1MB', (value: any) => {
    if (!value) return true;
    return value.size <= 1024 * 1024;
  });

export const validateProfile = Yup.object({
  firstname: Yup.string(),
  lastname: Yup.string(),
  phone: Yup.string(),
  norek: Yup.string(),
  companyName: Yup.string(),
  bio: Yup.string(),
});

export const validateNewInvoice = Yup.object({
  clientId: Yup.string().required('Client is required'),
  dueDate: Yup.string().required('Due Date is required'),
  payment: Yup.string().required('Payment is required')
})