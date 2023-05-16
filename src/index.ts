import { getAll } from "./cache"
import { fetch } from "./repository"

const input = document.querySelector<HTMLInputElement>('#key')!
const fetchButton = document.querySelector<HTMLButtonElement>('#fetch')!
const output = document.querySelector<HTMLOutputElement>('#output')!
const cached = document.querySelector<HTMLPreElement>('#cached')!

fetchButton.addEventListener('click', async () => {
  const endpoint = `/item/${input.value}`

  const start = performance.now()
  const items = await fetch(endpoint)
  const finish = performance.now()

  output.innerText = JSON.stringify(items, null, 2) + `: ${(finish - start).toFixed(2)}ms`
})


setInterval(async () => {
  const items = await getAll()
  cached.innerText = JSON.stringify(items, null, 2)
}, 500)