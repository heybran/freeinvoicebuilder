const randomId = () => {
  return Math.random().toString(36).substring(2, 8);
}

export default class BaseElement extends HTMLElement {
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // componentId = randomId();
    this.componentId = randomId();
    this.refName = this.localName + '-' + this.componentId;
    if (typeof window.components !== 'object') {
      window.components = {};
    }
    Object.defineProperty(window.components, this.refName, {
      value: this,
      writable: false,
      // false by default, change to true,
      // so we can delete it in disconectedCallback()
      configurable: true, 
    });
  }

  run(fun) {
    const tail = !fun.includes('(') ? '()' : '';
    return `window.components['${this.refName}'].${fun}${tail}`;
  } 

  disconnectedCallback() {
    delete window.components[`${this.refName}`];
  }
}