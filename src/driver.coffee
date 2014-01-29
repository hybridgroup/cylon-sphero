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
