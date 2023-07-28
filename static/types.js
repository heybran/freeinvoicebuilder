/**
 * Invoice meta data.
 * @typedef {Object} InvoiceMeta
 * @property {string} senderOrganization
 * @property {string} senderFullname
 * @property {string} senderEmail
 * @property {string} receiverOrganization
 * @property {string} receiverFullname
 * @property {string} receiverEmail
 * @property {number} invoiceNumber
 * @property {string} invoiceCurrency
 * @property {Date} invoiceDate
 * @property {Date} invoiceDueDate
 * @property {number} invoiceTaxRate
 * 
 */

/**
 * A single invoice item.
 * @typedef {Object} InvoiceItem
 * @property {string} invoiceItem
 * @property {number} invoiceItemQuantity
 * @property {number} invoiceItemUnitPrice
 * @property {string} invoiceItemDetails
 * 
 */

export { InvoiceMeta, InvoiceItem };