###
 * cylon sphero adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';

require './cylon-sphero'

namespace = require 'node-namespace'

namespace "Cylon.Adaptor", ->
  class @Sphero extends Cylon.Basestar
    constructor: (opts) ->
      super
      @connection = opts.connection
      @name = opts.name
      @sphero = Spheron.sphero()
      @proxyMethods Commands, @sphero, Sphero

    commands: -> Commands

    connect: (callback) ->
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
      (callback)(null)

    disconnect: ->
      Logger.info "Disconnecting from Sphero '#{@name}'..."
      @sphero.close

    detectCollisions: ->
      @sphero.configureCollisionDetection(0x01, 0x40, 0x40, 0x50, 0x50, 0x50,)

     setRGB: (color, persist) ->
      @sphero.setRGB(color, persist)

    stop: ->
      @sphero.roll(0, 0, 0)