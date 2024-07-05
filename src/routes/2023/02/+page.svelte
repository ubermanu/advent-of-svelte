<script>
  let counter = $state(0)

  const santas = {
    0: '🎅🏿',
    2: '🎅🏾',
    4: '🎅🏽',
    8: '🎅🏼',
    16: '🎅🏻',
    32: '🎅',
  }

  const santa = $derived(
    Object.entries(santas).findLast((s) => +s[0] < counter)?.[1] ?? santas[0]
  )
</script>

<div
  class="container m-3 flex min-h-screen flex-col items-center justify-center gap-y-4"
>
  <div class="text-9xl text-blue-200">
    {santa}
  </div>

  <button
    class="flex text-7xl transition-all active:-translate-y-4"
    onclick={() => (counter += 1)}>🍪</button
  >

  <p class="text-2xl">
    <span class="font-bold">{counter}</span> cookies munched
  </p>
</div>
