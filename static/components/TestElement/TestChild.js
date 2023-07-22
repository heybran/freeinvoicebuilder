import ObserverElement from "../ObserverElement/ObserverElement.js"

export default class TestChild extends ObserverElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = `
      <output></output>
    `
  }
}

customElements.define('test-child', TestChild)