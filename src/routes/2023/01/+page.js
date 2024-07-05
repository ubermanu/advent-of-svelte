/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const res = await fetch(
    'https://advent.sveltesociety.dev/data/2023/day-one.json'
  )
  return {
    children: await res.json(),
  }
}
