<script>
  import Header from "./Header.svelte";
  import Legend from "./Legend.svelte";
  import Candidate from "./Candidate.svelte";
  import Footer from "./Footer.svelte";

  export let item;
  export let displayOptions;
  export let toolRuntimeConfig;

  let hideTitle = displayOptions.hideTitle;
  let hideUpdatedDate = item.options && item.options.hideUpdatedDate;
  let maxVotes = getMaxVotes(item);
  let maxErrorMarginValue = getMaxErrorMarginValue(item);
  let titleClassAttribute = hideTitle
    ? "q-election-executive-title--hidden"
    : "";
  let sortedCandidates = getSortedCandidates(item);
  let maxNumber = getMaxNumber(item);
  let candidatesInfo = getCandidatesInfo(sortedCandidates, maxVotes, maxNumber);
  let hasErrorMargin = getHasErrorMargin(item);

  function getMaxVotes(item) {
    const maxResult = Math.max(
      ...item.candidates.map((candidate) =>
        candidate.votes !== undefined ? candidate.votes : 0
      )
    );

    return item.threshold && item.threshold > maxResult
      ? item.threshold
      : maxResult;
  }

  function getMaxErrorMarginValue(item) {
    const maxErrorMarginValue = Math.max(
      ...item.candidates.map((candidate) =>
        candidate.errorMargin && candidate.errorMargin.upper !== undefined
          ? candidate.errorMargin.upper
          : 0
      )
    );
    return item.threshold && item.threshold > maxErrorMarginValue
      ? item.threshold
      : maxErrorMarginValue;
  }

  function getSortedCandidates(item) {
    if (item.candidates) {
      if (item.withErrorMargin) {
        return item.candidates.sort(function (candidateA, candidateB) {
          // if both have no errorMargin set, keep the order
          if (
            candidateA.errorMargin === undefined &&
            candidateB.errorMargin === undefined
          ) {
            return 0;
          } // if only A has no errorMargin, sort B before A
          if (
            candidateA.errorMargin === undefined &&
            candidateB.errorMargin !== undefined
          ) {
            return 1;
          }
          // if only A has no bestGuess or B bestGuess is higher than A, sort B before A
          if (
            (candidateA.errorMargin.bestGuess === undefined &&
              candidateB.errorMargin.bestGuess !== undefined) ||
            candidateA.errorMargin.bestGuess < candidateB.errorMargin.bestGuess
          ) {
            return 1;
          }
          // otherwise sort A before B
          return -1;
        });
      } else {
        return item.candidates.sort(function (candidateA, candidateB) {
          // Sort elected candidates before sorting by vote count
          if (
            candidateA.status !== "elected" &&
            candidateB.status === "elected"
          ) {
            return 1;
          }
          if (
            candidateA.status === "elected" &&
            candidateB.status !== "elected"
          ) {
            return -1;
          }
          if (
            (candidateA.votes === undefined &&
              candidateB.votes === undefined) ||
            candidateA.votes === candidateB.votes
          ) {
            return 0;
          }
          if (
            (candidateA.votes === undefined &&
              candidateB.votes !== undefined) ||
            candidateA.votes < candidateB.votes
          ) {
            return 1;
          }
          return -1;
        });
      }
    }
    return [];
  }

  function getMaxNumber(item) {
    let maxNumber;
    if (item.withErrorMargin) {
      maxNumber = maxErrorMarginValue;
    } else {
      maxNumber = maxVotes;
    }
    // if the majority is higher than maxErrorMarginValue or maxVotes, it is the highest number
    if (
      item.majority !== undefined &&
      (item.majority > maxNumber || Number.isNaN(maxNumber))
    ) {
      maxNumber = item.majority;
    }
    return maxNumber;
  }

  function getCandidatesInfo(sortedCandidates, maxVotes, maxNumber) {
    // enhance candidates object with additional information
    let isPrevious = false;
    let isElected = false;
    let isDropped = false;
    let isImagePresent = false;
    let hasVotes = maxVotes > 0;
    let forceEnableCandidate = false;

    if (toolRuntimeConfig) {
      if (typeof toolRuntimeConfig.forceEnableCandidate === "boolean") {
        forceEnableCandidate = toolRuntimeConfig.forceEnableCandidate;
      }
    }

    sortedCandidates.forEach((candidate) => {
      if (
        candidate.picture !== undefined &&
        candidate.picture.url !== undefined
      ) {
        isImagePresent = true;
      }
      // define width and color of each candidate's bar
      let width = "1px";
      let colorStyle = "";
      let colorClass = "";
      const defaultColor = "s-viz-color-one-5";

      // the width is only used later if we do not have withErrorMargin
      if (hasVotes && candidate.votes && candidate.votes > 0) {
        const widthPercentage = ((candidate.votes * 100) / maxNumber).toFixed(
          2
        );
        width = widthPercentage + "%";
      }
      candidate.width = width;

      candidate.isEnable =
        forceEnableCandidate === true ||
        candidate.status === "elected" ||
        candidate.status === "undefined";

      if (candidate.color) {
        if (candidate.color.classAttribute) {
          colorClass = candidate.color.classAttribute;
        } else if (candidate.color.colorCode) {
          colorStyle = "color: " + candidate.color.colorCode + ";";
        }
      }

      if (!colorClass && !colorStyle) {
        colorClass = defaultColor;
      }

      candidate.colorClass = colorClass;
      candidate.colorStyle = colorStyle;
      // check if we have previous, elected or dropped candidates for footer info
      if (candidate.isPrevious) {
        isPrevious = true;
        if (candidate.status === "not elected") {
          isDropped = true;
        }
      }
      if (candidate.status === "elected") {
        isElected = true;
      }
    });

    // define info object which contains general information and sorted candidates
    const candidatesInfo = {
      hasVotes: hasVotes,
      maxNumber: maxNumber,
      isPrevious: isPrevious,
      isElected: isElected,
      isDropped: isDropped,
      isImagePresent: isImagePresent,
      sortedCandidates: sortedCandidates,
    };

    // process the group of other candidates differently - not part of the majority
    let othersIndex = sortedCandidates.findIndex((candidate) => {
      let othersPattern =
        /((.*(A|a)ndere$)|(.*Andere(r)?\s.*)|(.*(S|s)onstig.*))/;
      return othersPattern.test(candidate.name);
    });
    if (othersIndex >= 0) {
      let others = sortedCandidates.splice(othersIndex, 1);
      candidatesInfo.others = others[0];
      candidatesInfo.hasOthers = true;
    }

    return candidatesInfo;
  }

  function getHasErrorMargin(item) {
    return item.candidates.some((candidate) => {
      return (
        candidate.errorMargin &&
        candidate.errorMargin.lower !== undefined &&
        candidate.errorMargin.upper !== undefined
      );
    });
  }
</script>

<div class="s-q-item q-election-executive" style="opacity: 0;">
  <Header title={item.title} subtitle={item.subtitle} {hideTitle} />
  <Legend
    {candidatesInfo}
    withErrorMargin={item.withErrorMargin}
    {hasErrorMargin}
    errorMarginLabels={item.errorMarginLabels}
  />

  <div class="q-election-executive-container">
    <div class="q-election-executive-candidates">
      {#each candidatesInfo.sortedCandidates as candidate, index}
        <Candidate
          {candidate}
          isPercentage={item.isPercentage}
          isImagePresent={candidatesInfo.isImagePresent}
          isLastCandidate={index === candidatesInfo.sortedCandidates.length - 1}
          majority={item.majority}
          {maxNumber}
          withErrorMargin={item.withErrorMargin}
          {maxErrorMarginValue}
        />
        {#if item.availableSeats === index + 1}
          <div class="q-election-executive-available-seats s-color-gray-5">
            <div
              class="s-font-note-s q-election-executive-available-seats-text"
            >
              Verfügbare Sitze: <span class="s-font-note--tabularnums"
                >{item.availableSeats}</span
              >
            </div>
          </div>
        {/if}
      {/each}
    </div>
    {#if candidatesInfo.others}
      <div class="q-election-executive-others">
        <Candidate
          candidate={candidatesInfo.others}
          isPercentage={item.isPercentage}
          isImagePresent={candidatesInfo.isImagePresent}
          isOthers="true"
          majority={item.majority}
          {maxErrorMarginValue}
          {maxNumber}
        />
      </div>
    {/if}
  </div>

  <Footer
    majority={item.majority}
    sources={item.sources}
    notes={item.notes}
    updatedDate={item.updatedDate}
    {hideUpdatedDate}
  />
</div>
