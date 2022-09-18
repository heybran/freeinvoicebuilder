import sheet from './styles.css' assert { type: 'css' };


export default class FormField extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <slot name="input"></slot>
      <slot name="icon"></slot>
    `;
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }
}

customElements.define('form-field', FormField);