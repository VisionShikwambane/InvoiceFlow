const InvoiceDetailsService = require('../services/InvoiceDetails.Service');

class InvoiceController {
  /**
   * Handles adding a new invoice.
   * @param {Object} req - The request object containing invoice data in the body.
   * @param {Object} res - The response object for sending back results or errors.
   */
  static async addInvoice(req, res) {
    try {
      // Extract invoice data from the request body
      const invoiceData = req.body;

      // Validate input data (basic example)
      if (!invoiceData || !invoiceData.client || !invoiceData.item) {
        return res.status(400).json({ message: "Invalid invoice data provided." });
      }

      // Call the service to add the invoice
      const invoice = await InvoiceDetailsService.addInvoice(invoiceData);

      // Respond with the created invoice, client, and item details
      return res.status(201).json({
        isSuccess: true,
        message: "Invoice created successfully!",
        invoice
      });
    } catch (error) {
      console.error("Error in addInvoice controller:", error.message);

      // Send error response
      return res.status(500).json({ message: `Failed to add invoice: ${error.message}` });
    }
  }
}

module.exports = InvoiceController;
