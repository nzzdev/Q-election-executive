module.exports = {
  title: "Exekutivwahlen Frankreich",
  sources: [
    {
      text: "some source",
      href: "https://www.nzz.ch",
      validHref: true
    },
    {
      text: "another important source",
      href: "https://www.nzz.ch",
      validHref: true
    }],
  subtitle: "Möglichkeit zusätzliche Informationen als Untertitel zu erfassen",
  notes: "Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens verhaftet.",
  majority: 100000,
    candidates: [
      {
        name: "Hans Wurst",
        party: "CDU",
        color:
        {
          full: {
            colorCode: "#0084c7"
          }
        },
        votes: 110000,
        isPrevious: true,
        status: "elected"
      },
      {
        name: "Maria Müller",
        party: "SPD",
        color:
        {
          full: {
            colorCode: "#c31906"
          }
        },
        votes: 80000,
        isPrevious: true,
        status: "not elected"
      },
      {
        name: "Susann Muster",
        party: "B90/Die Grünen",
        color:
        {
          full: {
            colorCode: "#66a622"
          }
        },
        isPrevious: false,
        votes: 90000,
        status: "not elected"
      },
      {
        name: "Eva Meier",
        party: "Die Linke",
        color:
        {
          full: {
            colorCode: "#a35fd1"
          }
        },
        isPrevious: false,
        votes: 120000,
        status: "elected"
      }
    ]
  }
