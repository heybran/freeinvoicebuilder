import BaseElement from '../BaseElement/BaseElement.js';
import sheet from './index.css' assert { type: 'css' };

export default class FormButton extends BaseElement {
  static get observedAttributes() {
    return ['type']
  }

  constructor() {
    super();
    this.shadowRoot.innerHTML = `
      <slot name="button"></slot>
    `;
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }

  get inputType() {
    return this.shadowRoot.querySelector('slot[name=input]')
      .assignedElements()[0]
      .type;
  }

  get input() {
    return this.querySelector('input');
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr == 'type') {
      const input = this.querySelector('input');
      if (input.type == 'date') {
        input.setAttribute('value', this.formatDate(new Date()));
      }

      if (input.type == 'date' && input.name == 'invoiceDueDate') {
        input.setAttribute('value', this.formatDate(new Date(), 14));
      }
    }
  }

}

customElements.define('form-button', FormButton);