import { Router } from 'express';
import EmailController from '../controllers/email.controller';

const router = Router();

router.post('/send-invoice', EmailController.sendInvoice);
router.post('/send-reminder', EmailController.sendReminder);
router.post('/test', EmailController.testEmail);

export default router;
