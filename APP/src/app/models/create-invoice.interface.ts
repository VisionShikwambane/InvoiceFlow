export interface InvoiceDetails {
    signatureimage?: string;
    signaturedate: Date;
    invoiceNumber: string;
    issueDate: Date;
    dueDate: Date;
    companyname: string;
    companyaddress: string;
    companyemail: string;
    companyphone: string;
    companylogo?: string;
    client: {
        name: string;
        address: string;
        email: string;
        phone: string;
    };
    items: InvoiceItem[];
    notes: string;
    terms: string;
    templateId: string;
    subtotal: number;
    taxRate: number; 
    currency: string;  // as a percentage, e.g., 18 for 18%
    tax: number;
    total: number;


}

export interface InvoiceItem {
    description: string;
    quantity: number;
    price: number;
    amount: number;
}