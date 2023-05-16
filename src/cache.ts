const shared = new SharedWorker('worker.ts')
type Endpoint = string

export function get<T>(endpoint: Endpoint): Promise<T | undefined> {
  return new Promise((resolve) => {
    shared.port.onmessage = e => {
      resolve(e.data)
    }
    
    shared.port.postMessage([
      'get',
      endpoint,
      undefined
    ])
  })
}

export function getAll(): Promise<unknown | undefined> {
  return new Promise((resolve) => {
    shared.port.onmessage = e => {
      resolve(e.data)
    }

    shared.port.postMessage([
      'get_all',
    ])
  })
}

export function save<T>(endpoint: Endpoint, data: T) {
  shared.port.postMessage([
    'save',
    endpoint,
    data
  ])
}

export function clear() {
  shared.port.postMessage([
    'clear'
  ])
}