export interface InvoiceDetails {
    invoiceNumber: string;
    issueDate: Date;
    dueDate: Date;
    company: {
      name: string;
      address: string;
      email: string;
      phone: string;
    };
    client: {
      name: string;
      address: string;
      email: string;
      phone: string;
    };
    items: InvoiceItem[];
    notes: string;
    terms: string;
    subtotal: number;
    tax: number;
    total: number;
    templateId: string;
  }
  
  export interface InvoiceItem {
    description: string;
    quantity: number;
    price: number;
    amount: number;
  }