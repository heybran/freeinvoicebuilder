const renderInvoiceBody = (data) => {
  return data.map(item => {
    const {
      invoiceItem,
      invoiceItemQuantity,
      invoiceItemRate,
      invoiceItemCurrency,
      invoiceItemDetails
    } = item;

    return `
      <tr>
        <td>${invoiceItem}</td>
        <td>${invoiceItemQuantity}</td>
        <td>${invoiceItemRate}</td>
        <td></td>
        <td>${invoiceItemCurrency} ${(invoiceItemQuantity * invoiceItemRate).toFixed(2)}</td>
      </tr>
      <tr>
        <td colspan="4">${invoiceItemDetails}</td>
      </tr>
    `;
  });
}

export default renderInvoiceBody;