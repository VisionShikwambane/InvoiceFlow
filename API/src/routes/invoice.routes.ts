import { Router } from 'express';
import invoiceController from '../controllers/invoice.controller'; 

const router = Router();


router.post("/", invoiceController.addInvoice);


export default router;
