export interface InvoiceSchema {
  senderOrganization: string;
  senderFullname: string;
  senderEmail: string;
  receiverOrganization: string;
  receiverFullname: string;
  receiverEmail: string;
  invoiceNumber: number;
  invoiceDate: string;
  invoiceDueDate: string;
  paid: boolean;
}

export interface InvoiceItemSchema {
  name: string;
  quantity: number;
  rate: number;
  currency: string;
  description: string;
}