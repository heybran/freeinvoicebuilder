export interface InvoiceHeader {
  senderOrganization: string;
  senderFullname: string;
  senderEmail: string;
  receiverOrganization: string;
  receiverFullname: string;
  receiverEmail: string;
  invoiceNumber: number;
  invoiceDate: string;
  invoiceDueDate: string;
}

export interface InvoiceBody {
  invoiceItem: string;
  invoiceItemQuantity: number;
  invoiceItemRate: number;
  invoiceItemCurrency: string;
  invoiceItemDetails?: string;
}