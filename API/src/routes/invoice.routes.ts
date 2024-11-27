import { Router } from 'express';
import invoiceController from '../controllers/invoice.controller'; 

const router = Router();


router.post("/invoice", invoiceController.addInvoice);


export default router;
