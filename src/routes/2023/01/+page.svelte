<script>
  /** @type {{ data: { children: { name: string; tally: number }[] } }} */
  const { data } = $props();

  const children = $state(data.children);

  /** @param {SubmitEvent} event */
  function handleSubmit(event) {
    event.preventDefault();

    if (!(event.target instanceof HTMLFormElement)) {
      return;
    }

    const formData = new FormData(event.target);

    children.unshift({
      name: formData.get("name")?.toString() ?? "",
      tally: parseInt(formData.get("tally")?.toString() ?? ""),
    });
  }
</script>

<form onsubmit={handleSubmit} class="space-y-2 p-4">
  <legend class="text-gray-500">Add a child</legend>
  <div class="field">
    <label for="child-name">Name</label>
    <input id="child-name" type="text" name="name" required />
  </div>
  <div class="field">
    <label for="child-tally">Tally</label>
    <input
      id="child-tally"
      type="number"
      name="tally"
      min="-100"
      max="100"
      step="1"
      required
    />
  </div>
  <button type="submit">Add</button>
</form>

<ul class="space-y-3 p-4">
  {#each children as child}
    <li>
      {child.tally > 0 ? "👼" : "👿"}
      {child.name} ({child.tally})
    </li>
  {/each}
</ul>

<style lang="postcss">
  .field label {
    @apply block;
  }
</style>
