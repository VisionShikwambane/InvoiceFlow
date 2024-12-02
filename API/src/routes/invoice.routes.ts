import { Router } from 'express';
import invoiceController from '../controllers/invoice.controller'; 

const router = Router();

router.post("/invoice", invoiceController.addInvoice);
router.get("/invoice/user/:userId", invoiceController.getUserInvoices);

export default router;
