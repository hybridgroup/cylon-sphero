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
    new Sphero(args...)

  register: (robot) ->
    console.log "Registering Sphero adaptor for #{robot.name}"

class Sphero
  self = this

  constructor: (opts) ->
    @name = opts.name

  connect: ->
    console.log "Connecting to Sphero '#{@name}'..."
    self

  disconnect: ->
    console.log "Disconnecting from Sphero '#{@name}'..."
