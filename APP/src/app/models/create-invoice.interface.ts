export interface InvoiceDetails {
    id: string,
    invoiceNo: string;
    issueDate: string;
    dueDate: string;
    notes?: string;
    termsAndConditions?: string;
    userId: number;
    companyName: string;
    companyEmail: string;
    companyPhone: string;
    companyAddress: string;
    signatureImage: string;
    signatureDate: Date;
    companyLogo: string;
    templateId: number;
    clientId: number;
    status: string;
    client: Client;
    invoiceItems: InvoiceItem[];  
    subtotal: number;
    taxRate: number;
    currency: string;
    amount: string;
    lastAction: string;
    tax: number;
    total: number;
    activities?: InvoiceActivity[];
}

export interface InvoiceItem {
    description: string;
    price: number;
    quantity: number;  
  }
  
  export interface Client {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    userId: number;
  }

export interface InvoiceActivity {
    id: string;
    type: 'email_opened' | 'invoice_viewed' | 'invoice_downloaded' | 'reminder_sent' | 'status_changed';
    timestamp: string;
    details?: string;
}