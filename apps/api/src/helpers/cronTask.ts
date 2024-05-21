import prisma from "@/prisma";
import { addOneDayToDate, sendingEmail } from "./utils";


export const dueDateChecker = async () => {
  try {
    const invoices = await prisma.invoice.updateMany({
      where: {
        status: "PENDING",
        dueDate: {
          lte: new Date()
        }
      }, data: {
        status: 'DUE_DATE'
      }
    });

    console.log(new Date().toLocaleString('en-US'));
    console.log(invoices);
  } catch (error) {
    console.log(error);
  }
};

export const recurringChecker = async () => {
  try {
    const oneDayInMilli = 86400000;
    const oneWeekInMill = oneDayInMilli * 7;
    const oneMonthInMill = oneDayInMilli * 30;

    const recurrings = await prisma.recurringInvoice.findMany({
      where: {
        startDate: { lte: new Date() },
        endDate: { gte: new Date() }
      },
      include: { invoice: { include: { invoiceDetails: true } } }
    });

    recurrings?.forEach(async (recurring) => {
      const invoiceNumber = `INV_${Date.now()}_${recurring?.invoice?.clientId}`;
      let newInv;

      if ((recurring?.paymentFrequency == 'DAILY' &&
        new Date().getTime() - recurring?.lastCreated.getTime() >= oneDayInMilli) ||
        (recurring?.paymentFrequency == 'WEEKLY' &&
          new Date().getTime() - recurring?.lastCreated.getTime() >= oneWeekInMill) ||
        (recurring?.paymentFrequency == 'MONTHLY' &&
          new Date().getTime() - recurring?.lastCreated.getTime() >= oneMonthInMill)
      ) {
        const invDetails = recurring?.invoice?.invoiceDetails?.map((detail) => {
          return {
            productId: detail?.productId,
            price: detail?.price,
            quantity: detail?.quantity,
            subTotal: detail?.subTotal
          };
        });

        // create new invoice
        newInv = await prisma.invoice.create({
          data: {
            invoiceNumber: invoiceNumber,
            dueDate: addOneDayToDate(new Date),
            payment: recurring?.invoice?.payment,
            clientId: recurring?.invoice?.clientId,
            userId: recurring?.invoice?.userId,
            invoiceDetails: {
              createMany: {
                data: invDetails
              }
            }
          },
          include: {
            user: true,
            client: true,
            invoiceDetails: { include: { product: true } },
          }
        });

        // update last created recurring
        await prisma.recurringInvoice.update({
          where: { id: recurring?.id },
          data: { lastCreated: new Date() }
        });
      }

      if (newInv) {
        sendingEmail(newInv);
      }
    });

    console.log(new Date().toLocaleString('en-US'));
  } catch (error) {
    console.log(error);
  }
};