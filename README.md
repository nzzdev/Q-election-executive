# Q Election Executive

Q election executive is one tool of the Q toolbox to display results of executive elections.

## Example
Here is what the tool looks like on mobile and other devices. The example shows survey results of the presidential elections in France in 2017. It's in German because we do not have multilanguage support (yet).

![Election results as shown on other devices](https://github.com/nzzdev/Q-election-executive/blob/feat-readme/readme-images/exec_desk.png)
![Election results as shown on mobile](https://github.com/nzzdev/Q-election-executive/blob/feat-readme/readme-images/exec_mob.png)

Each graphic has the following three sections:
- Header: contains specified title and subtitle
- Main Part: displays results for each candidate. Optionally candidate pictures are shown on the left. As soon as the results are final a checkmark for elected candidates or a crossmark for voted off candidates are displayed. Additionally all candidates who have not been elected have b/w pictures and a less saturated color bar. If applicable a majority line will be shown.
- Footer: contains a legend, further notes (e.g. how many municipalities already finished counting), source(s) and update information

Here is a completely fictional example to show you the different states (currently part of the government, elected, voted off) and the majority line:

![Fictional election results showing all features](https://github.com/nzzdev/Q-election-executive/blob/feat-readme/readme-images/exec_features.png)

## Implementation details
The tool structure follows the general structure of each Q tool. Further information can be found in [Q server documentation - Developing tools](https://nzzdev.github.io/Q-server/developing-tools.html).

