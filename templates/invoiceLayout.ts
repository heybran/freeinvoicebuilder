import renderInvoiceHeader from './renderInvoiceHeader.ts';
import renderInvoiceBody from './renderInvoiceBody.ts';
import { InvoiceHeader, InvoiceBody } from './type.ts';

const invoiceLayout = (headerData: InvoiceHeader, bodyData: InvoiceBody) => {
  const invoiceHeader = renderInvoiceHeader(headerData);
  const invoiceBody = renderInvoiceBody(bodyData);

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap" rel="stylesheet">
    <title>PDF Template 1</title>
    <style>
      * {
      box-sizing: border-box;
      }
      
      body {
        margin: 0;
        font-family: Inter, sans-serif;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        padding: 4rem;
        color: #555;
      }
      
      section {
        margin-top: 1rem;
      }
      
      .right {
        grid-column-start: 2;
      }
      
      .full {
        grid-column: span 2;
      }
      
      small {
        text-transform: uppercase;
        color: #888;
        font-size: .7rem;
      }
      
      small + * {
        margin-top: 1rem;
      }
      
      .organization {
        color: #333;
        font-size: 1.2rem;
        font-weight: bold;
      }
      
      .fullname, .email {
        margin-top: .5rem;
      }
      
      strong {
        color: #333;
      }
      
      .flex {
        display: flex;
      }
      
      .flex-direction-column {
        flex-direction: column;
      }
      
      .justify-content-end {
        justify-content: flex-end;
      }
      
      table {
        border-collapse: collapse;
        width: 100%;
        margin-top: 1rem;
        --border: #dadada;
      }
      
      thead {
        background-color: #f1f1f1;
        border-top: 2px solid var(--border);
        border-bottom: 2px solid var(--border);
      }
      
      tr {
        display: grid;
        grid-template-columns: 40% 10% 10% 20% 20%;
        align-items: center;
      }
      
      th:first-child {
        padding-inline: .75rem;
        padding-block: 1rem;
        color: #333;
        text-align: left;
      }
      
      th:nth-child(4) {
        margin-right: 50%;
      }
      
      td {
        padding-inline: 1rem;
        padding-block: 1rem;
        text-align: center;
      }
      
      td:first-child {
        text-align: left;
        padding-inline: .5rem;
      }
      
      td[colspan] {
        padding-block: .1rem;
        color: #888;
      }
      
      table#summary tr {
        grid-template-columns: 1fr;
      }
      
      table#summary tbody tr {
        border-bottom: 2px solid var(--border);
        grid-template-columns: 1fr 1fr;
      }
      
      table#summary th {
        text-align: center;
      }
      
      table#summary tbody td {
        padding-block: 1.5rem;
      }
      
      table#summary tbody td:last-child {
        text-align: right;
      }
    </style>
  </head>
  <body>
    <p class="heading column right">Invoice</p>
    ${invoiceHeader}
    <section class="full">
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>HRS/TY</th>
            <th>Rate</th>
            <th>Tax</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>
    </section>
    <section class="column right">
      <table id="summary">
        <thead>
          <tr>
            <th colspan="2">Invoice Summary</th>
          </tr>
        </thead>
        <tbody>
          ${invoiceBody}
          <tr>
            <td>Subtotal</td>
            <td>invoiceItemCurrency subtotalAmount</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>invoiceItemCurrency totalAmount</td>
          </tr>
        </tbody>
      </table>
    </section>
  </body>
  </html>
  `;
}

export default invoiceLayout;