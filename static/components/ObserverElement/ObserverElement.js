const equalDeep = (x, y) => JSON.stringify(x) === JSON.stringify(y)
const cloneDeep = (x) => JSON.parse(JSON.stringify(x))
const freeze = (state) => Object.freeze(cloneDeep(state))

const _handler = {
  set(target, property, value) {
    // https://johnlindquist.com/use-reflect-apis-with-proxy-handlers/
    const updateDone = Reflect.set(target, property, value)

    if (!updateDone) {
      console.log(`You're trying to add "${property}" to a sealed Object`)
    }

    return true
  },
}

const _observe = (initialState) => {
  const listeners = []
  const proxy = new Proxy(cloneDeep(initialState), _handler)
  
  proxy.addStateChangeListener = (callback) => {
    listeners.push(callback)
    callback(freeze(proxy))
    return () => listeners.filter(fn => fn !== callback)
  }

  return proxy
}

export default class ObserverElement extends HTMLElement {
  get state() {
    return this._state
  }

  set state(value) {
    this._state = value
  }

  observe(state) {
    return _observe(state)
  }

  constructor() {
    super()
  }
}