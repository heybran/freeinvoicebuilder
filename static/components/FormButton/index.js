import BaseElement from '../BaseElement/BaseElement.js';

export default class FormButton extends BaseElement {
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

        ::slotted(button) {
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

        ::slotted([type=button]),
        ::slotted([type=submit]) {
          cursor: pointer;
        }

        ::slotted(button:focus) {
          outline: none;
        }

        :host([has-loader]) ::slotted(button) {
          display: grid;
        }

        :host([has-loader])  .button-loader {
          grid-area: 1 / 1 / 1 / 1;
        }
      </style>
      <slot name="button"></slot>
    `;
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