export interface createInvoiceDto {
    id: string,
    invoiceNo: string,
    issueDate: Date,
    dueDate: Date,
    notes: string,
    termsAndConditions: string,
    userId: number,
    companyName: string
    companyEmail: string,
    companyPhone: string,
    companyAddress: string,
    templateId: number,
    status: string,
    clientId: number,
    subtotal: number,
    taxRate: number,
    currency: string,
    tax: number,
    total: number,
    items: ItemDto[],
    client: ClientDto
  }

  interface ItemDto{
    id: string,
    description: string,
    price: string,
    invoiceId: number

  }

  interface ClientDto{
    id: string
    name: string,
    email: string,
    phone: string,
    address: string,
    userId: number
  }
  