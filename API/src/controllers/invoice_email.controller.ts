import { NextFunction, Request, Response } from 'express';
import { InvoiceEmailService } from '../services/invoice_email.service';

class InvoiceEmailController {
    private static emailService = new InvoiceEmailService();

    static async sendInvoice(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { invoiceId } = req.params;
            const { pdfAttachment } = req.body; // Optional PDF attachment

            if (!invoiceId) {
                res.status(400).json({
                    isSuccess: false,
                    message: 'Invoice ID is required'
                });
                return;
            }

            const success = await InvoiceEmailController.emailService.sendInvoiceEmail(
                Number(invoiceId),
                pdfAttachment
            );

            if (success) {
                res.status(200).json({
                    isSuccess: true,
                    message: 'Invoice email sent successfully'
                });
            } else {
                res.status(500).json({
                    isSuccess: false,
                    message: 'Failed to send invoice email'
                });
            }
        } catch (error) {
            next(error);
        }
    }

    static async sendReminder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { invoiceId } = req.params;

            if (!invoiceId) {
                res.status(400).json({
                    isSuccess: false,
                    message: 'Invoice ID is required'
                });
                return;
            }

            const success = await InvoiceEmailController.emailService.sendPaymentReminder(
                Number(invoiceId)
            );

            if (success) {
                res.status(200).json({
                    isSuccess: true,
                    message: 'Payment reminder sent successfully'
                });
            } else {
                res.status(500).json({
                    isSuccess: false,
                    message: 'Failed to send payment reminder'
                });
            }
        } catch (error) {
            next(error);
        }
    }
}

export default InvoiceEmailController;
