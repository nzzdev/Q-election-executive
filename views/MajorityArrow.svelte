<script>
  import CandidateNameBar from "./CandidateNameBar.svelte";

  export let maxNumber;
  export let majority;
  export let isPercentage;
  let majorityTextAlignClass = getMajorityTextAlignClass(maxNumber, majority);
  let arrowOffset = getArrowOffset(maxNumber, majority);
  let majorityTextType = isPercentage ? "Prozent" : "Stimmen";
  let textPadding = getTextPadding(
    majorityTextAlignClass,
    majority,
    maxNumber,
    arrowOffset
  );

  function getMajorityTextAlignClass(maxNumber, majority) {
    if (maxNumber === 0 || (majority * 100) / maxNumber > 50) {
      return "right";
    } else {
      return "left";
    }
  }
  function getArrowOffset(maxNumber, majority) {
    if ((majority * 100) / maxNumber === 100) {
      return "7";
    } else {
      return "4";
    }
  }
  function getTextPadding(
    majorityTextAlignClass,
    majority,
    maxNumber,
    arrowOffset
  ) {
    if (majorityTextAlignClass === "left") {
      return `padding-left: calc(${((majority * 100) / maxNumber).toFixed(
        2
      )}% + ${arrowOffset}px + 10px)`;
    } else {
      return `padding-right: calc(${100 %
        -((majority * 100) / maxNumber).toFixed(
          2
        )}% + ${arrowOffset}px + 10px)`;
    }
  }
</script>

<div class="q-election-executive-majority-group">
  <!-- majority arrow -->
  <svg
    class="q-election-executive-majority-arrow s-color-gray-5"
    style="left: calc({((majority * 100) / maxNumber).toFixed(2)}% - {arrowOffset}px);"
    viewBox="0 0 7 35"
    xmlns="http://www.w3.org/2000/svg"
    width="7"
    height="35">
    <path
      d="M4 5v30H3V5H0l3.5-5L7 5H4z"
      fill="currentColor"
      fill-rule="evenodd" />
  </svg>
  <div
    class="q-election-executive-majority-text
    q-election-executive-majority-text--{majorityTextAlignClass} s-font-note-s"
    style={textPadding}>
    <div>Absolutes Mehr</div>
    <!-- insert a space after each three digits -->
    <div>
       <span class="s-font-note--tabularnums">{majority.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</span> {majorityTextType}
    </div>
  </div>
</div>
