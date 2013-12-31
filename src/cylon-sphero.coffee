###
 * cylon-sphero
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict'

namespace = require 'node-namespace'

require 'cylon'
require './commands'
require './adaptor'
require './driver'

module.exports =
  adaptor: (args...) ->
    new Cylon.Adaptors.Sphero(args...)

  driver: (args...) ->
    new Cylon.Drivers.Sphero(args...)

  register: (robot) ->
    Logger.info "Registering Sphero adaptor for #{robot.name}"
    robot.registerAdaptor 'cylon-sphero', 'sphero'

    Logger.info "Registering Sphero driver for #{robot.name}"
    robot.registerDriver 'cylon-sphero', 'sphero'
