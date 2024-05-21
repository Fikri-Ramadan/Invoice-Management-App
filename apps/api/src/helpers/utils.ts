import path from 'path';
import fs from 'fs';
import { EmailData, sendEmail } from "./nodemailer";
import Handlebars from "handlebars";
import prisma from '@/prisma';

export const addOneDayToDate = (date: Date) => {
  date.setDate(date.getDate() + 1);
  return date;
};

export const sendingEmail = async (newInv: any) => {
  const products = newInv?.invoiceDetails?.map((details: any) => {
    return {
      BASE_IMAGE_URL: process.env.BASE_IMAGE_URL + '/' + details?.product?.picture,
      productName: details?.product?.name,
      quantity: details?.quantity,
      price: 'Rp. ' + details?.price,
      subTotal: 'Rp. ' + details?.subTotal,
      productDesc: details?.product?.description
    };
  });

  const total = 'Rp. ' + newInv?.invoiceDetails?.reduce((acc: number, curr: any) => acc + curr?.subTotal, 0);

  const data = {
    companyName: newInv?.user?.companyName,
    companyEmail: newInv?.user?.email,
    clientName: newInv?.client?.name,
    status: newInv?.status,
    isPending: newInv?.status == 'PENDING',
    isPaid: newInv?.status == 'PAID',
    PAID_DATE: new Date(newInv?.paidDate || '').toLocaleString('en-US'),
    DUE_DATE: new Date(newInv?.dueDate || '').toLocaleString('en-US'),
    payment: newInv?.payment,
    BASE_URL: process.env.BASE_URL,
    products: products,
    total: total,
  };

  const templateEmail = path.join(
    __dirname,
    '../templates',
    'invoice.hbs',
  );

  const templateSource = fs.readFileSync(templateEmail, 'utf8');
  const compileTemplate = Handlebars.compile(templateSource);

  const emailData: EmailData = {
    from: 'Invoice Management App',
    to: [newInv?.client?.email],
    subject: `Invoice ${newInv?.invoiceNumber}`,
    html: compileTemplate({ ...data }),
  };

  sendEmail(emailData);

  await prisma.invoice.update({
    where: { id: newInv?.id },
    data: {
      emailSent: new Date(),
    }
  });
};