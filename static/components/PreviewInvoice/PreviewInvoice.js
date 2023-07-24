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
          <span class="close">
            &times;
          </span>
          <output width="100%" height="100%"></output>
        </form>
      </dialog>
      <slot name="icon" onclick="${this.run('openDatePicker()')}"></slot>
    `;
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }

  set html(data) {
    this.shadowRoot.querySelector('output').innerHTML = template(data);
  }

  open() {
    this.shadowRoot.querySelector('dialog').showModal();
  }
}

customElements.define('preview-invoice', PreviewInvoice);
