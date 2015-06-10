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
   * Emitted when the connection to the Sphero is closed
   *
   * @event disconnect
   */
  "connect",

  /**
   * Emitted when the connection to the Sphero is closed
   *
   * @event disconnect
   */
  "disconnect",

  /**
   * Emitted when Sphero encounters an error
   *
   * @event error
   */
  "error",

  /**
   * Emitted when Sphero sends a message through the serial port
   *
   * @event message
   */
  "response",

  /**
   * Emitted when Sphero sends a notification through the serial port
   *
   * @event notification
   * @value packet
   */
  "async",

  /**
   * Emitted when Sphero sends a notification through the serial port that
   * contains data
   *
   * @event data
   * @value data
   */
  "data",

  /**
   * Emitted when Sphero detects a collision
   *
   * @event collision
   */
  "collision",
  /**
   * Emitted when Sphero receives a version response
   *
   * @event collision
   */
  "version",
  /**
   * Emitted when Sphero receives getBluetoothInfo response
   *
   * @event collision
   */
  "bluetoothInfo",
  /**
   * Emitted when Sphero receives autoRecoonect response
   *
   * @event collision
   */
  "autoReconnectInfo",
  /**
   * Emitted when Sphero receives power state response
   *
   * @event collision
   */
  "powerStateInfo",
  /**
   * Emitted when Sphero receives voltage trip points response
   *
   * @event collision
   */
  "voltageTripPoints",
  /**
   * Emitted when Sphero receives level2diags response
   *
   * @event collision
   */
  "level2Diagnostics",
  /**
   * Emitted when Sphero receives packetTimes
   *
   * @event collision
   */
  "packetTimes",
  /**
   * Emitted when Sphero receives chassisId response
   *
   * @event collision
   */
  "chassisId",
  /**
   * Emitted when Sphero receives read locator response
   *
   * @event collision
   */
  "readLocator",
  /**
   * Emitted when Sphero receives read rgb color response
   *
   * @event collision
   */
  "rgbLedColor",
  /**
   * Emitted when Sphero receives perm option flags response
   *
   * @event collision
   */
  "permanentOptionFlags",
  /**
   * Emitted when Sphero receives temp option flags response
   *
   * @event collision
   */
  "temporalOptionFlags",
  /**
   * Emitted when Sphero receives device mode response
   *
   * @event collision
   */
  "deviceMode",
  /**
   * Emitted when Sphero receives abort macro response
   *
   * @event collision
   */
  "abortMacro",
  /**
   * Emitted when Sphero receives macro status response
   *
   * @event collision
   */
  "macroStatus",
  /**
   * Emitted when Sphero receives battery status response
   *
   * @event collision
   */
  "battery",
  /**
   * Emitted when Sphero receives level 1 diasgs async msg
   *
   * @event collision
   */
  "level1Diagnostic",
  /**
   * Emitted when Sphero receives data streaming async msg
   *
   * @event collision
   */
  "dataStreaming",
  /**
   * Emitted when Sphero receives config block async msg
   *
   * @event collision
   */
  "configBlock",
  /**
   * Emitted when Sphero receives pre sleep warning async msg
   *
   * @event collision
   */
  "preSleepWarning",
  /**
   * Emitted when Sphero receives macro markers async msg
   *
   * @event collision
   */
  "macroMarkers",
  /**
   * Emitted when Sphero receives orb basic print msg
   *
   * @event collision
   */
  "obPrint",
  /**
   * Emitted when Sphero receives orb basic ascii error msg
   *
   * @event collision
   */
  "obAsciiError",
  /**
   * Emitted when Sphero receives orb basic error msg
   *
   * @event collision
   */
  "obBinaryError",
  /**
   * Emitted when Sphero receives self level async msg
   *
   * @event collision
   */
  "selfLevel",
  /**
   * Emitted when Sphero receives gyro axis exceeded async msg
   *
   * @event collision
   */
  "gyroAxisExceeded"
];
