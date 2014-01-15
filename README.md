# Cylon.js For Sphero

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics and physical computing using Node.js

This module provides an adaptor and driver for the Sphero robot from Orbotix (http://www.gosphero.com/). It uses the Hybrid Group fork of the Spheron module (https://github.com/hybridgroup/spheron) originally created by [@alchemycs](https://github.com/alchemycs)

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

Want to use the Go programming language to power your robots? Check out our sister project Gobot (http://gobot.io).

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon-sphero.png?branch=master)](http://travis-ci.org/hybridgroup/cylon-sphero)

## Getting Started

Install the module with: `npm install cylon-sphero`

## Examples

### JavaScript:
```javascript
var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/rfcomm0' },
  device: {name: 'sphero', driver: 'sphero'},

  work: function(my) {
    every((1).second(), function() { 
      my.sphero.roll(60, Math.floor(Math.random() * 360));
    });
  }
}).start();
```

### CoffeeScript:
```
Cylon = require 'cylon'

Cylon.robot
  connection:
    name: 'sphero', adaptor: 'sphero', port: '/dev/rfcomm0'

  device:
    name: 'sphero', driver: 'sphero'

  work: (my) ->
    every 1.second(), ->
      my.sphero.roll 60, Math.floor(Math.random() * 360)

.start()
```

## Documentation
We're busy adding documentation to our web site at http://cylonjs.com/ please check there as we continue to work on Cylon.js

Thank you!

## Contributing

* All patches must be provided under the Apache 2.0 License
* Please use the -s option in git to "sign off" that the commit is your work and you are providing it under the Apache 2.0 License
* Submit a Github Pull Request to the appropriate branch and ideally discuss the changes with us in IRC.
* We will look at the patch, test it out, and give you feedback.
* Avoid doing minor whitespace changes, renamings, etc. along with merged content. These will be done by the maintainers from time to time but they can complicate merges and should be done seperately.
* Take care to maintain the existing coding style.
* Add unit tests for any new or changed functionality & Lint and test your code using [Grunt](http://gruntjs.com/).
* All pull requests should be "fast forward"
  * If there are commits after yours use “git rebase -i <new_head_branch>”
  * If you have local changes you may need to use “git stash”
  * For git help see [progit](http://git-scm.com/book) which is an awesome (and free) book on git

## Release History

[![NPM](https://nodei.co/npm/cylon-sphero.png?compact=true)](https://nodei.co/npm/cylon-sphero/)

Version 0.6.0 - Update for cylon 0.9.0

Version 0.5.0 - Update to match new Spheron module's callback and for cylon 0.8.0

Version 0.4.0 - Update for cylon 0.7.0

Version 0.3.0 - Use new Basestar proxying and events

Version 0.2.0 - Lots of colors, support for entire Sphero API, and uses Basestar for DRY code

Version 0.1.0 - Initial release for ongoing development

## License
Copyright (c) 2013-2014 The Hybrid Group. Licensed under the Apache 2.0 license.
