// @ts-check
/**
 *
 * @param {Object} options
 * @param {import("../static/types.js").InvoiceMeta} options.invoiceMeta
 * @param {import("../static/types.js").InvoiceItem[]} options.invoiceData
 * @param {number} options.subtotal
 * @param {number} options.tax
 * @param {number} options.total
 * @returns {string}
 */
export default function template(invoice) {
  const header = invoice.invoiceMeta;
  const body = invoice.invoiceData;
  const currency = header.invoiceCurrency;
  return templateHeader(header) + templateBody(body, currency) + templateSummary(currency, invoice.subTotal, invoice.tax, invoice.total);
}

// TODO: how to match local with given currency?
const usd = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

/**
 *
 * @param {import("../static/types.js").InvoiceMeta} header
 * @returns {string}
 */
const templateHeader = (header) => {
  return `
    <p class="heading column right">Invoice</p>
    <section class="column left">
      <small class="uppercase">From</small>
      <div class="sender organization">${header.senderOrganization}</div>
      <div class="sender fullname">${header.senderFullname}</div>
      <div class="sender email">${header.senderEmail}</div>
    </section>
    <section class="column right">
      <small class="uppercase">To</small>
      <div class="receiver organization">${header.receiverOrganization}</div>
      <div class="receiver fullname">${header.receiverFullname}</div>
      <div class="receiver email">${header.receiverEmail}</div>
    </section>
    <section class="column left">
      <p><strong>Invoice No.: </strong>${header.invoiceNumber}</p>
      <p><strong>Invoice Date: </strong>${header.invoiceDate}</p>
    </section>
    <section class="column right flex flex-direction-column justify-content-end">
      <p><strong>Due: </strong>${header.invoiceDueDate}</p>
    </section>
  `;
}

/**
 *
 * @param {import("../static/types.js").InvoiceItem[]} body
 * @param {string} currency
 * @returns {string}
 */
const templateBody = (body, currency) => {
  let result = `
    <section class="full">
      <table>
        <thead>
          <tr>
            <th>Invoice Item</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
  `;

  body.forEach(entry => {
    result += `
      <tr>
        <td>
          <div class="invoiceItem">
          ${entry.invoiceItem}
          </div>
          <div class="invoiceItemDetails">
          ${entry.invoiceItemDetails}
          </div>
        </td>
        <td>${entry.invoiceItemQuantity}</td>
        <td>${currency} ${usd(entry.invoiceItemUnitPrice)}</td>
        <td>${currency} ${usd(entry.invoiceItemUnitPrice * entry.invoiceItemQuantity)}</td>
      </tr>
    `;
  });

  result += `</tbody></table></section>`;
  return result;
}

/**
 *
 * @param {string} currency
 * @param {number} subTotal
 * @param {number} tax
 * @param {number} total
 */
const templateSummary = (currency, subTotal, tax, total) => {
  return `
    <section class="column right">
    <table id="summary">
      <thead>
        <tr>
          <th colspan="2">Invoice Summary</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Subtotal</td>
          <td>${currency} ${usd(subTotal)}</td>
        </tr>
        <tr>
          <td>Tax</td>
          <td>${currency} ${usd(tax)}</td>
        </tr>
        <tr>
          <td>Total</td>
          <td>${currency} ${usd(total)}</td>
        </tr>
      </tbody>
    </table>
    </section>
  `;
}
