'use strict'

namespace = require 'node-namespace'

sphero = source("cylon-sphero")

describe "Cylon.Sphero", ->
  it "standard async test", (done) ->
    bool = false
    bool.should.be.false

    setTimeout ->
      bool.should.be.false
      bool = true
      bool.should.be.true
    150

    setTimeout ->
      bool.should.be.true
      done()
    300

  it "standard sync test", ->
    data = []
    obj = id: 5, name: 'test'
    data.should.be.empty
    data.push obj
    data.should.have.length 1
    # soft equal
    data[0].should.be.eql obj
    # hard equal
    data[0].should.be.equal obj

  it "can register the adaptor and driver", ->
    sphero.register.should.be.a 'function'

  it "can create adaptor", ->
    sphero.adaptor.should.be.a 'function'

  it "can create driver", ->
    sphero.driver.should.be.a 'function'
