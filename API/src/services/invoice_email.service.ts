import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import db from '../models';
import { generateInvoiceEmailTemplate } from '../email-templates/invoice-email.template';

// Load environment variables
dotenv.config();

interface InvoiceItem {
    description: string;
    quantity: number;
    price: number;
}

export class InvoiceEmailService {
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
     * Send an invoice email using just the invoice ID
     * @param invoiceId The ID of the invoice to send
     * @param pdfAttachment Optional PDF attachment
     * @returns Promise<boolean> True if email was sent successfully
     */

    async sendInvoiceEmail(invoiceId: number, pdfAttachment?: Buffer): Promise<boolean> {
        try {
            const invoice = await db.Invoice.findOne({
                where: { id: invoiceId },
                include: [
                    {
                        model: db.Client,
                        as: 'client',
                        attributes: ['email', 'name'],
                    },
                ],
            });

            if (!invoice) {
                console.error(`Invoice with ID ${invoiceId} not found`);
                return false;
            }

            if (!invoice.client?.email) {
                console.error(`No client email found for invoice ${invoiceId}`);
                return false;
            }

            const emailTemplate = generateInvoiceEmailTemplate(invoice);
            const mailOptions: nodemailer.SendMailOptions = {
                from: `"${this.fromName}" <${this.fromEmail}>`,
                to: invoice.client.email,
                subject: `New Invoice from ${invoice.companyName}`,
                html: emailTemplate,
            };

            if (pdfAttachment) {
                mailOptions.attachments = [
                    {
                        filename: `invoice-${invoice.invoiceNo}.pdf`,
                        content: pdfAttachment,
                        contentType: 'application/pdf',
                    },
                ];
            }

            // Send email and wait for result
            const info = await this.transporter.sendMail(mailOptions);
            
            if (info && info.accepted && info.accepted.length > 0) {
                // Only update if email was actually sent
                await db.Invoice.update(
                    { status: 'Sent' },
                    { where: { id: invoiceId } }
                );
                return true;
            }

            console.error('Email not accepted by recipient server');
            return false;
        } catch (error) {
            console.error('Error sending invoice email:', error);
            return false;
        }
    }
    

    /**
     * Send payment reminder
     * @param invoiceId The ID of the invoice to send reminder for
     */
    async sendPaymentReminder(invoiceId: number): Promise<boolean> {
        try {
            // Fetch invoice with client details
            const invoice = await db.Invoice.findOne({
                where: { id: invoiceId },
                attributes: {
                    exclude: ['companyLogo', 'signatureImage']
                },
                include: [{
                    model: db.Client,
                    as: 'client',
                    attributes: ['email', 'name']
                }]
            });

            if (!invoice) {
                console.error(`Invoice with ID ${invoiceId} not found`);
                return false;
            }

            // Debug log
            console.log('Invoice data:', JSON.stringify(invoice, null, 2));

            if (!invoice.client?.email) {
                console.error(`No client email found for invoice ${invoiceId}`);
                return false;
            }

            const subject = `Payment Reminder: Invoice #${invoice.invoiceNumber}`;
            const html = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Payment Reminder</h2>
                    <p>Dear ${invoice.client.name || 'Valued Customer'},</p>
                    <p>This is a friendly reminder about the following invoice:</p>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <p><strong>Invoice Number:</strong> #${invoice.invoiceNumber}</p>
                        <p><strong>Amount Due:</strong> $${invoice.total.toFixed(2)}</p>
                        <p><strong>Due Date:</strong> ${new Date(invoice.dueDate).toLocaleDateString()}</p>
                        <p><strong>Status:</strong> ${invoice.status}</p>
                    </div>

                    <p>Please ensure timely payment to avoid any late fees.</p>
                    
                    <div style="margin-top: 30px;">
                        <p>Best regards,</p>
                        <p>${this.fromName} Team</p>
                    </div>
                </div>
            `;

            const success = await this.sendEmail(invoice.client.email, subject, html);

            if (success) {
                // Update invoice reminder sent status if needed
                await db.Invoice.update(
                    { reminderSent: true, lastReminderSentDate: new Date() },
                    { where: { id: invoiceId } }
                );
            }

            return success;
        } catch (error) {
            console.error('Error sending payment reminder:', error);
            return false;
        }
    }

    /**
     * Send a generic email
     * @param to Recipient email address
     * @param subject Email subject
     * @param html HTML content of the email
     */
    private async sendEmail(to: string, subject: string, html: string): Promise<boolean> {
        try {
            await this.transporter.sendMail({
                from: `"${this.fromName}" <${this.fromEmail}>`,
                to,
                subject,
                html,
            });
            return true;
        } catch (error) {
            console.error('Error sending email:', error);
            return false;
        }
    }
}