import { NextFunction, Request, Response } from 'express';
import { EmailService } from '../services/email.service';
import { validateEmail } from '../utils/validators';

class EmailController {
    private static emailService = new EmailService();

    static async sendInvoice(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { clientEmail, invoiceNumber, invoiceAmount, dueDate, pdfAttachment } = req.body;

            // Validate required fields
            if (!clientEmail || !invoiceNumber || !invoiceAmount || !dueDate) {
                res.status(400).json({
                    isSuccess: false,
                    message: 'Missing required fields'
                });
                return;
            }

            // Validate email format
            if (!validateEmail(clientEmail)) {
                res.status(400).json({
                    isSuccess: false,
                    message: 'Invalid email format'
                });
                return;
            }

            const success = await EmailController.emailService.sendInvoiceEmail(
                clientEmail,
                invoiceNumber,
                invoiceAmount,
                new Date(dueDate),
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
            const { clientEmail, invoiceNumber, invoiceAmount, dueDate } = req.body;

            // Validate required fields
            if (!clientEmail || !invoiceNumber || !invoiceAmount || !dueDate) {
                res.status(400).json({
                    isSuccess: false,
                    message: 'Missing required fields'
                });
                return;
            }

            // Validate email format
            if (!validateEmail(clientEmail)) {
                res.status(400).json({
                    isSuccess: false,
                    message: 'Invalid email format'
                });
                return;
            }

            const success = await EmailController.emailService.sendPaymentReminder(
                clientEmail,
                invoiceNumber,
                invoiceAmount,
                new Date(dueDate)
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

    static async testEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email } = req.body;

            if (!email || !validateEmail(email)) {
                res.status(400).json({
                    isSuccess: false,
                    message: 'Invalid email address'
                });
                return;
            }

            const success = await EmailController.emailService.sendEmail(
                email,
                'Test Email from InvoiceFlow',
                `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Test Email</h2>
                    <p>This is a test email from InvoiceFlow to verify that the email service is working correctly.</p>
                    <p>If you received this email, your email configuration is working properly!</p>
                    
                    <div style="margin-top: 30px;">
                        <p>Best regards,</p>
                        <p>InvoiceFlow Team</p>
                    </div>
                </div>
                `
            );

            if (success) {
                res.status(200).json({
                    isSuccess: true,
                    message: 'Test email sent successfully'
                });
            } else {
                res.status(500).json({
                    isSuccess: false,
                    message: 'Failed to send test email'
                });
            }
        } catch (error) {
            next(error);
        }
    }
}

export default EmailController;
