<script>
  export let candidatesInfo;
  export let withErrorMargin;
  export let hasErrorMargin;
  export let errorMarginLabels;
</script>

<div class="s-legend-icon-label">
  {#if candidatesInfo.isPrevious}
    <div class="s-legend-item-label__item">
      <div class="s-legend-item-label__item__icon s-legend-item-label__item__icon--text">*</div><div class="s-legend-item-label__item__label">bisher im Amt</div>
    </div>
  {/if}
  {#if candidatesInfo.isElected}
    <div class="s-legend-item-label__item">
      <div
        class="s-legend-item-label__item__icon
        s-legend-item-label__item__icon--text">
        <!-- checkmark -->
        <svg
          viewBox="0 0 16 16"
          width="10"
          height="10"
          xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fill-rule="evenodd">
            <path fill="currentColor" d="M0 9l5 5L16 3l-2-2-9 9-3-3z" />
          </g>
        </svg>
      </div>
      <div class="s-legend-item-label__item__label">gewählt</div>
    </div>
  {/if}
  {#if candidatesInfo.isDropped}
    <div class="s-legend-item-label__item">
      <div
        class="s-legend-item-label__item__icon
        s-legend-item-label__item__icon--text">
        <!-- crossmark -->
        <svg
          viewBox="0 0 16 16"
          width="10"
          height="10"
          xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fill-rule="evenodd">
            <path
              fill="currentColor"
              d="M6 8l-5 5 2 2 5-5 5 5 2-2-5-5 5-5-2-2-5 5-5-5-2 2 5 5z" />
          </g>
        </svg>
      </div>
      <div class="s-legend-item-label__item__label">abgewählt</div>
    </div>
  {/if}
  {#if withErrorMargin && errorMarginLabels}
    <div class="s-legend-item-label__item">
      <div
        class="s-legend-item-label__item__icon
        s-legend-item-label__item__icon--default s-viz-color-party-default-5" />
      <div class="s-legend-item-label__item__label">
         {errorMarginLabels.bestGuessLabel}
      </div>
    </div>
  {/if}
  {#if withErrorMargin && hasErrorMargin && errorMarginLabels}
    <div class="s-legend-item-label__item">
      <div class="s-legend-item-label__item__icon">
        <div
          class="q-election-executive-error-margin-legend-symbol-margin
          s-color-gray-5" />
      </div>
      <div class="s-legend-item-label__item__label">
         {errorMarginLabels.errorMarginLabel}
      </div>
    </div>
  {/if}
</div>
