<script>
  export let isOthers;
  export let majority;
  export let candidate;
</script>

<div class="q-election-executive-item-text-candidate">
  <!-- if no majority, add space on top of others group which is as high as party name -->
  {#if isOthers && majority === undefined}
    <div class="s-font-note q-election-executive-item-others-spacer" />
  {/if}
  <div class="q-election-executive-item-text-name s-font-note s-font-note--strong">
    {#if candidate.status === 'elected'}
      <!-- checkmark -->
      <svg
        viewBox="0 0 16 16"
        width="14"
        height="14"
        xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fill-rule="evenodd">
          <path fill="currentColor" d="M0 9l5 5L16 3l-2-2-9 9-3-3z" />
        </g>
      </svg>
    {/if}
    {#if candidate.status === 'not elected' && candidate.isPrevious}
      <!-- crossmark -->
      <svg
        viewBox="0 0 16 16"
        width="14"
        height="14"
        xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fill-rule="evenodd">
          <path
            fill="currentColor"
            d="M6 8l-5 5 2 2 5-5 5 5 2-2-5-5 5-5-2-2-5 5-5-5-2 2 5 5z" />
        </g>
      </svg>
    {/if}
     {candidate.name || ''}
    {#if candidate.isPrevious}
      <span>*</span>
    {/if}
  </div>
  <!-- no party name if it's others group -->
  {#if !isOthers}
    <div class="s-font-note q-election-executive-item-text-party">
      {#if candidate.party !== undefined}{candidate.party || ''}{/if}
    </div>
  {/if}
</div>
