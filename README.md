# Q Election Executive [![Build Status](https://travis-ci.com/nzzdev/Q-election-executive.svg?branch=dev)](https://travis-ci.com/nzzdev/Q-election-executive) [![Greenkeeper badge](https://badges.greenkeeper.io/nzzdev/Q-election-executive.svg)](https://greenkeeper.io/)

**Maintainer**: [benib](https://github.com/benib)

Q election executive is one tool of the Q toolbox to display results of executive elections. Test it in the [demo](https://editor.q.tools/).

## Table of contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Development](#development)
- [Testing](#testing)
- [Features](#features)
- [Options](#options)
- [License](#license)

## Installation
```
$ git clone git@github.com:nzzdev/Q-table.git
$ npm install
$ npm run build
```

[to the top](#table-of-contents)

## Configuration
The following environment variables must be specified when starting the tool:

- `IMAGE_SERVICE_URL`

Please have a look at the test environment for examples on what this variables should look like.

## Development
Install the Q cli and start the Q dev server:
```
$ Q server
```

To run the tool create a new file called `dev.js` and use the env-variable listed above with the local urls.
```
process.env.IMAGE_SERVICE_URL = "https://q-images.nzz.ch/{key}?width=108&format=png&auto=webp";
require('./index.js');
``` 
You can then start the tool with:
```
$ node dev.js
```

[to the top](#table-of-contents)

## Testing 
The testing framework used in this repository is [Code](https://github.com/hapijs/code).

Run the tests:
```
$ npm run test
```

### Implementing a new test
When changing or implementing...

- A `route`, it needs to be tested in the `e2e-tests.js` file
- Something on the frontend, it needs to be tested in the `dom-tests.js` file

[to the top](#table-of-contents)

##  Tool implentation details
If a tool then it can use this reference to the Q-server documentation about Q-tools:

The tool structure follows the general structure of each Q tool. Further information can be found in [Q server documentation - Developing tools](https://nzzdev.github.io/Q-server/developing-tools.html).

[to the top](#table-of-contents)


## Features

Here is what the tool looks like on mobile and other devices. The example shows survey results of the presidential elections in France in 2017. It's in German because we do not have multilanguage support (yet).

<img src="/doc/exec_desk.png">
<img src="/doc/exec_mob.png">

Each graphic has the following three sections:

* Header: contains specified title, subtitle and legend
* Main Part: displays results for each candidate. Optionally candidate pictures are shown on the left. As soon as the results are final a checkmark for elected candidates or a crossmark for voted off candidates are displayed. Additionally all candidates who have not been elected have b/w pictures and a less saturated color bar. If applicable a majority line will be shown.
* Footer: contains further notes (e.g. how many municipalities already finished counting), source(s) and update information

Here is a completely fictional example to show you the different states (currently part of the government, elected, voted off) and the majority line:
<img src="/doc/exec_features.png">

[to the top](#table-of-contents)

## Options

### Hide updated date
<img src="/doc/hideUpdatedDate.png" align="right" width=300 height=355>
This option will hide the date shown in the footer when it's updated. 

[to the top](#table-of-contents)

## License

Copyright (c) 2019 Neue Zürcher Zeitung. All rights reserved.