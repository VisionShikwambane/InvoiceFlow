export const generateInvoiceEmailTemplate = (invoice: any): string => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Invoice from ${invoice.companyName}</title>
            <style>
                body {
                    font-family: 'Segoe UI', Arial, sans-serif;
                    line-height: 1.6;
                    color: #4a5568;
                    margin: 0;
                    padding: 20px;
                    background: #f7fafc;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background: white;
                    border-radius: 8px;
                    padding: 30px;
                }
                .greeting {
                    font-size: 24px;
                    color: #2d3748;
                    margin-bottom: 20px;
                }
                .message {
                    margin-bottom: 30px;
                    color: #4a5568;
                }
                .invoice-summary {
                    background: #f8fafc;
                    padding: 20px;
                    border-radius: 6px;
                    margin-bottom: 30px;
                }
                .summary-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 8px 0;
                    border-bottom: 1px solid #e2e8f0;
                }
                .summary-row:last-child {
                    border-bottom: none;
                }
                .summary-label {
                    color: #718096;
                }
                .summary-value {
                    font-weight: 500;
                    color: #2d3748;
                }
                .download-button {
                    display: inline-block;
                    background: #4299e1;
                    color: white;
                    padding: 12px 24px;
                    text-decoration: none;
                    border-radius: 6px;
                    margin: 20px 0;
                    text-align: center;
                }
                .footer {
                    margin-top: 40px;
                    padding-top: 20px;
                    border-top: 1px solid #e2e8f0;
                    color: #718096;
                    font-size: 14px;
                    text-align: center;
                }
                @media (max-width: 600px) {
                    body {
                        padding: 10px;
                    }
                    .container {
                        padding: 20px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="greeting">Hello ${invoice.client.name},</div>
                
                <div class="message">
                    A new invoice has been generated for you from ${invoice.companyName}. Here's a summary of your invoice:
                </div>

                <div class="invoice-summary">
                    <div class="summary-row">
                        <span class="summary-label">Invoice Number</span>
                        <span class="summary-value">#${invoice.invoiceNo}</span>
                    </div>
                    <div class="summary-row">
                        <span class="summary-label">Date</span>
                        <span class="summary-value">${new Date(invoice.date).toLocaleDateString()}</span>
                    </div>
                    <div class="summary-row">
                        <span class="summary-label">Due Date</span>
                        <span class="summary-value">${new Date(invoice.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div class="summary-row">
                        <span class="summary-label">Total Amount</span>
                        <span class="summary-value">${invoice.currency} ${Number(invoice.total).toFixed(2)}</span>
                    </div>
                </div>

                <a href="/download-invoice/${invoice.id}" class="download-button">
                    Download Invoice
                </a>

                <div style="margin-top: 20px; color: #718096;">
                    For any questions about this invoice, please contact us at ${invoice.companyEmail || 'our support team'}.
                </div>

                <div class="footer">
                    <div>Best regards,</div>
                    <div style="margin-top: 10px;">
                        <strong>${invoice.companyName}</strong><br>
                        ${invoice.companyPhone || ''}
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
};
