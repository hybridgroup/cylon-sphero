'use strict'

source 'adaptor'

describe 'Cylon.Adaptors.Sphero', ->
  sphero = new Cylon.Adaptors.Sphero

  it "exposes a 'commands' method exposing all available commands", ->
    expect(sphero.commands()).to.be.eql Cylon.Sphero.Commands

  it "exposes a 'connect' method to connect to the Sphero", ->
    expect(sphero.connect).to.be.a 'function'

  it "exposes a 'disconnect' method to disconnect from the Sphero", ->
    expect(sphero.disconnect).to.be.a 'function'

  describe "#detectCollisions", ->
    it "triggers collision detection on the Sphero", ->
      spy = sinon.spy()
      base = sphero.sphero

      sphero.sphero = { configureCollisionDetection: spy }
      sphero.detectCollisions()

      assert spy.calledOnce

      sphero.sphero = base

  describe 'colors', ->
    spy = sinon.spy()
    base = sphero.sphero

    sphero.sphero = { setRGB: spy }

    describe "#setRGB", ->
      sphero.setRGB 0x7FFF00

      it "sets the color on the Sphero", ->
        assert spy.calledWith 0x7FFF00

      it "sets the 'persist' argument to true by default", ->
        assert spy.calledWith 0x7FFF00, true
        sphero.setRGB 0x7FFF00, false
        assert spy.calledWith 0x7FFF00, false

    describe "#setColor", ->
      it "sets the Sphero color to based on the passed color name", ->
        sphero.setColor 'olivedrab'
        assert spy.calledWith 0x6B8E23
        sphero.sphero = base

    describe "#setRandomColor", ->
      it "sets the Sphero to a random color", ->
        newSpy = sinon.spy()
        sphero.sphero.setRGB = newSpy
        sphero.setRandomColor()
        expect(newSpy.getCall(0).args[0]).to.be.a 'number'
