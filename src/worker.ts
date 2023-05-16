const store = new Map<string, {
  registeredAt: Date,
  item: any
}>();

//            min * sec * msec
const expire = 30 * 60 * 1000;

type EventType = 'get' | 'get_all' | 'save' | 'clear'

type CacheEvent = {
  data: GetEvent | GetAllEvent | SaveEvent | ClearEvent
}

type GetEvent = [type: 'get', key: string]
type GetAllEvent = [type: 'get_all']
type SaveEvent = [type: 'save', key: string, item: unknown]
type ClearEvent = [type: 'clear', key: string]

(self as any).onconnect = function (event: MessageEvent) {
  const port = event.ports[0];

  port.onmessage = (ev: CacheEvent) => {
    const [
      type
    ] = ev.data

    switch (type) {
      case 'get': {
        const [_, key] = ev.data
        const cached = get(key)
        port.postMessage(cached)
        break;
      }
      case 'get_all': {
        const cached = getAll()
        port.postMessage(cached)
        break;
      }
      case 'save': {
        const [_, key, item] = ev.data
        save(key, item)
        break;
      }
      case 'clear': {
        clear()
        break
      }
    }
  }
}

function get(key: string) {
  if (store.has(key) === false) {
    return
  }
  const isExpired = (Date.now() - store.get(key)!.registeredAt.getTime()) > expire
  if (isExpired) {
    return
  }

  return store.get(key)!.item
}

function getAll() {
  return Array.from(store.values())
}

function save(key: string, item: any) {
  store.set(key, {
    registeredAt: new Date(),
    item
  })
}

function clear() {
  store.clear()
}