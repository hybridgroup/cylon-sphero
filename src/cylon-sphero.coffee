###
 * cylon-sphero
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';

module.exports =
  adaptor: (args...) ->
    new Adaptor.Sphero(args...)

  driver: (args...) ->
    new Driver.Sphero(args...)

  register: (robot) ->
    console.log "Registering Sphero adaptor for #{robot.name}"
    robot.registerAdaptor 'cylon-sphero', 'sphero'

    console.log "Registering Sphero driver for #{robot.name}"
    robot.registerDriver 'cylon-sphero', 'sphero'

Spheron = require('spheron')

Commands = ['roll', 'setRGB']

Adaptor =
  Sphero: class Sphero

    constructor: (opts) ->
      @self = this
      @connection = opts.connection
      @name = opts.name
      @sphero = Spheron.sphero()

    commands: ->
      Commands

    connect: (connection) ->
      @connection = connection
      console.log "Connecting to Sphero '#{@name}'..."

      @sphero.on 'open', ->
        @connection.emit 'connect', @self

      @sphero.on 'close', ->
        @connection.emit 'disconnect', @self

      @sphero.on 'error', ->
        @connection.emit 'error', @self

      @sphero.on 'data', (data) ->
        @connection.emit 'update', @self, data

      @sphero.on 'message', (data) ->
        @connection.emit 'message', @self, data

      @sphero.on 'notification', (data) ->
        @connection.emit 'notification', @self, data

      @sphero.open(@connection.port.toString())
      @self

    disconnect: ->
      console.log "Disconnecting from Sphero '#{@name}'..."
      @sphero.close

    roll: (speed, heading, state) ->
      @sphero.roll(speed, heading, state)

    setRGB: (color, persist) ->
      @sphero.roll(color, persist)

Driver =
  Sphero: class Sphero
    constructor: (opts) ->
      @device = opts.device
      @connection = @device.connection

    commands: ->
      Commands

    start: ->
      Logger.info "started"
      @connection.on 'message', (data) ->
        @device.emit 'message', @self, data

      @connection.on 'notification', (data) ->
        @device.emit 'notification', @self, data


    roll: (speed, heading, state = 1) ->
      @connection.roll(speed, heading, state)

    setRGB: (color, persist) ->
      @connection.roll(color, persist)
