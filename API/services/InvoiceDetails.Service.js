const { Client, InvoiceDetails, InvoiceItems } = require('../models');

class InvoiceDetailsService {
  static async addInvoice(invoiceData) {
    try {
      // Check if the client exists by email
      let client = await Client.findOne({
        where: { email: invoiceData.client.email }
      });

    
      // If the client doesn't exist, create a new one
      if (!client) {
        client = await Client.create({
          name: invoiceData.client.name,
          email: invoiceData.client.email,
          phone: invoiceData.client.phone,
        });
      }

      let item = await InvoiceItems.findOne({
        where: { description: invoiceData.item.description }
      });

      if (!item) {
        item = await InvoiceItems.create({
         description: invoiceData.item.description,
         price: invoiceData.item.price,
         price: invoiceData.item.price,
         
        });
      }

      const invoice = await InvoiceDetails.create({
        InvoiceNo: invoiceData.InvoiceNo,
        IssueDate: invoiceData.IssueDate,
        DueDate: invoiceData.DueDate,
        Notes: invoiceData.Notes,
        TermsAndConditions: invoiceData.TermsAndConditions,
        UserId: invoiceData.UserId,
        ClientID: client.id, // Use the existing or new client's ID
        ItemID: invoiceData.ItemID,
        subtotal: invoiceData.subtotal,
        taxRate: invoiceData.taxRate,
        currency: invoiceData.currency,
        tax: invoiceData.tax,
        total: invoiceData.total,
      });

      return invoice;
    } catch (error) {
        
      throw new Error(`Error saving invoice: ${error.message}`);
    }
  }
}

module.exports = InvoiceDetailsService;
