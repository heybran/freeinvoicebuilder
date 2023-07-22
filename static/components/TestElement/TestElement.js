import ObserverElement from "../ObserverElement/ObserverElement.js"
import TestChild from './TestChild.js';

export default class TestElement extends ObserverElement {
  constructor() {
    super()
    this.state = {
      name: 'brandon',
      age: 32
    }

    this.observer = this.observe(this.state)
  }

  connectedCallback() {
    this.innerHTML = `
      <h1>${this.state.name}</h1>
      <button>Get older!</button>
      <output>${this.state.age}</output>
    `

    this.querySelector('button').onclick = () => this.state.age ++
    this.observer.addStateChangeListener(this.update.bind(this))
  }

  update(state) {
    console.log(this)
    this.querySelector('output').textContent = state.age;
  }
}

customElements.define('test-element', TestElement)