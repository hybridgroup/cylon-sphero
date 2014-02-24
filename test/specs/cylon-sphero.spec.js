"use strict";

var namespace = require('node-namespace'),
    sphero = source("cylon-sphero");

describe("Cylon.Sphero", function() {
  it("can register the adaptor and driver", function() {
    sphero.register.should.be.a('function');
  });

  it("can create adaptor", function() {
    sphero.adaptor.should.be.a('function');
  });

  it("can create driver", function() {
    sphero.driver.should.be.a('function');
  });
});
