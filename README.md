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
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
Version 0.1.0 - Initial release for ongoing development

Version 0.2.0 - Lots of colors, support for entire Sphero API, and uses Basestar for DRY code

Version 0.3.0 - Use new Basestar proxying and events

## License
Copyright (c) 2013 The Hybrid Group. Licensed under the Apache 2.0 license.
