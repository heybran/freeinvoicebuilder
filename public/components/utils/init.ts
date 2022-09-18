export default function ensure(component, fun) {
  if (!fun.includes('(')) {
    return `window['${component.localName}'].${fun}()`;
  } else {
    return `window['${component.localName}'].${fun}`;
  }
}