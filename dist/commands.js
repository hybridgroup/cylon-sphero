/*
 * cylon sphero commands
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var namespace;

  namespace = require('node-namespace');

  namespace("Cylon.Sphero", function() {
    return this.Commands = ['abortMacro', 'abortOrbBasicProgram', 'appendMacroChunck', 'appendOrbBasicFragment', 'configureCollisionDetection', 'configureLocator', 'detectCollisions', 'eraseOrbBasicStorage', 'executeOrbBasicProgram', 'getApplicationConfigurationBlock', 'getConfigurationBlock', 'getDeviceMode', 'getMacroStatus', 'getPermanentOptionFlags', 'getRGB', 'getTemporaryOptionFlags', 'reInitializeMacroExecutive', 'readLocator', 'roll', 'runMacro', 'saveMacro', 'saveTemporaryMacro', 'selfLevel', 'setAccelerometerRange', 'setApplicationConfigurationBlock', 'setBackLED', 'setBoostWithTime', 'setColor', 'setConfigurationBlock', 'setDataStreaming', 'setDeviceMode', 'setHeading', 'setMacroParameter', 'setMotionTimeout', 'setPermanentOptionFlags', 'setRGB', 'setRandomColor', 'setRawMotorValues', 'setRotationRate', 'setStabalisation', 'setTemporaryOptionFlags', 'stop', 'submitValueToInputStatement'];
  });

}).call(this);
