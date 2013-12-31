'use strict'

source 'driver'

describe 'Cylon.Drivers.Sphero', ->
  sphero = new Cylon.Drivers.Sphero
    device: {}

  it "exposes a 'commands' method exposing all available commands", ->
    expect(sphero.commands()).to.be.eql Cylon.Sphero.Commands

  describe "proxies", ->
    rollSpy = sinon.spy()
    detectCollisionsSpy = sinon.spy()
    stopSpy = sinon.spy()
    setRGBSpy = sinon.spy()

    sphero.connection = {
      roll: rollSpy,
      detectCollisions: detectCollisionsSpy,
      stop: stopSpy,
      setRGB: setRGBSpy
    }

    it "proxies the #roll method to the @connection", ->
      sphero.roll()
      assert rollSpy.calledOnce

    it "proxies the #detectCollisions method to the @connection", ->
      sphero.detectCollisions()
      assert detectCollisionsSpy.calledOnce

    it "proxies the #stop method to the @connection", ->
      sphero.stop()
      assert stopSpy.calledOnce

    it "proxies the #setRGB method to the @connection", ->
      sphero.setRGB()
      assert setRGBSpy.calledOnce
