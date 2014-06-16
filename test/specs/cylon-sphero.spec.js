"use strict";

var module = source("cylon-sphero");

var Adaptor = source('adaptor'),
    Driver = source('driver');

describe("cylon-sphero", function() {
  describe("#register", function() {
    var robot;

    beforeEach(function() {
      robot = { registerDriver: spy(), registerAdaptor: spy() };
      module.register(robot);
    });

    it("registers the cylon-sphero adaptor", function() {
      expect(robot.registerAdaptor).to.be.calledWith("cylon-sphero", "sphero");
    });

    it("registers the cylon-sphero driver", function() {
      expect(robot.registerDriver).to.be.calledWith("cylon-sphero", "sphero");
    });
  });

  describe("#adaptor", function() {
    it("returns a new instance of the Sphero adaptor", function() {
      expect(module.adaptor({ extraParams: {} })).to.be.an.instanceOf(Adaptor);
    });
  });

  describe("#driver", function() {
    it("returns a new instance of the Sphero driver", function() {
      expect(module.driver({ device: {} })).to.be.an.instanceOf(Driver);
    });
  });
});
