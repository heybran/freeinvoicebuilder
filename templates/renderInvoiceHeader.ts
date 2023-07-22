const renderInvoiceHeader = (data) => {
  const {
    senderOrganization,
    senderFullname,
    senderEmail,
    receiverOrganization,
    receiverFullname,
    receiverEmail,
    invoiceNumber,
    invoiceDate,
    invoiceDueDate
  } = data;

  return `
    <section class="column left">
    <small class="uppercase">From</small>
    <div class="sender organization">${senderOrganization}</div>
    <div class="sender fullname">${senderFullname}</div>
    <div class="sender email">${senderEmail}</div>
    </section>
    <section class="column right">
      <small class="uppercase">To</small>
      <div class="receiver organization">${receiverOrganization}</div>
      <div class="receiver fullname">${receiverFullname}</div>
      <div class="receiver email">${receiverEmail}</div>
    </section>
    <section class="column left">
      <p><strong>Invoice No.: </strong>${invoiceNumber}</p>
      <p><strong>Invoice Date: </strong>${invoiceDate}</p>
    </section>
    <section class="column right flex flex-direction-column justify-content-end">
      <p><strong>Due: </strong>${invoiceDueDate}</p>
    </section>
  `;
}

export default renderInvoiceHeader;