import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export class EmailService {
    private transporter: nodemailer.Transporter;
    private readonly fromEmail: string;
    private readonly fromName: string;

    constructor() {
        // Validate required environment variables
        const requiredEnvVars = [
            'SMTP_HOST',
            'SMTP_PORT',
            'SMTP_USER',
            'SMTP_PASS',
            'EMAIL_FROM_NAME',
            'EMAIL_FROM_ADDRESS'
        ];

        for (const envVar of requiredEnvVars) {
            if (!process.env[envVar]) {
                throw new Error(`Missing required environment variable: ${envVar}`);
            }
        }

        this.fromName = process.env.EMAIL_FROM_NAME!;
        this.fromEmail = process.env.EMAIL_FROM_ADDRESS!;

        // Create reusable transporter object using SMTP transport
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    /**
     * Send an email
     * @param to Recipient email address
     * @param subject Email subject
     * @param html HTML content of the email
     * @returns Promise<boolean> True if email was sent successfully
     */
    async sendEmail(to: string, subject: string, html: string): Promise<boolean> {
        try {
            const info = await this.transporter.sendMail({
                from: `"${this.fromName}" <${this.fromEmail}>`,
                to,
                subject,
                html,
            });

            console.log('Message sent: %s', info.messageId);
            return true;
        } catch (error) {
            console.error('Error sending email:', error);
            return false;
        }
    }

    /**
     * Send invoice to client
     * @param clientEmail Client's email address
     * @param invoiceNumber Invoice number
     * @param invoiceAmount Invoice amount
     * @param dueDate Invoice due date
     * @param pdfAttachment Optional PDF attachment
     */
    async sendInvoiceEmail(
        clientEmail: string,
        invoiceNumber: string,
        invoiceAmount: number,
        dueDate: Date,
        pdfAttachment?: Buffer
    ): Promise<boolean> {
        const subject = `Invoice #${invoiceNumber} from ${this.fromName}`;
        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Invoice #${invoiceNumber}</h2>
                <p>Thank you for your business. Please find your invoice details below:</p>
                
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <p><strong>Amount Due:</strong> $${invoiceAmount.toFixed(2)}</p>
                    <p><strong>Due Date:</strong> ${dueDate.toLocaleDateString()}</p>
                </div>

                <p>Please process this payment before the due date.</p>
                
                <div style="margin-top: 30px;">
                    <p>Best regards,</p>
                    <p>${this.fromName} Team</p>
                </div>
            </div>
        `;

        const mailOptions: nodemailer.SendMailOptions = {
            from: `"${this.fromName}" <${this.fromEmail}>`,
            to: clientEmail,
            subject,
            html,
        };

        if (pdfAttachment) {
            mailOptions.attachments = [{
                filename: `invoice-${invoiceNumber}.pdf`,
                content: pdfAttachment,
                contentType: 'application/pdf'
            }];
        }

        try {
            await this.transporter.sendMail(mailOptions);
            return true;
        } catch (error) {
            console.error('Error sending invoice email:', error);
            return false;
        }
    }

    /**
     * Send payment reminder to client
     * @param clientEmail Client's email address
     * @param invoiceNumber Invoice number
     * @param invoiceAmount Invoice amount
     * @param dueDate Invoice due date
     */
    async sendPaymentReminder(
        clientEmail: string,
        invoiceNumber: string,
        invoiceAmount: number,
        dueDate: Date
    ): Promise<boolean> {
        const subject = `Payment Reminder: Invoice #${invoiceNumber}`;
        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Payment Reminder</h2>
                <p>This is a friendly reminder about the following invoice:</p>
                
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <p><strong>Invoice Number:</strong> #${invoiceNumber}</p>
                    <p><strong>Amount Due:</strong> $${invoiceAmount.toFixed(2)}</p>
                    <p><strong>Due Date:</strong> ${dueDate.toLocaleDateString()}</p>
                </div>

                <p>Please ensure timely payment to avoid any late fees.</p>
                
                <div style="margin-top: 30px;">
                    <p>Best regards,</p>
                    <p>${this.fromName} Team</p>
                </div>
            </div>
        `;

        return await this.sendEmail(clientEmail, subject, html);
    }
}