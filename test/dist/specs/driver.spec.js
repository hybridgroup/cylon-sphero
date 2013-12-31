(function() {
  'use strict';
  source('driver');

  describe('Cylon.Drivers.Sphero', function() {
    var sphero;
    sphero = new Cylon.Drivers.Sphero({
      device: {}
    });
    it("exposes a 'commands' method exposing all available commands", function() {
      return expect(sphero.commands()).to.be.eql(Cylon.Sphero.Commands);
    });
    return describe("proxies", function() {
      var detectCollisionsSpy, rollSpy, setRGBSpy, stopSpy;
      rollSpy = sinon.spy();
      detectCollisionsSpy = sinon.spy();
      stopSpy = sinon.spy();
      setRGBSpy = sinon.spy();
      sphero.connection = {
        roll: rollSpy,
        detectCollisions: detectCollisionsSpy,
        stop: stopSpy,
        setRGB: setRGBSpy
      };
      it("proxies the #roll method to the @connection", function() {
        sphero.roll();
        return assert(rollSpy.calledOnce);
      });
      it("proxies the #detectCollisions method to the @connection", function() {
        sphero.detectCollisions();
        return assert(detectCollisionsSpy.calledOnce);
      });
      it("proxies the #stop method to the @connection", function() {
        sphero.stop();
        return assert(stopSpy.calledOnce);
      });
      return it("proxies the #setRGB method to the @connection", function() {
        sphero.setRGB();
        return assert(setRGBSpy.calledOnce);
      });
    });
  });

}).call(this);
