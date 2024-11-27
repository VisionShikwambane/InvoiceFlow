const { Client, InvoiceDetails, InvoiceItems } = require('../models');
const sequelize = require('../config/db'); 

class InvoiceDetailsService {


  static async addInvoice(invoiceData) {

    const transaction = await sequelize.transaction();

    try {
      let client = await Client.findOne({
        where: { email: invoiceData.client.email },
        transaction,
      });

      if (!client) {
        client = await Client.create(
          {
            name: invoiceData.client.name,
            email: invoiceData.client.email,
            phone: invoiceData.client.phone,
            userId: 1
          },
          { transaction }
        );
      }

    
      const invoice = await InvoiceDetails.create(
        {
          invoiceNo: invoiceData.InvoiceNo,
          issueDate: invoiceData.IssueDate,
          dueDate: invoiceData.DueDate,
          notes: invoiceData.Notes,
          termsAndConditions: invoiceData.TermsAndConditions,
          userId: 1,
          companyName: "Yes",
          companyEmail: "visionvee201@gmail.com",
          companyPhone: "0781961812",
          companyAddress: "7786 Bokang St",
          templateId: 12,
          status: "Draft",
          clientId: client.id,
          subtotal: invoiceData.subtotal,
          taxRate: invoiceData.taxRate,
          currency: invoiceData.currency,
          tax: invoiceData.tax,
          total: invoiceData.total,
        },
        { transaction }
      );

      const item = await InvoiceItems.create(
        {
          description: invoiceData.item.description,
          price: invoiceData.item.price,
          invoiceId: invoiceData.id
        },
        { transaction }
      );

      await transaction.commit();
      return invoice;

      
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw new Error(`Error saving invoice: ${error.message}`);
    }


  }
}

module.exports = InvoiceDetailsService;
