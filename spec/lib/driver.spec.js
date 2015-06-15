"use strict";

var Driver = lib("driver"),
    Commands = lib("commands");

var Utils = require("cylon").Utils;

describe("Driver", function() {
  var sphero;

  beforeEach(function() {
    sphero = new Driver({ connection: {} });
  });

  describe("#constructor", function() {
    beforeEach(function() {
      stub(Utils, "proxyFunctionsToObject");
      sphero = new Driver({ connection: {} });
    });

    afterEach(function() {
      Utils.proxyFunctionsToObject.restore();
    });

    it("proxies methods to the connection", function() {
      var proxy = Utils.proxyFunctionsToObject;
      expect(proxy).to.be.calledWith(Commands, sphero.connection, sphero);
    });
  });

  describe("#commands", function() {
    it("is an object containing Sphero commands", function() {
      for (var c in sphero.commands) {
        expect(sphero.commands[c]).to.be.a("function");
      }
    });
  });

  describe("#start", function() {
    var setTempOptionFlags;
    beforeEach(function() {
      stub(sphero, "defineDriverEvent");
      setTempOptionFlags = sphero.connection.setTempOptionFlags = spy();
    });

    afterEach(function() {
      sphero.defineDriverEvent.restore();
    });

    it("set temp option flags to stop on disconnect", function() {
      sphero.start(function() {});

      expect(setTempOptionFlags).to.be.calledWith(0x01);
    });

    it("defines Driver events", function() {
      var events = [
        "connect",
        "disconnect",
        "error",
        "version",
        "battery",
        "response",
        "async",
        "collision",
        "data"
      ];

      sphero.start(function() {});

      events.forEach(function(event) {
        expect(sphero.defineDriverEvent).to.be.calledWith(event);
      });
    });
  });

  describe("#halt", function() {
    var callback;

    beforeEach(function() {
      callback = spy();
      sphero.connection.disconnect = stub();
      sphero.connection.disconnect.yields();
      sphero.halt(callback);
    });

    it("calls #sphero.disconnect once", function() {
      expect(sphero.connection.disconnect).to.be.calledOnce;
    });

    it("triggers the callback", function() {
      expect(callback).to.be.calledOnce;
    });
  });
});
