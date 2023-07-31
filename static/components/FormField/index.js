import BaseElement from '../BaseElement/BaseElement.js';

export default class FormField extends BaseElement {
  static get observedAttributes() {
    return ['type']
  }

  constructor() {
    super();
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-block: 0;
          padding-inline: var(--padding-input);
          color: var(--color-input);
          border: var(--width-border) solid var(--color-border-normal);
          border-radius: var(--radius-border);
        }

        :host(:focus-within) {
          border-color: var(--color-primary);
          box-shadow: var(--box-shadow-primary);
        }

        :host([type=button]) {
          background-color: var(--color-border-normal);
        }

        :host([theme="primary"]) {
          background-color: var(--color-primary);
          color: whitesmoke;
        }

        :host([theme="white"]) {
          background-color: whitesmoke;
          color: var(--color-input);
        }

        :host([type=button]:hover) {
          border-color: var(--color-primary);
          box-shadow: var(--box-shadow-primary);
        }

        ::slotted(input) {
          padding-inline: 0;
          padding-block: var(--padding-input);
          height: 100%;
          background-color: transparent;
          border: none;
          appearance: none;
          width: 100%;
          font-size: inherit;
          font-family: inherit;
          color: inherit;
        }

        ::slotted(input[type=button]),
        ::slotted(input[type=submit]) {
          cursor: pointer;
        }

        /* not working */
        ::slotted(input[type="date"]:-webkit-inner-spin-button),
        ::slotted(input[type="date"]:-webkit-calendar-picker-indicator) {
          display: none;
          -webkit-appearance: none;
        }

        ::slotted(input:focus) {
          outline: none;
        }

        button {
            background: transparent;
            border: none;
            padding: 0;
            border-radius: 50%;
            width: 2rem;
            height: 2rem;
            flex-shrink: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }

        button:is(:hover, :focus-visible) {
            outline: 2px solid var(--color-primary);
        }
      </style>
      <slot name="input"></slot>
    `;
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
      if (input.name === 'invoiceDate') {
        input.setAttribute('value', this.formatDate(new Date()));
      }

      if (input.name == 'invoiceDueDate') {
        input.setAttribute('value', this.formatDate(new Date(), 14));
      }
    }
  }

  formatDate(date, due) {
    if (due) {
      date = new Date(date.setDate(date.getDate() + due));
    }
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = month < 10 ? ('0' + month) : month;
    day = day < 10 ? ('0' + day) : day;
    return `${year}-${month}-${day}`;
  }
}

customElements.define('form-field', FormField);
