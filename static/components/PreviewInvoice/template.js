export default function template(invoiceData) {
  const { header, body } = invoiceData;
  const currency = header.invoiceCurrency;
  return templateHeader(header) + templateBody(body, currency) + templateSummary(body, currency);
}

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

const templateBody = (body, currency) => {
  let result = `
    <section class="full">
      <table>
        <thead>
          <tr>
            <th>Invoice Item</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Tax</th>
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
        <td>${currency} ${entry.invoiceItemUnitPrice}</td>
        <td>${entry.invoiceItemTax}</td>
        <td>${currency} ${entry.invoiceItemUnitPrice}</td>
      </tr>
      <tr>
        <td colspan="4">${entry.invoiceItemDetails}</td>
      </tr>
    `;
  });

  result += `</tbody></table></section>`;
  return result;
}

const templateSummary = (body, currency) => {
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
          <td>${currency} subtotalAmount</td>
        </tr>
        <tr>
          <td>Total</td>
          <td>${currency} totalAmount</td>
        </tr>
      </tbody>
    </table>
    </section>
  `;
}
