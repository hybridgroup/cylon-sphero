"use strict";

var module = source("cylon-sphero");

var Adaptor = source('adaptor'),
    Driver = source('driver');

describe("cylon-sphero", function() {
  describe("#adaptors", function() {
    it('is an array of supplied adaptors', function() {
      expect(module.adaptors).to.be.eql(['sphero']);
    });
  });

  describe("#drivers", function() {
    it('is an array of supplied drivers', function() {
      expect(module.drivers).to.be.eql(['sphero']);
    });
  });

  describe("#adaptor", function() {
    it("returns a new instance of the Sphero adaptor", function() {
      expect(module.adaptor({})).to.be.an.instanceOf(Adaptor);
    });
  });

  describe("#driver", function() {
    it("returns a new instance of the Sphero driver", function() {
      expect(module.driver({ device: { connection: {} } })).to.be.an.instanceOf(Driver);
    });
  });
});
