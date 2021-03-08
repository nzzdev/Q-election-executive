<script>
  import {formatNumber } from "../helpers/formatNumber";

  export let withErrorMargin;
  export let hasErrorMargin;
  export let candidate;
  export let isPercentage;
</script>

{#if withErrorMargin}
  <div
    class="s-font-note q-election-executive-item-text-votes
    s-font-note--tabularnums">
    {#if hasErrorMargin && candidate.errorMargin}
      {formatNumber(candidate.errorMargin.lower)}–{formatNumber(candidate.errorMargin.upper)}{#if isPercentage}%{/if}
    {:else if candidate.errorMargin}
      {formatNumber(candidate.errorMargin.bestGuess)}
      {#if isPercentage}%{/if}
    {/if}
  </div>
{:else if candidate.votes !== undefined}
  <div
    class="s-font-note q-election-executive-item-text-votes
    s-font-note--tabularnums">
    {formatNumber(candidate.votes)}{#if isPercentage}%{/if}
  </div>
{/if}
