<script>
  import {formatNumber } from "../helpers/formatNumber";
  import CandidateNameBar from "./CandidateNameBar.svelte";
  import MajorityArrow from "./MajorityArrow.svelte";

  export let candidate;
  export let isPercentage;
  export let isImagePresent;
  export let isLastCandidate;
  export let isOthers;
  export let majority;
  export let maxNumber;
  export let withErrorMargin;
  export let maxErrorMarginValue;

  let hasErrorMargin =
    candidate.errorMargin &&
    candidate.errorMargin.lower !== undefined &&
    candidate.errorMargin.upper !== undefined;
  let coloredSlimBarWidthPercentage = getColoredSlimBarWidthPercentage(
    hasErrorMargin,
    maxNumber,
    candidate
  );
  let errorMarginLeftPercentage = getErrorMarginLeftPercentage(
    maxNumber,
    candidate
  );
  let errorMarginBarWidthPercentage = getErrorMarginBarWidthPercentage(
    maxNumber,
    candidate
  );
  let dotPositionLeftPercentage = getDotPositionLeftPercentage(
    maxNumber,
    candidate
  );

  function getColoredSlimBarWidthPercentage(
    hasErrorMargin,
    maxNumber,
    candidate
  ) {
    if (hasErrorMargin) {
      if (
        maxNumber === undefined ||
        !candidate.errorMargin ||
        candidate.errorMargin.lower === undefined
      ) {
        return 0;
      }
      return ((candidate.errorMargin.lower / maxNumber) * 100).toFixed(2);
    } else {
      if (
        maxNumber === undefined ||
        !candidate.errorMargin ||
        candidate.errorMargin.bestGuess === undefined
      ) {
        return 0;
      }
      return ((candidate.errorMargin.bestGuess / maxNumber) * 100).toFixed(2);
    }
  }

  function getErrorMarginLeftPercentage(maxNumber, candidate) {
    if (
      maxNumber === undefined ||
      !candidate.errorMargin ||
      candidate.errorMargin.lower === undefined
    ) {
      return 0;
    }
    return ((candidate.errorMargin.lower / maxNumber) * 100).toFixed(2);
  }

  function getDotPositionLeftPercentage(maxNumber, candidate) {
    if (
      maxNumber === undefined ||
      !candidate.errorMargin ||
      candidate.errorMargin.bestGuess === undefined
    ) {
      return 0;
    }
    return ((candidate.errorMargin.bestGuess / maxNumber) * 100).toFixed(2);
  }

  function getErrorMarginBarWidthPercentage(maxNumber, candidate) {
    if (
      maxNumber === undefined ||
      !candidate.errorMargin ||
      candidate.errorMargin.lower === undefined ||
      !candidate.errorMargin.upper === undefined
    ) {
      return 0;
    }
    return (
      (candidate.errorMargin.upper / maxNumber) * 100 -
      (candidate.errorMargin.lower / maxNumber) * 100
    ).toFixed(2);
  }
</script>

<div class="q-election-executive-item">
  {#if isImagePresent}
    <div
      class:q-election-executive-item-disabled={!candidate.isEnable}
      class="q-election-executive-item-image">
      {#if candidate.picture && candidate.picture.url}
        <img src={candidate.picture.url} alt={candidate.name} />
      {/if}
    </div>
  {/if}
  <div
    class="q-election-executive-item-group {isImagePresent === false ? 'q-election-executive-item-group--no-images' : ''}">
    <div class="q-election-executive-item-group-content">
      <div
        class:q-election-executive-item-disabled={!candidate.isEnable}
        class="q-election-executive-item-text">
        <CandidateNameBar {candidate} {isOthers} {majority} {withErrorMargin} {hasErrorMargin} {isPercentage} />
      </div>
      {#if withErrorMargin}
        <div class="q-election-executive-item-error-margin-bar">
          <div
            class="q-election-executive-item-bar-color
            q-election-executive-item-bar-color--fullwidth
            q-election-executive-item-bar-color--slim s-color-gray-3" />
          <div
            class="q-election-executive-item-bar-color
            q-election-executive-item-bar-color--slim {candidate.colorClass}"
            style="width: {coloredSlimBarWidthPercentage}%; {candidate.colorStyle}" />
          {#if hasErrorMargin}
            <div
              class="q-election-executive-item-bar-color
              q-election-executive-item-bar-color--error-margin {candidate.colorClass}"
              style="left: {errorMarginLeftPercentage}%; width: {errorMarginBarWidthPercentage}%;
              {candidate.colorStyle}" />
          {/if}
          <div
            class="q-election-executive-item-dot-color {candidate.colorClass}"
            style="left: {dotPositionLeftPercentage}%; {candidate.colorStyle}" />
        </div>
      {:else}
        <div
          class:q-election-executive-item-disabled={!candidate.isEnable}
          class="q-election-executive-item-bar s-color-gray-3">
          <div
            class="q-election-executive-item-bar-color {candidate.colorClass}"
            style="{candidate.colorStyle} width: {candidate.width};" />
        </div>
      {/if}
      {#if !isLastCandidate && majority && !isOthers}
        <div
          class="q-election-executive-majority s-color-gray-5"
          style="left: calc({((majority * 100) / maxNumber).toFixed(2)}% - 1px);" />
      {/if}
      {#if isLastCandidate && majority}
        <MajorityArrow {maxNumber} {majority} {isPercentage} />
      {/if}
    </div>
  </div>
</div>
