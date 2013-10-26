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
    Logger.info "Registering Sphero adaptor for #{robot.name}"
    robot.registerAdaptor 'cylon-sphero', 'sphero'

    Logger.info "Registering Sphero driver for #{robot.name}"
    robot.registerDriver 'cylon-sphero', 'sphero'

Spheron = require('spheron')

Commands = ['roll', 'setRGB', 'detectCollisions', 'stop']

class Base
  constructor: (opts) ->
    @self = this

  commands: ->
    Commands

Adaptor =
  Sphero: class Sphero extends Base
    constructor: (opts) ->
      super
      @connection = opts.connection
      @name = opts.name
      @sphero = Spheron.sphero()
      @setupCommands()

    connect: (connection) ->
      @connection = connection
      Logger.info "Connecting to Sphero '#{@name}'..."

      @sphero.on 'open', =>
        @connection.emit 'connect', @self

      @sphero.on 'close', =>
        @connection.emit 'disconnect', @self

      @sphero.on 'error', =>
        @connection.emit 'error', @self

      @sphero.on 'data', (data) =>
        @connection.emit 'update', @self, data

      @sphero.on 'message', (data) =>
        @connection.emit 'message', @self, data

      @sphero.on 'notification', (data) =>
        @connection.emit 'notification', @self, data

      @sphero.open(@connection.port.toString())
      @self

    disconnect: ->
      Logger.info "Disconnecting from Sphero '#{@name}'..."
      @sphero.close

    setupCommands: ->
      for command in Commands
        return if typeof @self[command] is 'function'
        @self[command] = (args...) -> @sphero[command](args...)

    roll: (speed, heading, state) ->
      @sphero.roll(speed, heading, state)

    setRGB: (color, persist) ->
      @sphero.setRGB(color, persist)

    detectCollisions: ->
      @sphero.configureCollisionDetection(0x01, 0x20, 0x20, 0x20, 0x20, 0x50,)

    stop: ->
      @sphero.roll(0, 0, 0)

Driver =
  Sphero: class Sphero extends Base
    constructor: (opts) ->
      super
      @device = opts.device
      @connection = @device.connection
      @setupCommands()

    start: ->
      Logger.info "#{@device.name} started"

      @connection.on 'connect', (obj) =>
        @device.emit 'connect'

      @connection.on 'message', (obj, data) =>
        @device.emit 'message', data

      @connection.on 'notification', (obj, data) =>
        @device.emit 'notification', data

    setupCommands: ->
      for command in Commands
        return if typeof @self[command] is 'function'
        @self[command] = (args...) -> @connection[command](args...)

    roll: (speed, heading, state = 1) ->
      @connection.roll(speed, heading, state)

    detectCollisions: ->
      @connection.detectCollisions()

    stop: ->
      @connection.stop()

    setRGB: (color, persist = true) ->
      @connection.setRGB(color, persist)
