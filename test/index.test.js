// @ts-check
import { describe, test, mock, before, after } from "node:test";
import { deepEqual, strictEqual } from "node:assert";
import os from "node:os";
import Invoice from "../static/invoice.js";

describe('invoice', () => {
  /** @type {import("../static/types.js").InvoiceMeta} */
  let invoiceMeta;
  /** @type {import("../static/types.js").InvoiceItem[]} */
  let invoiceData = [];
  before(() => {
    invoiceMeta = {
      senderOrganization: 'Brandon Zhang',
      senderFullname: "Brandon Zhang",
      senderEmail: "test@example.com",
      receiverOrganization: "AAA",
      receiverFullname: "Joe Joe",
      receiverEmail: "joe@example.com",
      invoiceCurrency: "USD",
      invoiceNumber: 123,
      invoiceDate: new Date("2023-07-31"),
      invoiceDueDate: new Date("2023-08-10"),
      invoiceTaxRate: 10
    };

    invoiceData = [
      {
        invoiceItem: "Web Development",
        invoiceItemQuantity: 1,
        invoiceItemUnitPrice: 1200,
        invoiceItemDetails: "Just another web development."
      },
      {
        invoiceItem: "App Development",
        invoiceItemQuantity: 1,
        invoiceItemUnitPrice: 2200,
        invoiceItemDetails: "Just another app development."
      }
    ];
  });

  test('subtotal', () => {
    const invoice = new Invoice({ invoiceMeta, invoiceData });
    deepEqual(invoice.subTotal, 3400);
  });
})