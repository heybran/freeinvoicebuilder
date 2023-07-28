// @ts-check
/**
 * Represents an invoice.
 */
export default class Invoice {
  /**
   * Create a new Invoice instance.
   * @param {Object} options
   * @param {import("./types.js").InvoiceMeta} options.invoiceMeta
   * @param {import("./types.js").InvoiceItem[]} options.invoiceData
   */
  constructor({ invoiceMeta, invoiceData }) {
    this._invoiceMeta = invoiceMeta;
    this._invoiceData = invoiceData;
  }

  get invoiceMeta() {
    return this._invoiceMeta;
  }

  /**
   * @param {import("./types.js").InvoiceMeta} arg
   */
  set invoiceMeta(arg) {
    this._invoiceMeta = arg;
  }

  get invoiceData() {
    return this._invoiceData;
  }

  /**
   * @param {import("./types.js").InvoiceItem[]} arg
   */
  set invoiceData(arg) {
    this._invoiceData = arg;
  }

  /**
   * @return {number}
   */
  get subTotal() {
    return this.invoiceData.reduce((basket, item) => {
      return basket += item.invoiceItemQuantity * item.invoiceItemUnitPrice;
    }, 0);
  }
}

// /**
//  * Represents an invoice sender.
//  */
// export class InvoiceSender {
//   /**
//    * Create a new InvoiceSender instance.
//    * @param {Object} options
//    * @param {string} options.senderOrganization
//    * @param {string} options.senderFullname
//    * @param {string} options.senderEmail
//    */
//   constructor({ senderOrganization, senderFullname, senderEmail }) {
//     this._senderOrganization = senderOrganization;
//     this._senderFullname = senderFullname;
//     this.senderEmail = senderEmail;
//   }
// }

// /**
//  * Represents an invoice receiver.
//  */
// export class InvoiceReceiver {
//   /**
//    * Create a new InvoiceReceiver instance.
//    * @param {Object} options
//    * @param {string} options.receiverOrganization
//    * @param {string} options.receiverFullname
//    * @param {string} options.receiverEmail
//    */
//   constructor({ receiverOrganization, receiverFullname, receiverEmail }) {
//     this._receiverOrganization = receiverOrganization;
//     this._receiverFullname = receiverFullname;
//     this.receiverEmail = receiverEmail;
//   }
// }