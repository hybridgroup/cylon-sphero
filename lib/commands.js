/*
 * cylon sphero commands
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
 */

"use strict";

module.exports = [
  /**
   * Tells Sphero to abort the currently-running macro
   *
   * @return {null}
   * @publish
   */
  "abortMacro",

  /**
   * Tells Sphero to abort the currently-running orbBasic program
   *
   * @return {null}
   * @publish
   */
  "abortOrbBasicProgram",

  /**
   * Tells Sphero to append a new macro chunk
   *
   * @return {null}
   * @publish
   */
  "appendMacroChunck",

  /**
   * Tells Sphero to append a new orbBasic program fragment
   *
   * @return {null}
   * @publish
   */
  "appendOrbBasicFragment",

  /**
   * Tells Sphero to enable collision detection
   *
   * @return {null}
   * @publish
   */
  "configureCollisionDetection",

  /**
   * Tells Sphero to enable sharing of locator data
   *
   * @return {null}
   * @publish
   */
  "configureLocator",

  /**
   * Tells Sphero to enable collision detection
   *
   * @return {null}
   * @publish
   */
  "detectCollisions",

  /**
   * Tells Sphero to enable sharing of locator data
   *
   * @return {null}
   * @publish
   */
  "detectLocator",

  /**
   * Tells Sphero to erase on-board orbBasic program storage
   *
   * @return {null}
   * @publish
   */
  "eraseOrbBasicStorage",

  /**
   * Tells Sphero to execute the stored orbBasic program
   *
   * @return {null}
   * @publish
   */
  "executeOrbBasicProgram",

  /**
   * Tells Sphero to end calibration mode, and resume normal operation
   *
   * @return {null}
   * @publish
   */
  "finishCalibration",

  /**
   * Tells Sphero to get the current application's configuration
   *
   * @return {null}
   * @publish
   */
  "getApplicationConfigurationBlock",

  /**
   * Tells Sphero to get the configuration
   *
   * @return {null}
   * @publish
   */
  "getConfigurationBlock",

  /**
   * Tells Sphero to get it's current mode
   *
   * @return {null}
   * @publish
   */
  "getDeviceMode",

  /**
   * Tells Sphero to get the status of the currently running macro
   *
   * @return {null}
   * @publish
   */
  "getMacroStatus",

  /**
   * Tells Sphero to return it's permanent option flags
   *
   * @return {null}
   * @publish
   */
  "getPermanentOptionFlags",

  /**
   * Tells Sphero to return the current color value of the internal LEDs
   *
   * @return {null}
   * @publish
   */
  "getRGB",

  /**
   * Tells Sphero to return it's temporary option flags
   *
   * @return {null}
   * @publish
   */
  "getTemporaryOptionFlags",

  /**
   * Tells Sphero to re-initialize the current macro
   *
   * @return {null}
   * @publish
   */
  "reInitializeMacroExecutive",

  /**
   * Tells Sphero to read data from the locator
   *
   * @return {null}
   * @publish
   */
  "readLocator",

  /**
   * Tells Sphero to roll at a specific speed, along a specific heading.
   *
   * Heading is considered relative to the last calibrated position.
   *
   * @param {Number} speed
   * @param {Number} heading
   * @param {Number} state
   * @return {null}
   * @publish
   */
  "roll",

  /**
   * Tells Sphero to run the specified macro
   *
   * @return {null}
   * @publish
   */
  "runMacro",

  /**
   * Tells Sphero to save the specified macro
   *
   * @return {null}
   * @publish
   */
  "saveMacro",

  /**
   * Tells Sphero to save the specified macro as a temporary macro
   *
   * @return {null}
   * @publish
   */
  "saveTemporaryMacro",

  /**
   * Tells Sphero to self-level
   *
   * @return {null}
   * @publish
   */
  "selfLevel",

  /**
   * Sets Sphero's accelerometer range
   *
   * @return {null}
   * @publish
   */
  "setAccelerometerRange",

  /**
   * Sets Sphero's application configuration
   *
   * @return {null}
   * @publish
   */
  "setApplicationConfigurationBlock",

  /**
   * Enables Sphero's rear tail-light LED
   *
   * @return {null}
   * @publish
   */
  "setBackLED",

  /**
   * Sets Sphero's boost duration.
   *
   * @return {null}
   * @publish
   */
  "setBoostWithTime",

  /**
   * Sets Sphero's color.
   *
   * @return {null}
   * @publish
   */
  "setColor",

  /**
   * Sets Sphero's configuration block.
   *
   * @return {null}
   * @publish
   */
  "setConfigurationBlock",

  /**
   * Tells Sphero to enable data streaming.
   *
   * @return {null}
   * @publish
   */
  "setDataStreaming",

  /**
   * Sets Sphero's device mode.
   *
   * @return {null}
   * @publish
   */
  "setDeviceMode",

  /**
   * Sets Sphero's default (0) "heading" angle.
   *
   * @return {null}
   * @publish
   */
  "setHeading",

  /**
   * Sets a macro parameter for Sphero
   *
   * @return {null}
   * @publish
   */
  "setMacroParameter",

  /**
   * @return {null}
   * @publish
   */
  "setMotionTimeout",

  /**
   * Sets Sphero's permanent option flags
   *
   * @return {null}
   * @publish
   */
  "setPermanentOptionFlags",

  /**
   * Sets the color of Sphero's internal RGB LED
   *
   * @param {Number} color
   * @param {Boolean} persist
   * @return {null}
   * @publish
   */
  "setRGB",

  /**
   * Sets Sphero's internal LED to a random color
   *
   * @return {null}
   * @publish
   */
  "setRandomColor",

  /**
   * Allows for raw manipulation of Sphero's motors
   *
   * @return {null}
   * @publish
   */
  "setRawMotorValues",

  /**
   * Directly sets Sphero's rotation rate
   *
   * @return {null}
   * @publish
   */
  "setRotationRate",

  /**
   * Enables or disables Sphero's automatic internal stabilization
   *
   * @return {null}
   * @publish
   */
  "setStabilization",

  /**
   * Sets Sphero's temporary option flags
   *
   * @return {null}
   * @publish
   */
  "setTemporaryOptionFlags",

  /**
   * Starts up Sphero's calibration mode, used to adjust the heading
   *
   * @return {null}
   * @publish
   */
  "startCalibration",

  /**
   * Tells Sphero to stop in place.
   *
   * @return {null}
   * @publish
   */
  "stop",

  /**
   * @return {null}
   * @publish
   */
  "submitValueToInputStatement"
];
