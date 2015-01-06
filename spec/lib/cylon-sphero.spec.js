// jshint expr:true
"use strict";

var sphero = source("cylon-sphero");

var Adaptor = source("adaptor"),
    Driver = source("driver");

describe("cylon-sphero", function() {
  describe("#adaptors", function() {
    it("is an array of supplied adaptors", function() {
      expect(sphero.adaptors).to.be.eql(["sphero"]);
    });
  });

  describe("#drivers", function() {
    it("is an array of supplied drivers", function() {
      expect(sphero.drivers).to.be.eql(["sphero"]);
    });
  });

  describe("#adaptor", function() {
    it("returns a new instance of the Sphero adaptor", function() {
      expect(sphero.adaptor({ port: "" })).to.be.an.instanceOf(Adaptor);
    });
  });

  describe("#driver", function() {
    it("returns a new instance of the Sphero driver", function() {
      var driver = sphero.driver({ device: { connection: {} } });
      expect(driver).to.be.an.instanceOf(Driver);
    });
  });
});
