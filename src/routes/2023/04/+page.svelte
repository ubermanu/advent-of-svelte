<script>
  import { onMount } from 'svelte'

  /** @returns {Promise<number>} */
  async function heartbeat() {
    const res = await fetch(
      'https://advent.sveltesociety.dev/data/2023/day-four.json'
    )
    return (await res.json()).heartRate
  }

  /** @type {number[]} */
  let ticks = $state([])

  onMount(async () => {
    ticks.push(await heartbeat())

    setInterval(async () => {
      ticks.push(await heartbeat())
    }, 1000)
  })

  const max_ticks = 10

  $effect(() => {
    if (ticks.length > max_ticks) {
      ticks.shift()
    }
  })

  const space_between = 20

  const width = max_ticks * space_between
  const height = 300
</script>

<svg
  {width}
  {height}
  viewBox="0 0 {width} {height}"
  class="rounded border bg-neutral-900"
>
  <g>
    {#each ticks as tick, i}
      {#if i + 1 < ticks.length}
        <line
          x1={i * space_between}
          y1={tick * 5 - 100}
          x2={(i + 1) * space_between}
          y2={ticks[i + 1] * 5 - 100}
          stroke-width="3"
          stroke="limegreen"
        />
      {/if}
    {/each}
  </g>
</svg>
