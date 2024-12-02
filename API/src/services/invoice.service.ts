import { Sequelize } from "sequelize";
import db from "../models"; // Adjust the import based on your file structure
import { createInvoiceDto } from "../dtos/create-invoice.dto"; // Adjust based on your DTO path

class InvoiceService {

    static async addInvoice(invoiceData: createInvoiceDto) {


        console.log(invoiceData)
        const transaction = await db.sequelize.transaction();
      
        try {
          // Validate client field
          if (!invoiceData.client) {
            throw new Error("Client data is missing in the request.");
          }
      
          const clientData = invoiceData.client;
      
          // Ensure client email exists
          if (!clientData.email) {
            throw new Error("Client email is missing in the data.");
          }
      
          // Check if the client exists in the database
          let client = await db.Client.findOne({
            where: { email: clientData.email },
            transaction,
          });
      
          // If client does not exist, create it
          if (!client) {
            client = await db.Client.create(
              {
                name: clientData.name,
                email: clientData.email,
                phone: clientData.phone,
                address: clientData.address,
                userId: 1,
              },
              { transaction }
            );
          }
      
          // Create the invoice
          const invoice = await db.Invoice.create(
            {
              invoiceNo: invoiceData.invoiceNo,
              issueDate: invoiceData.issueDate,
              dueDate: invoiceData.dueDate,
              notes: invoiceData.notes,
              signatureImage: invoiceData.signatureImage,
              signatureDate: invoiceData.signatureDate,
              termsAndConditions: invoiceData.termsAndConditions,
              userId: 1,
              companyName: invoiceData.companyName,
              companyEmail: invoiceData.companyEmail,
              companyPhone: invoiceData.companyPhone,
              companyAddress: invoiceData.companyAddress,
              companyLogo: invoiceData.companyLogo,
              templateId: 1,
              status: invoiceData.status,
              clientId: client.id,
              subtotal: invoiceData.subtotal,
              taxRate: invoiceData.taxRate,
              currency: invoiceData.currency,
              tax: invoiceData.tax,
              total: invoiceData.total,
            },
            { transaction }
          );
      
          // Add invoice items
          await Promise.all(
            invoiceData.items.map((item) =>
              db.InvoiceItem.create(
                {
                  description: item.description,
                  price: item.price,
                  quantity: item.quantity,
                  invoiceId: invoice.id,
                },
                { transaction }
              )
            )
          );
      
          // Commit transaction
          await transaction.commit();
          return invoice;
        } catch (error: any) {
          if (transaction) await transaction.rollback();
          throw new Error(`Error saving invoice: ${error.message}`);
        }
    

      }

    static async getUserInvoices(userId: number) {
        try {
            const invoices = await db.Invoice.findAll({
                where: { userId: userId },
                attributes: [
                    'id',
                    'invoiceNo',
                    'companyName',
                    'companyEmail',
                    'companyPhone',
                    'companyAddress',
                    'issueDate',
                    'dueDate',
                    'notes',
                    'termsAndConditions',
                    'userId',
                    'clientId',
                    'templateId',
                    'subtotal',
                    'taxRate',
                    'currency',
                    'status',
                    'tax',
                    'total',
                    'createdAt',
                    'updatedAt'
                ],
                include: [
                    {
                        model: db.Client,
                        as: 'client',
                        attributes: ['name', 'email', 'phone', 'address']
                    },
                    {
                        model: db.InvoiceItem,
                        as: 'invoiceItems',
                        attributes: ['description', 'quantity', 'price']
                    }
                ],
                order: [['createdAt', 'DESC']]
            });

            if (!invoices) {
                throw new Error('No invoices found for this user');
            }

            return invoices;
        } catch (error: any) {
            throw new Error(`Error fetching user invoices: ${error.message}`);
        }
    }

 
}

export default InvoiceService;
