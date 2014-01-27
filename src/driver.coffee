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

    # Public: Starts the driver.
    #
    # callback - params
    #
    # Returns null.
    start: (callback) ->
      @defineDriverEvent eventName: 'connect'
      @defineDriverEvent eventName: 'message'
      @defineDriverEvent eventName: 'update'
      @defineDriverEvent eventName: 'notification'
      @defineDriverEvent eventName: 'notification', targetEventName: 'collision'

      super

    # Public: This command aborts any executing macro and returns both 
    # its ID code and the command number currently in process.
    #
    # Returns (ID code , command number).

    # Public: Aborts execution of any currently running orbBasic program.
    #
    # Returns null.

    # Public: This stores the attached macro definition into the temporary RAM 
    # buffer for later execution. It is similar to the Save Temporary Macro 
    # call but allows you to build up longer temporary macros.
    #
    # chunk - params
    #
    # Returns true | false.

    # Public: Sending an orbBasic program to Sphero involves appending blocks of 
    # text to existing ones in the specified storage area.
    #
    # area - params
    # programCode - params
    #
    # Returns true | false.

    # Public: Sets the sphero to detect collisions and report them.
    #
    # meth - params
    # xT - params
    # yT - params
    # xSpd - params
    # ySpd - params
    # dead - params
    #
    # Returns true | false.

    # Public: Through the streaming interface, Sphero provides real-time location 
    # data in the form of (X,Y) coordinates on the ground plane.
    #
    # flag - params
    # x - params
    # y - params
    # yawTare - params
    #
    # Returns true | false.

    # Public: This erases any existing program in the specified storage area. Specify 
    # 00h for the temporary RAM buffer or 01h for the persistent storage area.
    #
    # area - params
    #
    # Returns null.

    # Public: This attempts to run a program in the specified storage area beginning 
    # at the specified line number. This command will fail if there is already 
    # an orbBasic program executing.
    #
    # area - params
    # startLine - params
    #
    # Returns null.

    # Public: This allows you to retrieve the application configuration block that is 
    # set aside for exclusive use by applications.
    #
    # Returns null.

    # Public: This command retrieves one of the configuration blocks.
    #
    # id - params
    #
    # Returns null. 

    # Public: Gets the operation mode of Sphero based on the supplied mode value.
    #
    # Returns 00h (Normal mode) | 01h (User Hack mode). 

    # Public: This command returns the ID code and command number of the currently executing macro.
    #
    # Returns (ID code, cmd number, cmd number). 

    # Public: This command returns the ID code and command number of the currently executing macro.
    #
    # Returns FLAGS opt: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 6-31. 

    # Public: This retrieves the "user LED color" which is stored in the config block.
    #
    # Returns (red,green,blue) | (color).

    # Public: getTemporaryOptionFlags()
    # Returns the temporary option flags.
    #
    # Returns FLAGS opt: 0 | 1-31.

    # Public: This terminates any running macro and reinitializes the macro system.
    #
    # Returns null.

    # Public: This reads Sphero's current position (X,Y), component velocities and SOG (speed over ground).
    #
    # Returns (XPOS, YPOS, XVEL, YVEL, SOG).

    # Public: This commands Sphero to roll along the provided vector. Both a speed and a 
    # heading are required; the latter is considered relative to the last calibrated direction.
    #
    # speed - params
    # heading - params
    # state - params
    #
    # Returns null.
    roll: (speed, heading, state = 1) ->
      @connection.roll speed, heading, state

    # Public: Sets the sphero to detect collisions and report them.
    #
    # Returns null. 
    detectCollisions: ->
      @connection.detectCollisions()

    # Public: This attempts to execute the specified macro.
    #
    # seq - params
    # dLen - params
    # id - params
    #
    # Returns null. 

    # Public: This stores the attached macro definition into the persistent store for later execution.
    #
    # data - params
    #
    # Returns null. 

    # Public: This stores the attached macro definition into the temporary RAM buffer for later execution.
    #
    # data - params
    #
    # Returns null. 

    # Public: This command controls the self level routine.
    #
    # options - params
    # angleLimit - params
    # timeout - params
    # trueTime - params
    #
    # Returns options: array [(0 | 1 | 2 |3 ), (0 | 1 to 90), (0 | 1 to 255), (0 | 1 to 255)]. 

    # Public: This command controls the self level routine.
    #
    # range - params
    #
    # Returns integer opt: 0 | 1 | 2 | 3. 

    # Public: This allows you to retrieve the application configuration block that is set 
    # aside for exclusive use by applications.
    #
    # Returns null. 

    # Public: This allows you to control the brightness of the back LED. The value does 
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

    # Public: This allows you to set the color of the sphero, just pass an array 
    # containing RGB hex or a string with one of the color names of the list.
    #
    # color - params
    #
    # Returns null. 

    # Public: This command accepts an exact copy of the configuration block and loads 
    # it into the RAM copy of the configuration block.
    #
    # value - params
    #
    # Returns null. 

    # Public: Sphero supports asynchronous data streaming of certain control system and sensor parameters.
    #
    # n - params
    # m -params
    # mask - params
    # pcnt - params
    # mask2 - params
    #
    # Returns null. 

    # Public: Assigns the operation mode of Sphero based on the supplied mode value.
    #
    # mode - params
    #
    # Returns null. 

    # Public: This allows the smartphone client to adjust the orientation of Sphero by 
    # commanding a new reference heading in degrees, which ranges from 0 to 359.
    #
    # heading - params
    #
    # Returns null. 

    # Public: This command allows system globals that influence certain macro commands 
    # to be selectively altered from outside of the macro system itself.
    #
    # param - params
    # val1 - params
    # val2 - params
    #
    # Returns null. 

    # Public: This sets the ultimate timeout for the last motion command to keep 
    # Sphero from rolling away in the case of a crashed (or paused) client app.
    #
    # time - params
    #
    # Returns null. 

    # Public: Assigns the permanent option flags to the provided value and writes them 
    # immediately to the config block for persistence across power cycles.
    #
    # flags - params
    #
    # Returns null.

    # Public: Stop the driver.
    #
    # Returns null.  
    stop: ->
      @connection.stop()

    # Public: This allows you to set the RGB LED color, just pass an array containing 
    # RGB hex or a string with one of the color names of the list.
    #
    # color - params
    # persist - params
    #
    # Returns null. 
    setRGB: (color, persist = true) ->
      @connection.setRGB color, persist

    # Public: This allows you to take over one or both of the motor output values, 
    # instead of having the stabilization system control them.
    #
    # lMode - params
    # lPower - params
    # rMode - params
    # rPower - params
    #
    # Returns null. 

    # Public: This allows you to control the rotation rate that Sphero will use to meet 
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

    # Public: Assigns the temporary option flags to the provided value. These do not persist 
    # across a power cycle. See below for the bit definitions.
    #
    # flags - params
    #
    # Returns null. 

    # Public: This takes the place of the typical user console in orbBasic and allows a 
    # user to answer an input request.
    #
    # val - params
    #
    # Returns null. 

    # Public: Starts the calibration of the driver.
    #
    # Returns null. 
    startCalibration: ->
      @connection.setBackLED 127
      @connection.setStabilization 0

    # Public: Finish the calibration of the driver.
    #
    # Returns null. 
    finishCalibration: ->
      @connection.setHeading 0
      @connection.setBackLED 0
      @connection.setStabilization 1
