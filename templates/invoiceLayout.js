import template from "./template.js";
import Invoice from "../static/invoice.js";

function renderInvoice(invoice) {
  return `
  <style>
    * {
      box-sizing: border-box;
    }
    
    dialog {
      width: 60rem;
    }
    
    output {
      display: grid;
      grid-template-columns: 1fr 1fr;
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
      grid-template-columns: 50% 10% 20% 20%;
      align-items: center;
    }
    
    th {
      padding-inline: .75rem;
      padding-block: 1rem;
      text-align: left;
    }
    
    th:not(:first-child) {
      text-align: right;
    }
    
    td {
      padding-inline: .75rem;
      padding-block: 1rem;
      text-align: center;
    }
    
    td:first-child {
      text-align: left;
    }
    
    td:not(:first-child) {
      text-align: right;
    }
    
    .invoiceItemDetails {
      font-size: .85em;
      color: #888;
    }
    
    table#summary tr {
      grid-template-columns: 1fr;
    }
    
    table#summary tbody tr {
      border-bottom: 2px solid var(--border);
      grid-template-columns: 1fr 2fr;
    }
    
    table#summary th {
      text-align: center;
    }
    
    table#summary tbody td {
      padding-block: 1rem;
    }
    
    table#summary tbody td:last-child {
      text-align: right;
    }    
  </style>
  <output>${template(invoice)}</output>
  `;
}

export function invoiceLayoutWithoutHeader(data) {
  const invoice = new Invoice(data);
  return renderInvoice(invoice);
}

export function invoiceLayoutWithHeader(data) {
  const invoice = new Invoice(data);
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
        body {
          margin: 0;
          padding: 1rem;
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
      </style>
    </head>
    <body>
      ${renderInvoice(invoice)}
    </body>
    </html>
  `;
}