<script>
  import VoteResult from "./VoteResult.svelte";

  export let isOthers;
  export let majority;
  export let withErrorMargin;
  export let hasErrorMargin;
  export let candidate;
  export let isPercentage;
</script>

<div class="q-election-executive-item-text-candidate" style="{!isOthers && candidate.party ? 'flex-direction: column;' : 'flex-direction: row;'}">
  <!-- if no majority, add space on top of others group which is as high as party name -->
  {#if isOthers && majority === undefined}
    <div class="s-font-note q-election-executive-item-others-spacer" />
  {/if}
  <div class="q-election-executive-item-text-name-container s-font-note s-font-note--strong">
    <div class="q-election-executive-item-text-name">{candidate.name || ''}
    </div>
    {#if candidate.isPrevious}
      <span class="q-election-executive-item-text-asterisk">*</span>
    {/if}
    {#if candidate.status === 'elected'}
      <!-- checkmark -->
      <div class="q-election-executive-item-text-icon-container">
        <svg class="q-election-executive-item-text-icon" viewBox="0 1 16 13">
          <g fill="none" fill-rule="evenodd">
            <path fill="currentColor" d="M0 9l5 5L16 3l-2-2-9 9-3-3z" />
          </g>
        </svg>
      </div>
    {/if}
    {#if candidate.status === 'not elected' && candidate.isPrevious}
      <!-- crossmark -->
      <div class="q-election-executive-item-text-icon-container">
        <svg class="q-election-executive-item-text-icon" viewBox="1 1 14 14">
          <g fill="none" fill-rule="evenodd">
            <path fill="currentColor" d="M6 8l-5 5 2 2 5-5 5 5 2-2-5-5 5-5-2-2-5 5-5-5-2 2 5 5z" />
          </g>
        </svg>
      </div>
    {/if}
  </div>
  <div class="q-election-executive-item-text-information">
  <!-- no party name if it's others group -->
  {#if !isOthers && candidate.party}
    <div class="s-font-note q-election-executive-item-text-party">
      {candidate.party}
    </div>
  {/if}
  <VoteResult {withErrorMargin} {hasErrorMargin} {candidate} {isPercentage} />
  </div>
</div>
