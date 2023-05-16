type Data = {
  registeredAt: Date
  data: unknown
}

type Endpoint = string

const store = new Map<Endpoint, Data>()

//             min * sec * msec
const expire: Readonly<number> = 30  * 60  * 1000

export function get<T>(endpoint: Endpoint): T | undefined {
  if (store.has(endpoint)) {
    const isExpired = (Date.now() - store.get(endpoint)!.registeredAt.getTime()) > expire
    if (isExpired === false) {
      return store.get(endpoint)!.data as T
    }
  }
}

export function save<T>(endpoint: Endpoint, data: T) {
  store.set(endpoint, {
    registeredAt: new Date(),
    data
  })
}