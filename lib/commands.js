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
   * The Abort Macro command aborts any executing macro, and returns both it's
   * ID code and the command number currently in progress.
   *
   * An exception is a System Macro executing with the UNKILLABLE flag set.
   *
   * A returned ID code of 0x00 indicates that no macro was running, an ID code
   * of 0xFFFF as the CmdNum indicates the macro was unkillable.
   *
   * @param {Function} callback function to be triggered with response
   * @example
   * orb.abortMacro(function(err, data) {
   *   if (err) {
   *     console.log("error: ", err);
   *   } else {
   *     console.log("data:");
   *     console.log("  id:", data.id);
   *     console.log("  cmdNum:", data.cmdNum);
   *   }
   * }
   * @return {void}
   * @publish
   */
  "abortMacro",
  /**
   * The Abort orbBasic Program command aborts execution of any currently
   * running orbBasic program.
   *
   * @param {Function} callback function to be triggered with response
   * @example
   * orb.abortOrbBasicProgram(function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "abortOrbBasicProgram",
  /**
   * The add XP command increases XP by adding the supplied number of minutes
   * of drive time, and immediately commits the SSB to flash.
   *
   * If the password is not accepted, this command fails without consequence.
   *
   * @private
   * @param {Number} pw 32-bit password
   * @param {Number} qty 8-bit number of minutes of drive time to add
   * @param {Function} callback function to be triggered with response
   * @example
   * orb.addXp(pwd, 5, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @private
   */
  "addXp",
  /**
   * The Append Macro Chunk project stores the attached macro definition into
   * the temporary RAM buffer for later execution.
   *
   * It's similar to the Save Temporary Macro command, but allows building up
   * longer temporary macros.
   *
   * Any existing Macro ID can be sent through this command, and executed
   * through the Run Macro call using ID 0xFF.
   *
   * If this command is sent while a Temporary or Stream Macro is executing it
   * will be terminated so that its storage space can be overwritten. As with
   * all macros, the longest chunk that can be sent is 254 bytes.
   *
   * You must follow this with a Run Macro command (ID 0xFF) to actually get it
   * to go and it is best to prefix this command with an Abort call to make
   * certain the larger buffer is completely initialized.
   *
   * @param {Array} chunk of bytes to append for macro execution
   * @param {Function} callback function to be triggered with response
   * @example
   * orb.appendMacroChunk(, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "appendMacroChunk",
  /**
   * The Append orbBasic Fragment command appends a patch of orbBasic code to
   * existing ones in the specified storage area (0x00 for RAM, 0x01 for
   * persistent).
   *
   * Complete lines are not required. A line begins with a decimal line number
   * followed by a space and is terminated with a <LF>.
   *
   * See the orbBasic Interpreter document for complete information.
   *
   * Possible error responses would be ORBOTIX_RSP_CODE_EPARAM if an illegal
   * storage area is specified or ORBOTIX_RSP_CODE_EEXEC if the specified
   * storage area is full.
   *
   * @param {Number} area which area to append the fragment to
   * @param {String} code orbBasic code to append
   * @param {Function} callback function to be triggered with response
   * @example
   * orb.appendOrbBasicFragment(0x00, OrbBasicCode, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "appendOrbBasicFragment",
  /**
   * The Assign Time command sets a specific value to Sphero's internal 32-bit
   * relative time counter.
   *
   * @param {Number} time the new value to set
   * @param {Function} callback function to be triggered when done writing
   * @example
   * orb.assignTime(0x00ffff00, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "assignTime",
  /**
   * The Boost command executes Sphero's boost macro.
   *
   * It takes a 1-byte parameter, 0x01 to start boosting, or 0x00 to stop.
   *
   * @param {Number} boost whether or not to boost (1 - yes, 0 - no)
   * @param {Function} callback function to be triggered after writing
   * @example
   * orb.boost(1, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "boost",
  /**
   * The Buy Consumable command attempts to spend cores on consumables.
   *
   * The consumable ID is given (0 - 7), as well as the quantity requested to
   * purchase.
   *
   * If the purchase succeeds, the consumable count is increased, the cores are
   * spent, and a success response is returned with the increased quantity and
   * lower balance.
   *
   * If there aren't enough cores available to spend, or the purchase would
   * exceed the max consumable quantity of 255, Sphero responds with an EEXEC
   * error (0x08)
   *
   * @private
   * @param {Number} id what consumable to buy
   * @param {Number} qty how many consumables to buy
   * @param {Function} callback function to be called with response
   * @example
   * orb.buyConsumable(0x00, 5, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @private
   */
  "buyConsumable",
  /**
   * The Clear Counters command is a developer-only command to clear the various
   * system counters created by the L2 diagnostics.
   *
   * It is denied when the Sphero is in Normal mode.
   *
   * @private
   * @param {Function} callback function to be triggered when done writing
   * @example
   * orb.clearCounters(function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "clearCounters",
  /**
   * The Color command wraps Sphero's built-in setRgb command, allowing for
   * a greater range of possible inputs.
   *
   * @param {Number|String|Object} color what color to change Sphero to
   * @param {Function} callback function to be triggered with response
   * @example
   * orb.color("#00ff00", function(err, data) {
   *   console.log(err || "Color Changed!");
   * });
   * @example
   * orb.color(0xff0000, function(err, data) {
   *   console.log(err || "Color Changed!");
   * });
   * @example
   * orb.color({ red: 0, green: 0, blue: 255 }, function(err, data) {
   *   console.log(err || "Color Changed!");
   * });
   * @return {void}
   * @publish
   */
  "color",
  /**
   * The Commit To Flash command copies the current orbBasic RAM program to
   * persistent flash storage.
   *
   * It will fail if a program is currently executing out of flash.
   *
   * @param {Function} callback function to be triggered with response
   * @example
   * orb.commitToFlash(function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "commitToFlash",
  /**
   * The Configure Collisions command configures Sphero's collision detection
   * with the provided parameters.
   *
   * These include:
   *
   * - **meth** - which detection method to use. Supported methods are 0x01,
   *   0x02, and 0x03 (see the collision detection document for details). 0x00
   *   disables this service.
   * - **xt, yt** - 8-bit settable threshold for the X (left, right) and
   *   y (front, back) axes of Sphero. 0x00 disables the contribution of that
   *   axis.
   * - **xs, ys** - 8-bit settable speed value for X/Y axes. This setting is
   *   ranged by the speed, than added to `xt` and `yt` to generate the final
   *   threshold value.
   * - **dead** - an 8-bit post-collision dead time to prevent re-triggering.
   *   Specified in 10ms increments.
   *
   * @param {Object} opts object containing collision configuration opts
   * @param {Function} cb function to be triggered after writing
   * @example
   * var opts = {
   *   meth: 0x01,
   *   xt: 0x0F,
   *   xs: 0x0F,
   *   yt: 0x0A,
   *   ys: 0x0A,
   *   dead: 0x05
   * };
   *
   * orb.configureCollisions(opts, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "configureCollisions",
  /**
   * The Configure Locator command configures Sphero's streaming location data
   * service.
   *
   * The following options must be provided:
   *
   * - **flags** - bit 0 determines whether calibrate commands auto-correct the
   *   yaw tare value. When false, positive Y axis coincides with heading 0.
   *   Other bits are reserved.
   * - **x, y** - the current (x/y) coordinates of Sphero on the ground plane in
   *   centimeters
   * - **yawTare** - controls how the x,y-plane is aligned with Sphero's heading
   *   coordinate system. When zero, yaw = 0 corresponds to facing down the
   *   y-axis in the positive direction. Possible values are 0-359 inclusive.
   *
   * @param {Object} opts object containing locator service configuration
   * @param {Function} callback function to be triggered after writing
   * @example
   * var opts = {
   *   flags: 0x01,
   *   x: 0x0000,
   *   y: 0x0000,
   *   yawTare: 0x0
   * };
   *
   * orb.configureLocator(opts, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "configureLocator",
  /**
   * The Control UART Tx command enables or disables the CPU's UART transmit
   * line so another client can configure the Bluetooth module.
   *
   * @param {Function} callback function to be triggered after write
   * @example
   * orb.controlUartTx(function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "controlUartTx",
   /**
   * The Detect Collisions command sets up Sphero's collision detection system,
   * and automatically parses asynchronous packets to re-emit collision events
   * to 'collision' event listeners.
   *
   * @param {Function} callback (err, data) to be triggered with response
   * @example
   * orb.detectCollisions();
   *
   * orb.on("collision", function(data) {
   *   console.log("data:");
   *   console.log("  x:", data.x);
   *   console.log("  y:", data.y);
   *   console.log("  z:", data.z);
   *   console.log("  axis:", data.axis);
   *   console.log("  xMagnitud:", data.xMagnitud);
   *   console.log("  yMagnitud:", data.yMagnitud);
   *   console.log("  speed:", data.timeStamp);
   *   console.log("  timeStamp:", data.timeStamp);
   * });
   * @return {void}
   * @publish
   */
  "detectCollisions",
  /**
   * The Enable SSB Async Messages command turns on/off soul block related
   * asynchronous messages.
   *
   * These include shield collision/regrowth messages, boost use/regrowth
   * messages, XP growth, and level-up messages.
   *
   * This feature defaults to off.
   *
   * @private
   * @param {Number} flag whether or not to enable async messages
   * @param {Function} callback function to be triggered after write
   * @example
   * orb.enableSsbAsyncMsg(0x01, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "enableSsbAsyncMsg",
  /**
   * The Erase orbBasic Storage command erases any existing program in the
   * specified storage area.
   *
   * Specify 0x00 for the temporary RAM buffer, or 0x01 for the persistent
   * storage area.
   *
   * @param {Number} area which area to erase
   * @param {Function} callback function to be triggered with response
   * @example
   * orb.eraseOrbBasicStorage(0x00, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "eraseOrbBasicStorage",
  /**
   * The Execute orbBasic Program command attempts to run a program in the
   * specified storage area, beginning at the specified line number.
   *
   * This command will fail if there is already an orbBasic program running.
   *
   * @param {Number} area which area to run from
   * @param {Number} slMSB start line
   * @param {Number} slLSB start line
   * @param {Function} callback function to be triggered with response
   * @example
   * orb.executeOrbBasicProgram(0x00, 0x00, 0x00, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "executeOrbBasicProgram",
  /**
   * The Finish Calibration command ends Sphero's calibration mode, by setting
   * the new heading as current, turning off the back LED, and re-enabling
   * stabilization.
   *
   * @param {Function} callback function to be triggered with response
   * @example
   * orb.finishCalibration();
   * @return {void}
   * @publish
   */
  "finishCalibration",
  /**
   * The Get Auto Reconnect command returns the Bluetooth auto reconnect values
   * as defined above in the Set Auto Reconnect command.
   *
   * @param {Function} callback function to be triggered with reconnect data
   * @example
   * orb.getAutoReconnect(function(err, data) {
   *   if (err) {
   *     console.log("error: ", err);
   *   } else {
   *     console.log("data:");
   *     console.log("  flag:", data.flag);
   *     console.log("  time:", data.time);
   *   }
   * }
   * @return {void}
   * @publish
   */
  "getAutoReconnect",
  /**
   * Triggers the callback with a structure containing
   *
   * - Sphero's ASCII name
   * - Sphero's Bluetooth address (ASCII)
   * - Sphero's ID colors
   *
   * @param {Function} callback function to be triggered with Bluetooth info
   * @example
   * orb.getBluetoothInfo(function(err, data) {
   *   if (err) {
   *     console.log("error: ", err);
   *   } else {
   *     console.log("data:");
   *     console.log("  name:", data.name);
   *     console.log("  btAddress:", data.btAddress);
   *     console.log("  separator:", data.separator);
   *     console.log("  colors:", data.colors);
   *   }
   * }
   * @return {void}
   * @publish
   */
  "getBluetoothInfo",
  /**
   * The Get Chassis ID command returns the 16-bit chassis ID Sphero was
   * assigned at the factory.
   *
   * @param {Function} callback function to be triggered with a response
   * @example
   * orb.getChassisId(function(err, data) {
   *   if (err) {
   *     console.log("error: ", err);
   *   } else {
   *     console.log("data:");
   *     console.log("  chassisId:", data.chassisId);
   *   }
   * }
   * @return {void}
   * @publish
   */
  "getChassisId",
  /**
   * Passes the color of the sphero Rgb LED to the callback (err, data)
   *
   * @param {Function} callback function to be triggered with response
   * @example
   * orb.getColor(function(err, data) {
   *   if (err) {
   *     console.log("error: ", err);
   *   } else {
   *     console.log("data:");
   *     console.log("  color:", data.color);
   *     console.log("  red:", data.red);
   *     console.log("  green:", data.green);
   *     console.log("  blue:", data.blue);
   *   }
   * });
   * @return {void}
   * @publish
   */
  "getColor",
  /**
   * The Get Configuration Block command retrieves one of Sphero's configuration
   * blocks.
   *
   * The response is a simple one; an error code of 0x08 is returned when the
   * resources are currently unavailable to send the requested block back. The
   * actual configuration block data returns in an asynchronous message of type
   * 0x04 due to its length (if there is no error).
   *
   * ID = `0x00` requests the factory configuration block
   * ID = `0x01` requests the user configuration block, which is updated with
   * current values first
   *
   * @param {Number} id which configuration block to fetch
   * @param {Function} callback function to be triggered after writing
   * @example
   * orb.getConfigBlock(function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "getConfigBlock",
  /**
   * The Get Device Mode command gets the current device mode of Sphero.
   *
   * Possible values:
   *
   * - **0x00**: Normal mode
   * - **0x01**: User Hack mode.
   *
   * @param {Function} callback function to be called with response
   * @example
   * orb.getDeviceMode(function(err, data) {
   *   if (err) {
   *     console.log("error: ", err);
   *   } else {
   *     console.log("data:");
   *     console.log("  mode:", data.mode);
   *   }
   * }
   * @return {void}
   * @publish
   */
  "getDeviceMode",
  /**
   * The Get Macro Status command returns the ID code and command number of the
   * currently executing macro.
   *
   * If no macro is running, the 0x00 is returned for the ID code, and the
   * command number is left over from the previous macro.
   *
   * @param {Function} callback function to be triggered with response
   * @example
   * orb.getMacroStatus(function(err, data) {
   *   if (err) {
   *     console.log("error: ", err);
   *   } else {
   *     console.log("data:");
   *     console.log("  idCode:", data.idCode);
   *     console.log("  cmdNum:", data.cmdNum);
   *   }
   * }
   * @return {void}
   * @publish
   */
  "getMacroStatus",
  /**
   * The Get Permanent Option Flags command returns Sphero's permanent option
   * flags, as a bit field.
   *
   * Here's possible bit fields, and their descriptions:
   *
   * - `0`: Set to prevent Sphero from immediately going to sleep when placed in
   *   the charger and connected over Bluetooth.
   * - `1`: Set to enable Vector Drive, that is, when Sphero is stopped and
   *   a new roll command is issued it achieves the heading before moving along
   *   it.
   * - `2`: Set to disable self-leveling when Sphero is inserted into the
   *   charger.
   * - `3`: Set to force the tail LED always on.
   * - `4`: Set to enable motion timeouts (see DID 02h, CID 34h)
   * - `5`: Set to enable retail Demo Mode (when placed in the charger, ball
   *   runs a slow rainbow macro for 60 minutes and then goes to sleep).
   * - `6`: Set double tap awake sensitivity to Light
   * - `7`: Set double tap awake sensitivity to Heavy
   * - `8`: Enable gyro max async message (NOT SUPPORTED IN VERSION 1.47)
   * - `6-31`: Unassigned
   *
   * @param {Function} callback function triggered with option flags data
   * @example
   * orb.getPermOptionFlags(function(err, data) {
   *   if (err) {
   *     console.log("error: ", err);
   *   } else {
   *     console.log("data:");
   *     console.log("  sleepOnCharger:", data.sleepOnCharger);
   *     console.log("  vectorDrive:", data.vectorDrive);
   *     console.log("  selfLevelOnCharger:", data.selfLevelOnCharger);
   *     console.log("  tailLedAlwaysOn:", data.tailLedAlwaysOn);
   *     console.log("  motionTimeouts:", data.motionTimeouts);
   *     console.log("  retailDemoOn:", data.retailDemoOn);
   *     console.log("  awakeSensitivityLight:", data.awakeSensitivityLight);
   *     console.log("  awakeSensitivityHeavy:", data.awakeSensitivityHeavy);
   *     console.log("  gyroMaxAsyncMsg:", data.gyroMaxAsyncMsg);
   *   }
   * }
   * @return {void}
   * @publish
   */
  "getPermOptionFlags",
  /**
   * The Get Power State command returns Sphero's current power state, and some
   * additional parameters:
   *
   * - **RecVer**: record version code (following is for 0x01)
   * - **Power State**: high-level state of the power system
   * - **BattVoltage**: current battery voltage, scaled in 100ths of a volt
   *   (e.g. 0x02EF would be 7.51 volts)
   * - **NumCharges**: Number of battery recharges in the life of this Sphero
   * - **TimeSinceChg**: Seconds awake since last recharge
   *
   * Possible power states:
   *
   * - 0x01 - Battery Charging
   * - 0x02 - Battery OK
   * - 0x03 - Battery Low
   * - 0x04 - Battery Critical
   *
   * @param {Function} callback function to be triggered with power state data
   * @example
   * orb.getPowerState(function(err, data) {
   *   if (err) {
   *     console.log("error: ", err);
   *   } else {
   *     console.log("data:");
   *     console.log("  recVer:", data.recVer);
   *     console.log("  batteryState:", data.batteryState);
   *     console.log("  batteryVoltage:", data.batteryVoltage);
   *     console.log("  chargeCount:", data.chargeCount);
   *     console.log("  secondsSinceCharge:", data.secondsSinceCharge);
   *   }
   * }
   * @return {void}
   * @publish
   */
  "getPowerState",
  /**
   * The Get RGB LED command fetches the current "user LED color" value, stored
   * in Sphero's configuration.
   *
   * This value may or may not be what's currently displayed by Sphero's LEDs.
   *
   * @param {Function} callback function to be triggered after writing
   * @example
   * orb.getRgbLed(function(err, data) {
   *   if (err) {
   *     console.log("error: ", err);
   *   } else {
   *     console.log("data:");
   *     console.log("  color:", data.color);
   *     console.log("  red:", data.red);
   *     console.log("  green:", data.green);
   *     console.log("  blue:", data.blue);
   *   }
   * }
   * @return {void}
   * @publish
   */
  "getRgbLed",
  /**
   * The Get SSB command retrieves Sphero's Soul Block.
   *
   * The response is simple, and then the actual block of soulular data returns
   * in an asynchronous message of type 0x0D, due to it's 0x440 byte length
   *
   * @private
   * @param {Function} callback function to be called with response
   * @example
   * orb.getSsb(function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "getSsb",
  /**
   * The Get Temporary Option Flags command returns Sphero's temporary option
   * flags, as a bit field:
   *
   * - `0`: Enable Stop On Disconnect behavior
   * - `1-31`: Unassigned
   *
   * @param {Function} callback function triggered with option flags data
   * @example
   * orb.getTempOptionFlags(function(err, data) {
   *   if (err) {
   *     console.log("error: ", err);
   *   } else {
   *     console.log("data:");
   *     console.log("  stopOnDisconnect:", data.stopOnDisconnect);
   *   }
   * }
   * @return {void}
   * @publish
   */
  "getTempOptionFlags",
  /**
   * The Get Voltage Trip Points command returns the trip points Sphero uses to
   * determine Low battery and Critical battery.
   *
   * The values are expressed in 100ths of a volt, so defaults of 7V and 6.5V
   * respectively are returned as 700 and 650.
   *
   * @param {Function} callback function to be triggered with trip point data
   * @example
   * orb.getVoltageTripPoints(function(err, data) {
   *   if (err) {
   *     console.log("error: ", err);
   *   } else {
   *     console.log("data:");
   *     console.log("  vLow:", data.vLow);
   *     console.log("  vCrit:", data.vCrit);
   *   }
   * }
   * @return {void}
   * @publish
   */
  "getVoltageTripPoints",
  /**
   * The Grant Cores command adds the supplied number of cores.
   *
   * If the first bit in the flags byte is set, the command immediately commits
   * the SSB to flash. Otherwise, it does not.
   *
   * All other bits are reserved.
   *
   * If the password is not accepted, this command fails without consequence.
   *
   * @private
   * @param {Number} pw 32-bit password
   * @param {Number} qty 32-bit number of cores to add
   * @param {Number} flags 8-bit flags byte
   * @param {Function} callback function to be triggered with response
   * @example
   * orb.grantCores(pwd, 5, 0x01, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @private
   */
  "grantCores",
  /**
   * The Jump To Bootloader command requests a jump into the Bootloader to
   * prepare for a firmware download.
   *
   * All commands after this one must comply with the Bootloader Protocol
   * Specification.
   *
   * @param {Function} callback function to be triggered when done writing
   * @example
   * orb.jumpToBootLoader(function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "jumpToBootloader",
  /**
   * The Level Up Attribute command attempts to increase the level of the
   * specified attribute by spending attribute points.
   *
   * The IDs are:
   *
   * - **0x00**: speed
   * - **0x01**: boost
   * - **0x02**: brightness
   * - **0x03**: shield
   *
   *
   * If successful, the SSB is committed to flash, and a response packet
   * containing the attribute ID, new level, and remaining attribute points is
   * returned.
   *
   * If there are not enough attribute points, this command returns an EEXEC
   * error (0x08).
   *
   * If the password is not accepted, this command fails without consequence.
   *
   * @private
   * @param {Number} pw 32-bit password
   * @param {Number} id which attribute to level up
   * @param {Function} callback function to be triggered with response
   * @example
   * orb.levelUpAttr(pwd, 0x00, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @private
   */
  "levelUpAttr",
  /**
   * The Ping command verifies the Sphero is awake and receiving commands.
   *
   * @param {Function} callback triggered when Sphero has been pinged
   * @example
   * orb.ping(function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "ping",
  /**
   * The Poll Packet Times command helps users profile the transmission and
   * processing latencies in Sphero.
   *
   * For more details, see the Sphero API documentation.
   *
   * @param {Number} time a timestamp to use for profiling
   * @param {Function} callback function to be triggered when done writing
   * @example
   * orb.assignTime(0x00ffff, function(err, data) {
   *   if (err) {
   *     console.log("error: ", err);
   *   } else {
   *     console.log("data:");
   *     console.log("  t1:", data.t1);
   *     console.log("  t2:", data.t2);
   *     console.log("  t3:", data.t3);
   *   }
   * }
   * @return {void}
   * @publish
   */
  "pollPacketTimes",
  /**
   * The Random Color command sets Sphero to a randomly-generated color.
   *
   * @param {Function} callback (err, data) to be triggered with response
   * @example
   * orb.randomColor(function(err, data) {
   *   console.log(err || "Random Color!");
   * });
   * @return {void}
   * @publish
   */
  "randomColor",
  /**
   * The Reinit Macro Executive command terminates any running macro, and
   * reinitializes the macro system.
   *
   * The table of any persistent user macros is cleared.
   *
   * @param {Function} callback function to be triggered with response
   * @example
   * orb.reInitMacroExec(function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "reInitMacroExec",
  /**
   * The Read Locator command gets Sphero's current position (X,Y), component
   * velocities, and speed-over-ground (SOG).
   *
   * The position is a signed value in centimeters, the component velocities are
   * signed cm/sec, and the SOG is unsigned cm/sec.
   *
   * @param {Function} callback function to be triggered with data
   * @example
   * orb.readLocator(function(err, data) {
   *   if (err) {
   *     console.log("error: ", err);
   *   } else {
   *     console.log("data:");
   *     console.log("  xpos:", data.xpos);
   *     console.log("  ypos:", data.ypos);
   *     console.log("  xvel:", data.xvel);
   *     console.log("  yvel:", data.yvel);
   *     console.log("  sog:", data.sog);
   *   }
   * }
   * @return {void}
   * @publish
   */
  "readLocator",
  /**
   * The Refill Bank command attempts to refill either the Boost bank (0x00) or
   * the Shield bank (0x01) by attempting to deduct the respective refill cost
   * from the current number of cores.
   *
   * If it succeeds, the bank is set to the maximum obtainable for that level,
   * the cores are spent, and a success response is returned with the lower core
   * balance.
   *
   * If there aren't enough cores available to spend, Sphero responds with an
   * EEXEC error (0x08)
   *
   * @private
   * @param {Number} type what bank to refill (0 - Boost, 1 - Shield)
   * @param {Function} callback function to be called with response
   * @example
   * orb.refillBank(0x00, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @private
   */
  "refillBank",
  /**
   * The Roll command tells Sphero to roll along the provided vector.
   *
   * Both a speed and heading are required, the latter is considered relative to
   * the last calibrated direction.
   *
   * Permissible heading values are 0 to 359 inclusive.
   *
   * @param {Number} speed what speed Sphero should roll at
   * @param {Number} heading what heading Sphero should roll towards (0-359)
   * @param {Number} [state] optional state parameter
   * @param {Function} callback function to be triggered after writing
   * @example
   * orb.setbackLed(180, 0, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "roll",
  /**
   * The Perform Level 1 Diagnostics command is a developer-level command to
   * help diagnose aberrant behaviour in Sphero.
   *
   * Most process flags, system counters, and system states are decoded to
   * human-readable ASCII.
   *
   * For more details, see the Sphero API documentation.
   *
   * @param {Function} callback function to be triggered with diagnostic data
   * @example
   * orb.runL1Diags(function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "runL1Diags",
  /**
   * The Perform Level 2 Diagnostics command is a developer-level command to
   * help diagnose aberrant behaviour in Sphero.
   *
   * It's much less informative than the Level 1 command, but is in binary
   * format and easier to parse.
   *
   * For more details, see the Sphero API documentation.
   *
   * @param {Function} callback function to be triggered with diagnostic data
   * @example
   * orb.runL2Diags(function(err, data) {
   *   if (err) {
   *     console.log("error: ", err);
   *   } else {
   *     console.log("data:");
   *     console.log("  recVer:", data.recVer);
   *     console.log("  rxGood:", data.rxGood);
   *     console.log("  rxBadId:", data.rxBadId);
   *     console.log("  rxBadDlen:", data.rxBadDlen);
   *     console.log("  rxBadCID:", data.rxBadCID);
   *     console.log("  rxBadCheck:", data.rxBadCheck);
   *     console.log("  rxBufferOvr:", data.rxBufferOvr);
   *     console.log("  txMsg:", data.txMsg);
   *     console.log("  txBufferOvr:", data.txBufferOvr);
   *     console.log("  lastBootReason:", data.lastBootReason);
   *     console.log("  bootCounters:", data.bootCounters);
   *     console.log("  chargeCount:", data.chargeCount);
   *     console.log("  secondsSinceCharge:", data.secondsSinceCharge);
   *     console.log("  secondsOn:", data.secondsOn);
   *     console.log("  distancedRolled:", data.distancedRolled);
   *     console.log("  sensorFailures:", data.sensorFailures);
   *     console.log("  gyroAdjustCount:", data.gyroAdjustCount);
   *   }
   * }
   * @return {void}
   * @publish
   */
  "runL2Diags",
  /**
   * The Run Macro command attempts to execute the specified macro.
   *
   * Macro IDs are split into groups:
   *
   * 0-31 are System Macros. They are compiled into the Main Application, and
   * cannot be deleted. They are always available to run.
   *
   * 32-253 are User Macros. They are downloaded and persistently stored, and
   * can be deleted in total.
   *
   * 255 is the Temporary Macro, a special user macro as it is held in RAM for
   * execution.
   *
   * 254 is also a special user macro, called the Stream Macro that doesn't
   * require this call to begin execution.
   *
   * This command will fail if there is a currently executing macro, or the
   * specified ID code can't be found.
   *
   * @param {Number} id 8-bit Macro ID to run
   * @param {Function} callback function to be triggered with response
   * @example
   * orb.runMacro(0x01, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "runMacro",
  /** Save macro
   *
   * The Save Macro command stores the attached macro definition into the
   * persistent store for later execution. This command can be sent even if
   * other macros are executing.
   *
   * You will receive a failure response if you attempt to send an ID number in
   * the System Macro range, 255 for the Temp Macro and ID of an existing user
   * macro in the storage block.
   *
   * As with all macros, the longest definition that can be sent is 254 bytes.
   *
   * @param {Array} macro array of bytes with the data to be written
   * @param {Function} callback function to be triggered with response
   * @example
   * orb.saveMacro(0x01, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "saveMacro",
  /**
   * The Save Temporary Macro stores the attached macro definition into the
   * temporary RAM buffer for later execution.
   *
   * If this command is sent while a Temporary or Stream Macro is executing it
   * will be terminated so that its storage space can be overwritten. As with
   * all macros, the longest definition that can be sent is 254 bytes.
   *
   * @param {Array} macro array of bytes with the data to be written
   * @param {Function} callback function to be triggered with response
   * @example
   * orb.saveTempMacro(0x01, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "saveTempMacro",
  /**
   * The Self Level command controls Sphero's self-level routine.
   *
   * This routine attempts to achieve a horizontal orientation where pitch/roll
   * angles are less than the provided Angle Limit.
   *
   * After both limits are satisfied, option bits control sleep, final
   * angle(heading), and control system on/off.
   *
   * An asynchronous message is returned when the self level routine completes.
   *
   * For more detail on opts param, see the Sphero API documentation.
   *
   * opts:
   *  - angleLimit: 0 for defaul, 1 - 90 to set.
   *  - timeout: 0 for default, 1 - 255 to set.
   *  - trueTime: 0 for default, 1 - 255 to set.
   *  - options: bitmask 4bit e.g. 0xF;
   * };
   *
   * @param {Object} opts self-level routine options
   * @param {Function} callback function to be triggered after writing
   * @example
   * var opts = {
   *   angleLimit: 0,
   *   timeout: 0, ,
   *   trueTime: 0,
   *   options: 0x7
   * };
   *
   * orb.selfLevel(opts, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "selfLevel",
  /**
   * The Set Accelerometer Range command tells Sphero what accelerometer range
   * to use.
   *
   * By default, Sphero's solid-state accelerometer is set for a range of ±8Gs.
   * You may wish to change this, perhaps to resolve finer accelerations.
   *
   * This command takes an index for the supported range, as explained below:
   *
   * - `0`: ±2Gs
   * - `1`: ±4Gs
   * - `2`: ±8Gs (default)
   * - `3`: ±16Gs
   *
   * @param {Number} idx what accelerometer range to use
   * @param {Function} callback function to be triggered after writing
   * @example
   * orb.setAccelRange(0x02, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "setAccelRange",
  /**
   * The Set Auto Reconnect command tells Sphero's BT module whether or not it
   * should automatically reconnect to the previously-connected Apple mobile
   * device.
   *
   * @param {Number} flag whether or not to reconnect (0 - no, 1 - yes)
   * @param {Number} time how many seconds after start to enable auto reconnect
   * @param {Function} callback function to be triggered after write
   * @example
   * orb.setAutoReconnect(1, 20, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "setAutoReconnect",
  /**
   * The Set Back LED command allows brightness adjustment of Sphero's tail
   * light.
   *
   * This value does not persist across power cycles.
   *
   * @param {Number} brightness brightness to set to Sphero's tail light
   * @param {Function} callback function to be triggered after writing
   * @example
   * orb.setbackLed(255, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "setBackLed",
  /**
   *
   * The Set Chassis ID command assigns Sphero's chassis ID, a 16-bit value.
   *
   * This command only works if you're at the factory.
   *
   * @param {Number} chassisId new chassis ID
   * @param {Function} callback function to be triggered after writing
   * @example
   * orb.setChassisId(0xFE75, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "setChassisId",
  /**
   * The Set Config Block command accepts an exact copy of the configuration
   * block, and loads it into the RAM copy of the configuration block.
   *
   * The RAM copy is then saved to flash.
   *
   * The configuration block can be obtained by using the Get Configuration
   * Block command.
   *
   * @private
   * @param {Array} block - An array of bytes with the data to be written
   * @param {Function} callback - To be triggered when done
   * @example
   * orb.setConfigBlock(dataBlock, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "setConfigBlock",
  /**
   * The Set Data Streaming command configures Sphero's built-in support for
   * asynchronously streaming certain system and sensor data.
   *
   * This command selects the internal sampling frequency, packet size,
   * parameter mask, and (optionally) the total number of packets.
   *
   * These options are provided as an object, with the following properties:
   *
   * - **n** - divisor of the maximum sensor sampling rate
   * - **m** - number of sample frames emitted per packet
   * - **mask1** - bitwise selector of data sources to stream
   * - **pcnt** - packet count 1-255 (or 0, for unlimited streaming)
   * - **mask2** - bitwise selector of more data sources to stream (optional)
   *
   * For more explanation of these options, please see the Sphero API
   * documentation.
   *
   * @param {Object} opts object containing streaming data options
   * @param {Function} callback function to be triggered after writing
   * @example
   * var opts = {
   *   n: 400,
   *   m: 1,
   *   mask1: 0x00000000,
   *   mask2: 0x01800000,
   *   pcnt: 0
   * };
   *
   * orb.setDataStreaming(opts, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "setDataStreaming",
  /**
   * The Set Device Mode command assigns the operation mode of Sphero based on
   * the supplied mode value.
   *
   * - **0x00**: Normal mode
   * - **0x01**: User Hack mode. Enables ASCII shell commands, refer to the
   *   associated document for details.
   *
   * @param {Number} mode which mode to set Sphero to
   * @param {Function} callback function to be called after writing
   * @example
   * orb.setDeviceMode(0x00, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "setDeviceMode",
  /**
   * The Set Device Name command assigns Sphero an internal name. This value is
   * then produced as part of the Get Bluetooth Info command.
   *
   * Names are clipped at 48 characters to support UTF-8 sequences. Any extra
   * characters will be discarded.
   *
   * This field defaults to the Bluetooth advertising name of Sphero.
   *
   * @param {String} name what name to give to the Sphero
   * @param {Function} callback function to be triggered when the name is set
   * @example
   * orb.setDeviceName("rollingOrb", function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "setDeviceName",
  /**
   * The Set Heading command tells Sphero to adjust it's orientation, by
   * commanding a new reference heading (in degrees).
   *
   * If stabilization is enabled, Sphero will respond immediately to this.
   *
   * @param {Number} heading Sphero's new reference heading, in degrees (0-359)
   * @param {Function} callback function to be triggered after writing
   * @example
   * orb.setHeading(180, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "setHeading",
  /**
   * The Set Inactivity Timeout command sets the timeout delay before Sphero
   * goes to sleep automatically.
   *
   * By default, the value is 600 seconds (10 minutes), but this command can
   * alter it to any value of 60 seconds or greater.
   *
   * @param {Number} time new delay before sleeping
   * @param {Function} callback function to be triggered when done writing
   * @example
   * orb.setInactivityTimeout(120, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "setInactivityTimeout",
  /**
   * The Set Macro Parameter command allows system globals that influence
   * certain macro commands to be selectively altered from outside of the macro
   * system itself.
   *
   * The values of Val1 and Val2 depend on the parameter index.
   *
   * Possible indices:
   *
   * - **00h** Assign System Delay 1: Val1 = MSB, Val2 = LSB
   * - **01h** Assign System Delay 2: Val1 = MSB, Val2 = LSB
   * - **02h** Assign System Speed 1: Val1 = speed, Val2 = 0 (ignored)
   * - **03h** Assign System Speed 2: Val1 = speed, Val2 = 0 (ignored)
   * - **04h** Assign System Loops: Val1 = loop count, Val2 = 0 (ignored)
   *
   * For more details, please refer to the Sphero Macro document.
   *
   * @param {Number} index what parameter index to use
   * @param {Number} val1 value 1 to set
   * @param {Number} val2 value 2 to set
   * @param {Function} callback function to be triggered with response
   * @example
   * orb.setMacroParam(0x02, 0xF0, 0x00, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "setMacroParam",
  /**
   * The Set Motion Timeout command gives Sphero an ultimate timeout for the
   * last motion command to keep Sphero from rolling away in the case of
   * a crashed (or paused) application.
   *
   * This defaults to 2000ms (2 seconds) upon wakeup.
   *
   * @param {Number} time timeout length in milliseconds
   * @param {Function} callback function to be triggered when done writing
   * @example
   * orb.setMotionTimeout(0x0FFF, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "setMotionTimeout",
  /**
   * The Set Permanent Option Flags command assigns Sphero's permanent option
   * flags to the provided values, and writes them immediately to the config
   * block.
   *
   * See below for the bit definitions.
   *
   * @param {Array} flags permanent option flags
   * @param {Function} callback function to be triggered when done writing
   * @example
   * // Force tail LED always on
   * orb.setPermOptionFlags(0x00000008, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "setPermOptionFlags",
  /**
   * The Set Power Notification command enables sphero to asynchronously notify
   * the user of power state periodically (or immediately, when a change occurs)
   *
   * Timed notifications are sent every 10 seconds, until they're disabled or
   * Sphero is unpaired.
   *
   * @param {Number} flag whether or not to send notifications (0 - no, 1 - yes)
   * @param {Function} callback function to be triggered when done writing
   * @example
   * orb.setPowerNotification(1, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "setPowerNotification",
  /**
   * The Set Raw Motors command allows manual control over one or both of
   * Sphero's motor output values.
   *
   * Each motor (left and right requires a mode and a power value from 0-255.
   *
   * This command will disable stabilization is both mode's aren't "ignore", so
   * you'll need to re-enable it once you're done.
   *
   * Possible modes:
   *
   * - `0x00`: Off (motor is open circuit)
   * - `0x01`: Forward
   * - `0x02`: Reverse
   * - `0x03`: Brake (motor is shorted)
   * - `0x04`: Ignore (motor mode and power is left unchanged
   *
   * @param {Object} opts object with mode/power values (e.g. lmode, lpower)
   * @param {Function} callback function to be triggered after writing
   * @example
   * var opts = {
   *   lmode: 0x01,
   *   lpower: 180,
   *   rmode: 0x02,
   *   rpower: 180
   * }
   *
   * orb.setRawMotors(opts, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "setRawMotors",
  /**
   * The Set RGB LED command sets the colors of Sphero's RGB LED.
   *
   * An object containaing `red`, `green`, and `blue` values must be provided.
   *
   * If `opts.flag` is set to 1 (default), the color is persisted across power
   * cycles.
   *
   * @param {Object} opts object containing RGB values for Sphero's LED
   * @param {Function} callback function to be triggered after writing
   * @example
   * orb.setRgbLed({ red: 0, green: 0, blue: 255 }, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "setRgbLed",
  /**
   * The Set Rotation Rate command allows control of the rotation rate Sphero
   * uses to meet new heading commands.
   *
   * A lower value offers better control, but with a larger turning radius.
   *
   * Higher values yield quick turns, but Sphero may lose control.
   *
   * The provided value is in units of 0.784 degrees/sec.
   *
   * @param {Number} rotation new rotation rate (0-255)
   * @param {Function} callback function to be triggered after writing
   * @example
   * orb.setRotationRate(180, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "setRotationRate",
  /**
   * The Set SSB command sets Sphero's Soul Block.
   *
   * The actual payload length is 0x404 bytes, but if you use the special DLEN
   * encoding of 0xff, Sphero will know what to expect.
   *
   * You need to supply the password in order for it to work.
   *
   * @private
   * @param {Number} pwd a 32 bit (4 bytes) hexadecimal value
   * @param {Array} block array of bytes with the data to be written
   * @param {Function} callback a function to be triggered after writing
   * @example
   * orb.setSsb(pwd, block, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @private
   */
  "setSsb",
  /**
   * The Set SSB Modifier Block command allows the SSB to be patched with a new
   * modifier block - including the Boost macro.
   *
   * The changes take effect immediately.
   *
   * @param {Number} pwd a 32 bit (4 bytes) hexadecimal value
   * @param {Array} block array of bytes with the data to be written
   * @param {Function} callback a function to be triggered after writing
   * @example
   * orb.setSsbModBlock(0x0000000F, data, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @private
   */
  "setSsbModBlock",
  /**
   * The Set Stabilization command turns Sphero's internal stabilization on or
   * off, depending on the flag provided.
   *
   * @param {Number} flag stabilization setting flag (0 - off, 1 - on)
   * @param {Function} callback function to be triggered after writing
   * @example
   * orb.setStabilization(1, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "setStabilization",
  /**
   * The Set Temporary Option Flags command assigns Sphero's temporary option
   * flags to the provided values. These do not persist across power cycles.
   *
   * See below for the bit definitions.
   *
   * @param {Array} flags permanent option flags
   * @param {Function} callback function to be triggered when done writing
   * @example
   * // enable stop on disconnect behaviour
   * orb.setTempOptionFlags(0x01, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "setTempOptionFlags",
  /**
   * The Set Voltage Trip Points command assigns the voltage trip points for Low
   * and Critical battery voltages.
   *
   * Values are specified in 100ths of a volt, and there are limitations on
   * adjusting these from their defaults:
   *
   * - vLow must be in the range 675-725
   * - vCrit must be in the range 625-675
   *
   * There must be 0.25v of separation between the values.
   *
   * Shifting these values too low can result in very little warning before
   * Sphero forces itself to sleep, depending on the battery pack. Be careful.
   *
   * @param {Number} vLow new voltage trigger for Low battery
   * @param {Number} vCrit new voltage trigger for Crit battery
   * @param {Function} callback function to be triggered when done writing
   * @example
   * orb.setVoltageTripPoints(675, 650, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "setVoltageTripPoints",
  /**
   * The Sleep command puts Sphero to sleep immediately.
   *
   * @param {Number} wakeup the number of seconds for Sphero to re-awaken after.
   * 0x00 tells Sphero to sleep forever, 0xFFFF attemps to put Sphero into deep
   * sleep.
   * @param {Number} macro if non-zero, Sphero will attempt to run this macro ID
   * when it wakes up
   * @param {Number} orbBasic if non-zero, Sphero will attempt to run an
   * orbBasic program from this line number
   * @param {Function} callback function to be triggered when done writing
   * @example
   * orb.sleep(10, 0, 0, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "sleep",
  /**
   * The Start Calibration command sets up Sphero for manual heading
   * calibration.
   *
   * It does this by turning on the tail light (so you can tell where it's
   * facing) and disabling stabilization (so you can adjust the heading).
   *
   * When done, call #finishCalibration to set the new heading, and re-enable
   * stabilization.
   *
   * @param {Function} callback (err, data) to be triggered with response
   * @example
   * orb.startCalibration();
   * @return {void}
   * @publish
   */
  "startCalibration",
  /**
   * Stops sphero the optimal way by setting flag 'go' to 0
   * and speed to a very low value.
   *
   * @param {Function} callback triggered on complete
   * @example
   * sphero.stop(function(err, data) {
   *   console.log(err || "data" + data);
   * });
   * @return {void}
   * @publish
   */
  "stop",
  /**
   * The Stop On Disconnect command sends a flag to Sphero. This flag tells
   * Sphero whether or not it should automatically stop when it detects
   * that it's disconnected.
   *
   * @param {Boolean} [remove=false] whether or not to stop on disconnect
   * @param {Function} callback triggered on complete
   * @example
   * orb.stopOnDisconnect(function(err, data) {
   *   console.log(err || "data" + data);
   * });
   * @return {void}
   * @publish
   */
  "stopOnDisconnect",
  /**
   * Starts streaming of accelOne data
   *
   * It uses sphero's data streaming command. User needs to listen
   * for the `dataStreaming` or `accelOne` event to get the data.
   *
   * @param {Number} [sps=5] samples per second
   * @param {Boolean} [remove=false] forces velocity streaming to stop
   * @example
   * orb.streamAccelOne();
   *
   * orb.on("accelOne", function(data) {
   *   console.log("data:");
   *   console.log("  accelOne:", data.accelOne);
   * });
   * @return {void}
   * @publish
   */
  "streamAccelOne",
  /**
   * Starts streaming of accelerometer data
   *
   * It uses sphero's data streaming command. User needs to listen
   * for the `dataStreaming` or `accelerometer` event to get the data.
   *
   * @param {Number} [sps=5] samples per second
   * @param {Boolean} [remove=false] forces velocity streaming to stop
   * @example
   * orb.streamAccelerometer();
   *
   * orb.on("accelerometer", function(data) {
   *   console.log("data:");
   *   console.log("  xAccel:", data.xAccel);
   *   console.log("  yAccel:", data.yAccel);
   *   console.log("  zAccel:", data.zAccel);
   * });
   * @return {void}
   * @publish
   */
  "streamAccelerometer",
  /**
   * Generic Data Streaming setup, using Sphero's setDataStraming command.
   *
   * Users need to listen for the `dataStreaming` event, or a custom event, to
   * get the data.
   *
   * @private
   * @param {Object} args event, masks, fields, and sps data
   * @return {void}
   * @publish
   */
  "streamData",
  /**
   * Starts streaming of gyroscope data
   *
   * It uses sphero's data streaming command. User needs to listen
   * for the `dataStreaming` or `gyroscope` event to get the data.
   *
   * @param {Number} [sps=5] samples per second
   * @param {Boolean} [remove=false] forces velocity streaming to stop
   * @example
   * orb.streamGyroscope();
   *
   * orb.on("gyroscope", function(data) {
   *   console.log("data:");
   *   console.log("  xGyro:", data.xGyro);
   *   console.log("  yGyro:", data.yGyro);
   *   console.log("  zGyro:", data.zGyro);
   * });
   * @return {void}
   * @publish
   */
  "streamGyroscope",
  /**
   * Starts streaming of IMU angles data
   *
   * It uses sphero's data streaming command. User needs to listen
   * for the `dataStreaming` or `imuAngles` event to get the data.
   *
   * @param {Number} [sps=5] samples per second
   * @param {Boolean} [remove=false] forces velocity streaming to stop
   * @example
   * orb.streamImuAngles();
   *
   * orb.on("imuAngles", function(data) {
   *   console.log("data:");
   *   console.log("  pitchAngle:", data.pitchAngle);
   *   console.log("  rollAngle:", data.rollAngle);
   *   console.log("  yawAngle:", data.yawAngle);
   * });
   * @return {void}
   * @publish
   */
  "streamImuAngles",
  /**
   * Starts streaming of motor back EMF data
   *
   * It uses sphero's data streaming command. User needs to listen
   * for the `dataStreaming` or `motorsBackEmf` event to get the data.
   *
   * @param {Number} [sps=5] samples per second
   * @param {Boolean} [remove=false] forces velocity streaming to stop
   * @example
   * orb.streamMotorsBackEmf();
   *
   * orb.on("motorsBackEmf", function(data) {
   *   console.log("data:");
   *   console.log("  rMotorBackEmf:", data.rMotorBackEmf);
   *   console.log("  lMotorBackEmf:", data.lMotorBackEmf);
   * });
   * @return {void}
   * @publish
   */
  "streamMotorsBackEmf",
  /**
   * Starts streaming of odometer data
   *
   * It uses sphero's data streaming command. User needs to listen
   * for the `dataStreaming` or `odometer` event to get the data.
   *
   * @param {Number} [sps=5] samples per second
   * @param {Boolean} [remove=false] forces velocity streaming to stop
   * @example
   * orb.streamOdometer();
   *
   * orb.on("odometer", function(data) {
   *   console.log("data:");
   *   console.log("  xOdomoter:", data.xOdomoter);
   *   console.log("  yOdomoter:", data.yOdomoter);
   * });
   * @return {void}
   * @publish
   */
  "streamOdometer",
  /**
   * Starts streaming of velocity data
   *
   * It uses sphero's data streaming command. User needs to listen
   * for the `dataStreaming` or `velocity` event to get the velocity values.
   *
   * @param {Number} [sps=5] samples per second
   * @param {Boolean} [remove=false] forces velocity streaming to stop
   * @example
   * orb.streamVelocity();
   *
   * orb.on("velocity", function(data) {
   *   console.log("data:");
   *   console.log("  xVelocity:", data.xVelocity);
   *   console.log("  yVelocity:", data.yVelocity);
   * });
   * @return {void}
   * @publish
   */
  "streamVelocity",
  /**
   * The Submit value To Input command takes the place of the typical user
   * console in orbBasic and allows a user to answer an input request.
   *
   * If there is no pending input request when this API command is sent, the
   * supplied value is ignored without error.
   *
   * Refer to the orbBasic language document for further information.
   *
   * @param {Number} val value to respond with
   * @param {Function} callback function to be triggered with response
   * @example
   * orb.submitValuetoInput(0x0000FFFF, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @publish
   */
  "submitValueToInput",
  /**
   * The Use Consumable command attempts to use a consumable if the quantity
   * remaining is non-zero.
   *
   * On success, the return message echoes the ID of this consumable and how
   * many of them remain.
   *
   * If the associated macro is already running, or the quantity remaining is
   * zero, this returns an EEXEC error (0x08).
   *
   * @private
   * @param {Number} id what consumable to use
   * @param {Function} callback function to be called with response
   * @example
   * orb.useConsumable(0x00, function(err, data) {
   *   console.log(err || "data: " + data);
   * }
   * @return {void}
   * @private
   */
  "useConsumable",
  /**
   * The Version command returns a batch of software and hardware information
   * about Sphero.
   *
   * @param {Function} callback triggered with version information
   * @example
   * orb.version(function(err, data) {
   *   if (err) {
   *     console.log("error: ", err);
   *   } else {
   *     console.log("data:");
   *     console.log("  recv:", data.recv);
   *     console.log("  mdl:", data.mdl);
   *     console.log("  hw:", data.hw);
   *     console.log("  msaVer:", data.msaVer);
   *     console.log("  msaRev:", data.msaRev);
   *     console.log("  bl:", data.bl);
   *     console.log("  bas:", data.bas);
   *     console.log("  macro:", data.macro);
   *     console.log("  apiMaj:", data.apiMaj);
   *     console.log("  apiMin:", data.apiMin);
   *   }
   * }
   * @return {void}
   * @publish
   */
  "version"
  ];
