# Cylon.js Module For Sphero

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics and physical computing using node.js

This module provides an interface to the Sphero robot from Orbotix. It uses the Hybrid Group fork of the Spheron module (https://github.com/hybridgroup/spheron) originally created by [@alchemycs](https://github.com/alchemycs)

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon-sphero.png?branch=master)](http://travis-ci.org/hybridgroup/cylon-sphero)

## Getting Started

Install the module with: `npm install cylon-sphero`

## Examples

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

```coffee-script
Cylon = require('cylon')

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
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2013 The Hybrid Group. Licensed under the Apache 2.0 license.
