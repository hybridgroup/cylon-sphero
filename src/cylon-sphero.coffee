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

Adaptor =
  Sphero: class Sphero

    constructor: (opts) ->
      @self = this
      @connection = opts.connection
      @name = opts.name
      @sphero = Spheron.sphero()

    connect: (connection) ->
      @connection = connection
      console.log "Connecting to Sphero '#{@name}'..."
      @sphero.open(@connection.port.toString())
      @self

    disconnect: ->
      console.log "Disconnecting from Sphero '#{@name}'..."
      @sphero.close

Driver =
  Sphero: class Sphero
    constructor: (opts) ->
      @device = opts.device
