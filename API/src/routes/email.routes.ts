import { Router } from 'express';
import InvoiceEmailController from '../controllers/invoice_email.controller';

const router = Router();

// Send invoice email
router.post('/invoice/:invoiceId', InvoiceEmailController.sendInvoice);

// Send payment reminder
router.post('/reminder/:invoiceId', InvoiceEmailController.sendReminder);

export default router;
