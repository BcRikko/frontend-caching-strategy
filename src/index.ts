import { fetch } from "./repository"

const fetchButton = document.querySelector<HTMLButtonElement>('#fetch')!
const output = document.querySelector<HTMLOutputElement>('#output')!
const cached = document.querySelector<HTMLPreElement>('#cached')!

fetchButton.addEventListener('click', async () => {
  const start = performance.now()
  const items = await fetch('/item/001')
  const finish = performance.now()

  output.innerText = JSON.stringify(items, null, 2) + `: ${(finish - start).toFixed(2)}ms`
})