import sheet from './index.css' assert { type: 'css' };

export default class FormFieldWrapper extends HTMLElement {
  static get observedAttributes() {
    return ['']
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <slot name="input"></slot>
      <slot name="icon"></slot>
    `;
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    
  }
}

customElements.define('form-field-wrapper', FormFieldWrapper);