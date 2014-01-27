###
 * cylon sphero driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict'

require './cylon-sphero'

namespace = require 'node-namespace'

namespace "Cylon.Drivers", ->
  class @Sphero extends Cylon.Driver
    constructor: (opts = {}) ->
      super
      @proxyMethods Cylon.Sphero.Commands, @connection, this

    commands: -> Cylon.Sphero.Commands

    start: (callback) ->
      @defineDriverEvent eventName: 'connect'
      @defineDriverEvent eventName: 'message'
      @defineDriverEvent eventName: 'update'
      @defineDriverEvent eventName: 'notification'
      @defineDriverEvent eventName: 'notification', targetEventName: 'collision'

      super

# Public: abortMacro()
# This command aborts any executing macro and returns both 
# its ID code and the command number currently in process.
#
# Returns (ID code , command number).

# Public: abortOrbBasicProgram()
# Aborts execution of any currently running orbBasic program.
#
# Returns null.

# Public: appendMacroChunk(chunk)
# This stores the attached macro definition into the temporary RAM 
# buffer for later execution. It is similar to the Save Temporary Macro 
# call but allows you to build up longer temporary macros.
#
# chunk - params
#
# Returns true | false.

# Public: appendOrbBasicFragment(area, programCode)
# Sending an orbBasic program to Sphero involves appending blocks of 
# text to existing ones in the specified storage area.
#
# area - params
# programCode - params
#
# Returns true | false.

# Public: configureCollisionDetection(meth, xT, yT, xSpd, ySpd, dead)
# Sets the sphero to detect collisions and report them.
#
# meth - params
# xT - params
# yT - params
# xSpd - params
# ySpd - params
# dead - params
#
# Returns true | false.

# Public: configureLocator(flag, x, y, yawTare)
# Through the streaming interface, Sphero provides real-time location 
# data in the form of (X,Y) coordinates on the ground plane.
#
# flag - params
# x - params
# y - params
# yawTare - params
#
# Returns true | false.

# Public: eraseOrbBasicStorage(area)
# This erases any existing program in the specified storage area. Specify 
# 00h for the temporary RAM buffer or 01h for the persistent storage area.
#
# area - params
#
# Returns null.

# Public: executeOrbBasicProgram(area, startLine)
# This attempts to run a program in the specified storage area beginning 
# at the specified line number. This command will fail if there is already 
# an orbBasic program executing.
#
# area - params
# startLine - params
#
# Returns null.

# Public: getApplicationConfigurationBlock()
# This allows you to retrieve the application configuration block that is 
# set aside for exclusive use by applications.
#
# Returns null.

# Public: getConfigurationBlock(id)
# This command retrieves one of the configuration blocks.
#
# id - params
#
# Returns null. 

# Public: getDeviceMode()
# Gets the operation mode of Sphero based on the supplied mode value.
#
# Returns 00h (Normal mode) | 01h (User Hack mode). 

# Public: getMacroStatus()
# This command returns the ID code and command number of the currently executing macro.
#
# Returns (ID code, cmd number, cmd number). 

# Public: getPermanentOptionFlags()
# This command returns the ID code and command number of the currently executing macro.
#
# Returns FLAGS opt: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 6-31. 

# Public: getRGB()
# This retrieves the "user LED color" which is stored in the config block.
#
# Returns (red,green,blue) | (color).

# Public: getTemporaryOptionFlags()
# Returns the temporary option flags.
#
# Returns FLAGS opt: 0 | 1-31.

# Public: reInitializeMacroExecutive()
# This terminates any running macro and reinitializes the macro system.
#
# Returns null.

# Public: readLocator()
# This reads Sphero's current position (X,Y), component velocities and SOG (speed over ground).
#
# Returns (XPOS, YPOS, XVEL, YVEL, SOG).

# Public: roll(speed, heading, state)
# This commands Sphero to roll along the provided vector. Both a speed and a 
# heading are required; the latter is considered relative to the last calibrated direction.
#
# speed - params
# heading - params
# state - params
#
# Returns null.
    roll: (speed, heading, state = 1) ->
      @connection.roll speed, heading, state

# Public: detectCollisions()
# Sets the sphero to detect collisions and report them.
#
# Returns null. 
    detectCollisions: ->
      @connection.detectCollisions()

# Public: runMacro(seq, dLen, id)
# This attempts to execute the specified macro.
#
# seq - params
# dLen - params
# id - params
#
# Returns null. 

# Public: saveMacro(data)
# This stores the attached macro definition into the persistent store for later execution.
#
# data - params
#
# Returns null. 

# Public: saveTemporaryMacro(data)
# This stores the attached macro definition into the temporary RAM buffer for later execution.
#
# data - params
#
# Returns null. 

# Public: selfLevel(options, angleLimit, timeout, trueTime)
# This command controls the self level routine.
#
# options - params
# angleLimit - params
# timeout - params
# trueTime - params
#
# Returns options: array [(0 | 1 | 2 |3 ), (0 | 1 to 90), (0 | 1 to 255), (0 | 1 to 255)]. 

# Public: setAccelerometerRange(range)
# This command controls the self level routine.
#
# range - params
#
# Returns integer opt: 0 | 1 | 2 | 3. 

# Public: setApplicationConfigurationBlock()
# This allows you to retrieve the application configuration block that is set 
# aside for exclusive use by applications.
#
# Returns null. 

# Public: setBackLED(level)
# This allows you to control the brightness of the back LED. The value does 
# not persist across power cycles.
#
# level - params
#
# Returns null. 

# Public: setBoostWithTime(state)
#
# state - params
#
# Returns null. 

# Public: setColor(color)
# This allows you to set the color of the sphero, just pass an array 
# containing RGB hex or a string with one of the color names of the list.
#
# color - params
#
# Returns null. 

# Public: setConfigurationBlock(value)
# This command accepts an exact copy of the configuration block and loads 
# it into the RAM copy of the configuration block.
#
# value - params
#
# Returns null. 

# Public: setDataStreaming(n, m, mask, pcnt, mask2)
# Sphero supports asynchronous data streaming of certain control system and sensor parameters.
#
# n - params
# m -params
# mask - params
# pcnt - params
# mask2 - params
#
# Returns null. 

# Public: setDeviceMode(mode)
# Assigns the operation mode of Sphero based on the supplied mode value.
#
# mode - params
#
# Returns null. 

# Public: setHeading(heading)
# This allows the smartphone client to adjust the orientation of Sphero by 
# commanding a new reference heading in degrees, which ranges from 0 to 359.
#
# heading - params
#
# Returns null. 

# Public: setMacroParameter(param, val1, val2)
# This command allows system globals that influence certain macro commands 
# to be selectively altered from outside of the macro system itself.
#
# param - params
# val1 - params
# val2 - params
#
# Returns null. 

# Public: setMotionTimeout(time)
# This sets the ultimate timeout for the last motion command to keep 
# Sphero from rolling away in the case of a crashed (or paused) client app.
#
# time - params
#
# Returns null. 

# Public: setPermanentOptionFlags(flags)
# Assigns the permanent option flags to the provided value and writes them 
# immediately to the config block for persistence across power cycles.
#
# flags - params
#
# Returns null.

# Public: stop()
# Stop the driver.
#
# Returns null.  
    stop: ->
      @connection.stop()

# Public: setRGB(color, persist)
# This allows you to set the RGB LED color, just pass an array containing 
# RGB hex or a string with one of the color names of the list.
#
# color - params
# persist - params
#
# Returns null. 
    setRGB: (color, persist = true) ->
      @connection.setRGB color, persist

# Public: setRawMotorValues(lMode, lPower, rMode, rPower)
# This allows you to take over one or both of the motor output values, 
# instead of having the stabilization system control them.
#
# lMode - params
# lPower - params
# rMode - params
# rPower - params
#
# Returns null. 

# Public: setRotationRate(rate)
# This allows you to control the rotation rate that Sphero will use to meet 
# new heading commands.
#
# rate - params
#
# Returns null. 

# Public: setStabalization(on)
#
# on - params
#
# Returns null. 

# Public: setTemporaryOptionFlags(flags)
# Assigns the temporary option flags to the provided value. These do not persist 
# across a power cycle. See below for the bit definitions.
#
# flags - params
#
# Returns null. 

# Public: submitValueToInputStatement(val)
# This takes the place of the typical user console in orbBasic and allows a 
# user to answer an input request.
#
# val - params
#
# Returns null. 

# Public: startCalibration()
# Starts the calibration of the driver.
#
# Returns null. 
    startCalibration: ->
      @connection.setBackLED 127
      @connection.setStabilization 0

# Public: finishCalibration()
# Finish the calibration of the driver.
#
# Returns null. 
    finishCalibration: ->
      @connection.setHeading 0
      @connection.setBackLED 0
      @connection.setStabilization 1
