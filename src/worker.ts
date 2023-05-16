const store = new Map<string, {
  registeredAt: Date,
  item: any
}>();

//            min * sec * msec
const expire = 30 * 60 * 1000;

type CacheEvent = {
  data: [type: string, key: string, item: unknown]
}

(self as any).onconnect = function (event: MessageEvent) {
  const port = event.ports[0];

  port.onmessage = (ev: CacheEvent) => {
    const [
      type,
      key,
      item
    ] = ev.data

    switch(type) {
      case 'get':
        const cached = get(key)
        port.postMessage(cached)
        break;
      case 'save':
        save(key, item)
        break;
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

function save(key: string, item: any) {
  store.set(key, {
    registeredAt: new Date(),
    item
  })
}