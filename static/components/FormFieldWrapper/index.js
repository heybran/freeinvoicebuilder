export default class FormFieldWrapper extends HTMLElement {
  static get observedAttributes() {
    return ['']
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
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

        ::slotted(input) {
          padding-inline: 0;
          padding-block: var(--padding-input);
          height: 100%;
          background-color: transparent;
          border: none;
          appearance: none;
          width: 100%;
        }

        ::slotted(input:focus) {
          outline: none;
        }
      </style>
      <slot name="input"></slot>
      <slot name="icon"></slot>
    `;
  }
}

customElements.define('form-field-wrapper', FormFieldWrapper);