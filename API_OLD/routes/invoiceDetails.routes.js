const express = require('express');
const InvoiceController = require('../controllers/InvoiceDetailsController');

const router = express.Router();

// Define the POST route for adding invoices
router.post('/invoiceDetails', InvoiceController.addInvoice);

module.exports = router;
