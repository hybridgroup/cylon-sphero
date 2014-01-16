###
 * cylon sphero adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict'

require './cylon-sphero'

Spheron = require 'spheron'
Colors = require './colors'

namespace = require 'node-namespace'

namespace "Cylon.Adaptors", ->
  class @Sphero extends Cylon.Adaptor
    constructor: (opts = {}) ->
      super
      @sphero = Spheron.sphero()
      @connector = @sphero
      @proxyMethods Cylon.Sphero.Commands, @sphero, this

    commands: ->
      Cylon.Sphero.Commands

    connect: (callback) ->
      Logger.info "Connecting to Sphero '#{@name}'..."

      @connector.on('open', () =>
        callback()
        @connection.emit 'connect'
      )
      @defineAdaptorEvent eventName: 'close', targetEventName: 'disconnect'
      @defineAdaptorEvent eventName: 'error'
      @defineAdaptorEvent eventName: 'data'
      @defineAdaptorEvent eventName: 'message'
      @defineAdaptorEvent eventName: 'notification'

      @sphero.open @connection.port.toString(), (err) =>
        if err
          @connection.emit 'err', err

      true

    disconnect: ->
      Logger.info "Disconnecting from Sphero '#{@name}'..."
      @sphero.close

    detectCollisions: ->
      @sphero.configureCollisionDetection(0x01, 0x40, 0x40, 0x50, 0x50, 0x50,)

    setRGB: (color, persist = true) ->
      @sphero.setRGB color, persist

    setColor: (color, persist) ->
      color = Colors.fromString(color) if typeof color is 'string'
      @setRGB color, persist

    setRandomColor: (persist) ->
      color = Colors.randomColor()
      @setRGB color, persist

    stop: ->
      @sphero.roll 0, 0, 0
