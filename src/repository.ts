import * as cache from './cache'

type Res = {
  id: string
  name: string
}

export function fetch(endpoint: string): Promise<Res> | Res {
  const data = cache.get(endpoint)
  if (data !== undefined) {
    return data as Res
  }

  // API Request
  return new Promise(resolve => {
    setTimeout(() => {
      const res = {
        id: 'id:' + endpoint,
        name: 'name: ' + endpoint
      }
      cache.save(endpoint, res)

      resolve(res)
    }, 1000)
  })
}