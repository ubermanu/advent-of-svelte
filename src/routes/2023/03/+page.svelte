<script>
  /** @type {{ data: { presents: { name: string; weight: number }[] } }} */
  const { data } = $props()

  let presents = $state(data.presents)
  let sleigh = $state(0)
  let max_weight = 100

  /**
   * @param {DragEvent} event
   * @param {presents[0]} present
   */
  function onPresentDragStart(event, present) {
    event.dataTransfer?.setData('present', JSON.stringify(present))
  }

  /** @param {DragEvent} event */
  function onSleighHover(event) {
    event.preventDefault()
  }

  /** @param {DragEvent} event */
  function onSleighDrop(event) {
    event.preventDefault()

    /** @type {presents[0]} */
    const present = JSON.parse(event.dataTransfer?.getData('present') ?? '{}')

    if (sleigh + present.weight > max_weight) {
      console.error(
        'Cannot put the present into the sleigh, it would overflow the max allowed weight'
      )
      return
    }

    sleigh += present.weight
    presents = presents.filter((p) => p.name != present.name)
  }
</script>

<ul class="m-4 flex select-none flex-wrap gap-1.5">
  {#each presents as present}
    <li
      class="cursor-grab rounded bg-neutral-200 p-2 shadow-sm"
      draggable={true}
      ondragstart={(event) => onPresentDragStart(event, present)}
    >
      <span class="block"></span>
      <p>{present.name}</p>
      <p class="text-sm">{present.weight} Kg</p>
    </li>
  {/each}
</ul>

<div
  role="presentation"
  class="mx-auto my-8 max-w-xl select-none rounded border-slate-800 bg-slate-200 p-8 text-center shadow"
  ondrop={onSleighDrop}
  ondragover={onSleighHover}
>
  <div class="mb-2 text-6xl">🛷</div>
  <p>Seigh Weight: {sleigh | 0} Kg</p>
</div>
