###
 * cylon sphero driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';

require './cylon-sphero'

namespace = require 'node-namespace'

namespace "Cylon.Driver", ->
  class @Sphero extends Cylon.Basestar
    constructor: (opts) ->
      super
      @device = opts.device
      @connection = @device.connection
      @proxyMethods Commands, @connection, Sphero

    commands: -> Commands

    start: (callback) ->
      Logger.info "#{@device.name} started"

      @connection.on 'connect', (obj) =>
        @device.emit 'connect'

      @connection.on 'message', (obj, data) =>
        @device.emit 'message', data

      @connection.on 'notification', (obj, data) =>
        @device.emit 'notification', data
        @device.emit 'collision', data

      (callback)(null)

    roll: (speed, heading, state = 1) ->
      @connection.roll(speed, heading, state)

    detectCollisions: ->
      @connection.detectCollisions()

    stop: ->
      @connection.stop()

    setRGB: (color, persist = true) ->
      @connection.setRGB(color, persist)
