<script>
  export let title;
  export let subtitle;
  export let hideTitle;
</script>

{#if hideTitle !== true}
  <h3 class="s-q-item__title">{title}</h3>
{/if}
{#if subtitle}
  <div class="s-q-item__subtitle"> {subtitle} </div>
{/if}
