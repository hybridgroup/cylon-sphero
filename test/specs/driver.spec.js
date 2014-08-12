"use strict";

var Driver = source('driver'),
    Commands = source('commands');

describe('Driver', function() {
  var sphero
  beforeEach(function() {
    sphero = new Driver({ device: {} });
  })

  describe("#constructor", function() {
    beforeEach(function() {
      stub(Driver.prototype, 'proxyMethods');
      sphero = new Driver({ device: {} })
    });

    afterEach(function() {
      Driver.prototype.proxyMethods.restore();
    });

    it("proxies methods to the connection", function() {
      var proxy = sphero.proxyMethods;
      expect(proxy).to.be.calledWith(Commands, sphero.connection, sphero);
    });
  });

  describe("#commands", function() {
    it("is an object containing Sphero commands", function() {
      for (var c in sphero.commands) {
        expect(sphero.commands[c]).to.be.a('function');
      }
    });
  });

  describe("#start", function() {
    var setTemporaryOptionFlags;
    beforeEach(function() {
      stub(sphero, 'defineDriverEvent');
      sphero.connection = { setTemporaryOptionFlags: spy() }
      setTemporaryOptionFlags = sphero.connection.setTemporaryOptionFlags;
    });

    afterEach(function() {
      sphero.defineDriverEvent.restore();
    });

    it("set temp option flags to stop on disconnect", function() {
      sphero.start(function() {});

      expect(setTemporaryOptionFlags).to.be.calledWith(0x01);
    });

    it("defines Driver events", function() {
      var events = [
        'connect', 'message', 'update', 'notification',
        'collision', 'data'
      ];

      sphero.start(function() {});

      events.forEach(function(event) {
        expect(sphero.defineDriverEvent).to.be.calledWith({ eventName: event });
      });
    });
  });

  describe("#roll", function() {
    var roll;
    beforeEach(function() {
      sphero.connection = { roll: spy() };
      roll = sphero.connection.roll;
    });

    it("tells the sphero to roll", function() {
      sphero.roll('speed', 'heading', 'state');
      expect(roll).to.be.calledWith('speed', 'heading', 'state');
    });

    it('defaults state to 1', function() {
      sphero.roll('speed', 'heading');
      expect(roll).to.be.calledWith('speed', 'heading', 1);
    });
  });

  describe("#detectCollisions", function() {
    beforeEach(function() {
      sphero.connection = { detectCollisions: spy() };
    });

    it("tells the Sphero to detect collisions", function() {
      sphero.detectCollisions();
      expect(sphero.connection.detectCollisions).to.be.called;
    });
  });

  describe("#stop", function() {
    beforeEach(function() {
      sphero.connection = { stop: spy() };
    });

    it("tells the Sphero to stop", function() {
      sphero.stop();
      expect(sphero.connection.stop).to.be.called;
    });
  });

  describe("#setRGB", function() {
    beforeEach(function() {
      sphero.connection = { setRGB: spy() };
    });

    it("tells the Sphero to set the RGBs to a color", function() {
      sphero.setRGB('color', 'persist');
      expect(sphero.connection.setRGB).to.be.calledWith('color', 'persist');
    });

    it("defaults persistence to true", function() {
      sphero.setRGB('color');
      expect(sphero.connection.setRGB).to.be.calledWith('color', true);
    });
  });

  describe("#startCalibration", function() {
    beforeEach(function() {
      sphero.connection = { setBackLED: spy(), setStabilization: spy() };
    });

    it("tells the Sphero to start the calibration", function() {
      sphero.startCalibration();
      expect(sphero.connection.setBackLED).to.be.calledWith(127);
      expect(sphero.connection.setStabilization).to.be.calledWith(0);
    });
  });

  describe("#finishCalibration", function() {
    beforeEach(function() {
      sphero.connection = {
        setHeading: spy(),
        setBackLED: spy(),
        setStabilization: spy()
      };
    });

    it("tells the Sphero to finish the calibration", function() {
      sphero.finishCalibration();
      expect(sphero.connection.setHeading).to.be.calledWith(0);
      expect(sphero.connection.setBackLED).to.be.calledWith(0);
      expect(sphero.connection.setStabilization).to.be.calledWith(1);
    });
  });
});
