import BaseElement from '../BaseElement/BaseElement.js';
import sheet from './index.css' assert { type: 'css' };

export default class FormField extends BaseElement {
  static get observedAttributes() {
    return ['type']
  }

  constructor() {
    super();
    this.shadowRoot.innerHTML = `
      <slot name="input"></slot>
      <slot name="icon" onclick="${this.run('openDatePicker()')}"></slot>
    `;
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }

  openDatePicker() {
    if (this.inputType === 'date') {
      this.input.showPicker();
    }
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

  formatDate(date, due) {
    if (due) {
      date = new Date(date.setDate(date.getDate() + due));
    }
    const year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    month = month < 10 ? ('0' + month) : month;
    day = day < 10 ? ('0' + day) : day;
    return `${year}-${month}-${day}`;
  }
}

customElements.define('form-field', FormField);