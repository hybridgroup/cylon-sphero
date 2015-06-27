"use strict";

process.env.NODE_ENV = "test";

var path = require("path");

var chai = require("chai"),
    sinon = require("sinon"),
    sinonChai = require("sinon-chai");

var Cylon = require("cylon");
Cylon.config({ logging: { logger: false } });

chai.use(sinonChai);

global.chai = chai;
global.sinon = sinon;

global.should = chai.should();
global.expect = chai.expect;
global.assert = chai.assert;
global.AssertionError = chai.AssertionError;

global.spy = sinon.spy;
global.stub = sinon.stub;

// convenience function to require modules in lib directory
global.lib = function(module) {
  return require(path.normalize("./../lib/" + module));
};
