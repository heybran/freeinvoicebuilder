import BaseElement from '../BaseElement/BaseElement.js';

export default class PreviewInvoice extends BaseElement {
  static get observedAttributes() {
    return ['type']
  }

  constructor() {
    super();
    this.shadowRoot.innerHTML = `
      <style>
        .sr-only {
          clip: rect(0 0 0 0);
          border: 0;
          height: 1px;
          margin: -1px;
          overflow: hidden;
          padding: 0;
          position: absolute;
          top: 0;
          width: 1px;
        }

        button[value="cancel"] {
          background: transparent;
          border: 1px solid currentColor;
          width: 2rem;
          height: 2rem;
          display: inline-flex;
          border-radius: 50%;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: fixed;
          top: 1rem;
          right: 1rem;
        }

        button[value="cancel"]:hover,
        button[value="cancel"]:focus-visible {
          outline: 2px solid var(--color-primary);
          outline-offset: 4px;
        }

        ::backdrop {
          background: #eeeeeecc;
          filter: blur(2px);
        }

        dialog {
          position: relative;
          border-color: transparent;
          box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
        }
      </style>
      <dialog>
        <form method="dialog">
          <button value="cancel">
            <span class="sr-only">Close</span>
            <svg role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <section width="100%" height="100%"></section>
          
        </form>
      </dialog>
    `;
  }

  preview(invoiceHTMLString) {
    this.shadowRoot.querySelector('section').innerHTML = invoiceHTMLString;
    this.open();
  }

  open() {
    this.shadowRoot.querySelector('dialog').showModal();
  }
}

customElements.define('preview-invoice', PreviewInvoice);
