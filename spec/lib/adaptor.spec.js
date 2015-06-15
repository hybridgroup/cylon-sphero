"use strict";

var Adaptor = lib("adaptor"),
    Commands = lib("commands");

var Cylon = require("cylon");

describe("Adaptor", function() {
  var sphero, opts;

  beforeEach(function() {
    opts = { port: "/dev/rfcomm0" };
    sphero = new Adaptor(opts);
    Cylon.Logger = {
      info: stub(),
      error: stub()
    };
  });

  afterEach(function() {
  });

  describe("constructor", function() {
    beforeEach(function() {
      opts = { port: "/dev/rfcomm0", locatorOpts: "opts" };
      stub(Adaptor.prototype, "proxyMethods");
      sphero = new Adaptor(opts);
    });

    afterEach(function() {
      Adaptor.prototype.proxyMethods.restore();
    });

    it("sets @sphero to a sphero.js instance", function() {
      expect(sphero.sphero).to.not.be.null;
    });

    it("sets @connector to the Sphero instance", function() {
      expect(sphero.connector).to.not.be.null;
    });

    it("sets @locatorOpts to the provided options", function() {
      expect(sphero.locatorOpts).to.be.eql("opts");
    });

    it("sets two bitmasks to 0x00000000", function() {
      expect(sphero.mask1).to.be.eql(0x00000000);
      expect(sphero.mask2).to.be.eql(0x00000000);
    });

    it("proxies Sphero commands from the Adaptor to the Sphero", function() {
      expect(sphero.proxyMethods).to.be.calledWith(
        Commands,
        sphero.sphero,
        sphero
      );
    });

    context("if opts are NOT provided", function() {
      it("throws an error", function() {
        var fn = function() { return new Adaptor(); };
        expect(fn).to.throw(
          "No port specified for Sphero adaptor 'undefined'. Cannot proceed"
        );
      });
    });

    context("if no port is specified", function() {
      it("throws an error", function() {
        var fn = function() { return new Adaptor({ name: "hi" }); };
        expect(fn).to.throw(
          "No port specified for Sphero adaptor 'hi'. Cannot proceed"
        );
      });
    });
  });

  describe("#commands", function() {
    it("is an array of Sphero commands", function() {
      expect(sphero.commands).to.be.eql(Commands);
    });
  });

  describe("#connect", function() {
    var emitter, callback;

    beforeEach(function() {
      callback = spy();
      emitter = { on: stub(), connect: stub() };
      sphero.connector = sphero.sphero = emitter;
      sphero.sphero.connect.yields();
      sphero.emit = spy();

      stub(sphero, "defineAdaptorEvent");
    });

    afterEach(function() {
      sphero.defineAdaptorEvent.restore();
    });

    context("when the Sphero connection opens", function() {
      beforeEach(function() {
        emitter.on.withArgs("open").yields();
      });

      it("triggers the provided callback", function() {
        sphero.connect(callback);
        expect(callback).to.be.called;
      });
    });

    it("defines adaptor events", function() {
      var d = sphero.defineAdaptorEvent;

      sphero.connect(callback);

      expect(d).to.be.calledWith({ event: "open", targetEvent: "connect" });
      expect(d).to.be.calledWith("connect");
      expect(d).to.be.calledWith("disconnect");
      expect(d).to.be.calledWith("error");
      expect(d).to.be.calledWith("response");
      expect(d).to.be.calledWith("async");
      expect(d).to.be.calledWith("data");
      expect(d).to.be.calledWith("collision");
      expect(d).to.be.calledWith("version");
      expect(d).to.be.calledWith("bluetoothInfo");
      expect(d).to.be.calledWith("powerStateInfo");
      expect(d).to.be.calledWith("readLocator");
      expect(d).to.be.calledWith("battery");
      expect(d).to.be.calledWith("dataStreaming");
    });

    it("opens a connection to the Sphero", function() {
      sphero.connect(callback);
      expect(sphero.connector.connect).to.be.calledOnce;
      expect(callback).to.be.calledOnce;
    });

    context("if an error occurs while connecting to the Sphero", function() {
      var err = { error: "something bad happened" };

      beforeEach(function() {
        sphero.sphero.connect.yields(err);
      });

      it("emits a 'err' event with the error object", function() {
        sphero.connect(callback);
        expect(sphero.emit).to.be.calledWith("error", err);
      });
    });
  });

  describe("#disconnect", function() {
    var callback;

    beforeEach(function() {
      callback = spy();
      sphero.sphero = { disconnect: stub(), roll: spy() };
      sphero.sphero.disconnect.yields();
      sphero.sphero.once = sphero.sphero.disconnect;
    });

    it("closes the connection to the Sphero", function() {
      sphero.disconnect(callback);
      expect(sphero.sphero.disconnect).to.be.called;
    });

    it("stops the sphero", function() {
      sphero.disconnect(callback);
      expect(callback).to.be.calledOnce;
    });
  });

  describe("setDataStreaming", function() {
    var sds;

    beforeEach(function() {
      sphero.sphero = { setDataStreaming: stub() };
      sds = sphero.sphero.setDataStreaming;
    });

    it("sends data to the Sphero's setDataStreaming method", function() {
      sphero.setDataStreaming({
        dataSources: ["odometer", "velocity"]
      });
      expect(sds).to.be.calledWith({
        dataSources: ["odometer", "velocity"],
        mask1: 0x00000000,
        mask2: 0x0D800000,
      });
    });

    context("With no dataSources passed", function() {
      it("sends data to the Sphero's setDataStreaming method", function() {
        sphero.setDataStreaming();
        expect(sds).to.be.calledWith({}, undefined);
      });
    });
  });
});
