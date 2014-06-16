"use strict";

var sphero = source("cylon-sphero");

describe("Cylon.Sphero", function() {
  it("can register the adaptor and driver", function() {
    sphero.register.should.be.a('function');
  });

  it("can create adaptor", function() {
    sphero.adaptor.should.be.a('function');
    expect(sphero.adaptor({ extraParams: {} })).to.be.a('object');
  });

  it("can create driver", function() {
    sphero.driver.should.be.a('function');
    expect(sphero.driver({ device: {} })).to.be.a('object');
  });
});
