"use strict";

source('driver');

describe('Cylon.Drivers.Sphero', function() {
  var sphero = new Cylon.Drivers.Sphero({ device: {} });

  it("exposes a 'commands' method exposing all available commands", function() {
    expect(sphero.commands()).to.be.eql(Cylon.Sphero.Commands);
  });

  describe("proxies", function() {
    var spy = sinon.spy;
    var connection = {
      roll: spy(),
      detectCollisions: spy(),
      stop: spy(),
      setRGB: spy()
    }

    sphero.connection = connection;

    it("proxies the #roll method to the @connection", function() {
      sphero.roll();
      assert(connection.roll.calledOnce);
    });

    it("proxies the #detectCollisions method to the @connection", function() {
      sphero.detectCollisions();
      assert(connection.detectCollisions.calledOnce);
    });

    it("proxies the #stop method to the @connection", function() {
      sphero.stop();
      assert(connection.stop.calledOnce);
    });

    it("proxies the #setRGB method to the @connection", function() {
      sphero.setRGB();
      assert(connection.setRGB.calledOnce);
    });

    it("should be able to startCalibration");

    it("should be able to finishCalibration");
  });
});
