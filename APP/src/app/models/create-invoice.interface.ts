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
    signatureImage: string; //This too
    signatureDate: Date //This
    companyLogo: string;   //This to be changes to capital L
    templateId: number;
    clientId: number;
    status: string;
    client: Client;
    items: InvoiceItem[];
    subtotal: number;
    taxRate: number;
    currency: string;
    tax: number;
    total: number;


}

export interface InvoiceItem {
    description: string;
    price: number;
    quantity: number;  //This need to be added on db
  }
  
  export interface Client {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    userId: number;
  }