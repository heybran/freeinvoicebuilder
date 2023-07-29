import BaseElement from '../BaseElement/BaseElement.js';
import sheet from './invoices.css' assert { type: 'css' };
import template from './template.js';

export default class PreviewInvoice extends BaseElement {
  static get observedAttributes() {
    return ['type']
  }

  constructor() {
    super();
    this.shadowRoot.innerHTML = `
      <dialog>
        <form method="dialog">
          <button value="cancel">
            <span class="sr-only">Close</span>
            <svg role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <output width="100%" height="100%"></output>
        </form>
      </dialog>
    `;
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }

  preview(invoice) {
    this.shadowRoot.querySelector('output').innerHTML = template(invoice);
    this.open();
  }

  open() {
    this.shadowRoot.querySelector('dialog').showModal();
  }
}

customElements.define('preview-invoice', PreviewInvoice);
