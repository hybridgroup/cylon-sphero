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

    roll: (speed, heading, state = 1) ->
      @connection.roll speed, heading, state

    detectCollisions: ->
      @connection.detectCollisions()

    stop: ->
      @connection.stop()

    setRGB: (color, persist = true) ->
      @connection.setRGB color, persist
