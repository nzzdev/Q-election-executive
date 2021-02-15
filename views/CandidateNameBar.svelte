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
    <span>{candidate.name || ''}</span>
    {#if candidate.isPrevious}
      <span>*</span>
    {/if}
    {#if candidate.status === 'elected'}
      <!-- checkmark -->
      <svg width="11" height="11" viewBox="0 0 18 18">
        <g fill="none" fill-rule="evenodd" transform="translate(0,2)">
          <path fill="currentColor" d="M0 9l5 5L16 3l-2-2-9 9-3-3z" />
        </g>
      </svg>
    {/if}
    {#if candidate.status === 'not elected' && candidate.isPrevious}
      <!-- crossmark -->
      <svg width="11" height="11" viewBox="0 0 18 18">
        <g fill="none" fill-rule="evenodd" transform="translate(0,2)">
          <path fill="currentColor" d="M6 8l-5 5 2 2 5-5 5 5 2-2-5-5 5-5-2-2-5 5-5-5-2 2 5 5z" />
        </g>
      </svg>
    {/if}
  </div>
  <!-- no party name if it's others group -->
  {#if !isOthers}
    <div class="s-font-note q-election-executive-item-text-party">
      {#if candidate.party !== undefined}{candidate.party || ''}{/if}
    </div>
  {/if}
</div>
