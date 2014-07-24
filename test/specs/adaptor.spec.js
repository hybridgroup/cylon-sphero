"use strict";

var Adaptor = source('adaptor'),
    Commands = source('commands'),
    Colors = source('colors');

var Spheron = require('hybridgroup-spheron');

describe('Adaptor', function() {
  var sphero, mockSphero;

  beforeEach(function() {
    stub(Spheron, 'sphero').returns(mockSphero);

    var opts = { extraParams: {} };
    sphero = new Adaptor(opts);
  });

  afterEach(function() {
    Spheron.sphero.restore();
  });

  describe("constructor", function() {
    beforeEach(function() {
      var opts = { extraParams: { locatorOpts: 'opts' } };
      stub(Adaptor.prototype, 'proxyMethods');
      sphero = new Adaptor(opts);
    });

    afterEach(function() {
      Adaptor.prototype.proxyMethods.restore();
    });

    it("sets @sphero to a Spheron sphero instance", function() {
      expect(sphero.sphero).to.be.eql(mockSphero);
    });

    it("sets @connector to the Sphero instance", function() {
      expect(sphero.connector).to.be.eql(mockSphero);
    });

    it("sets @locatorOpts to the provided options", function() {
      expect(sphero.locatorOpts).to.be.eql('opts');
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

      sphero.connector = sphero.sphero = emitter = { on: stub(), open: stub() };
      sphero.connection = { emit: stub() };

      stub(sphero, 'defineAdaptorEvent');
    });

    afterEach(function() {
      sphero.defineAdaptorEvent.restore();
    });

    context("when the Sphero connection opens", function() {
      beforeEach(function() {
        emitter.on.withArgs('open').yields();
      });

      it("triggers the provided callback", function() {
        sphero.connect(callback);
        expect(callback).to.be.called;
      });
    });

    it("defines adaptor events", function() {
      var d = sphero.defineAdaptorEvent;

      sphero.connect(callback);

      expect(d).to.be.calledWith({
        eventName: 'close',
        targetEventName: 'disconnect'
      });

      expect(d).to.be.calledWith('error');
      expect(d).to.be.calledWith('message');
    });

    describe("when it receives a notification packet", function() {
      var packet;

      it("emits the raw packet in the 'notification' event", function() {
        packet = { ID_CODE: 0x09 }
        sphero.connector.on.withArgs("notification").yields(packet);

        sphero.connect(callback);
        expect(sphero.connection.emit).to.be.calledWith('notification', packet);
      });

      context("when the packet contains collision data", function() {
        beforeEach(function() {
          packet = { ID_CODE: 0x07, DLEN: 0x11 };
          sphero.connector.on.withArgs("notification").yields(packet);
        });

        it("emits a 'collision' event with the packet", function() {
          sphero.connect(callback);
          expect(sphero.connection.emit).to.be.calledWith('collision', packet);
        });
      });

      context("when the packet contains data", function() {
        beforeEach(function() {
          packet = { ID_CODE: 0x03, DATA: new Buffer([1, 2, 3, 4]) };
          sphero.connector.on.withArgs("notification").yields(packet);
        });

        it("emits a 'data' event with the parsed data", function() {
          sphero.connect(callback);
          expect(sphero.connection.emit).to.be.calledWith('data', [258, 772]);
        })
      });
    });

    it("opens a connection to the Sphero", function() {
      sphero.connection = { port: '/dev/null' }
      sphero.connect(callback);
      expect(sphero.sphero.open).to.be.calledWith('/dev/null');
    });

    context("if an error occurs while connecting to the Sphero", function() {
      var err = { error: "something bad happened" };

      beforeEach(function() {
        sphero.sphero.open.yields(err);
      });

      it("emits a 'err' event with the error object", function() {
        sphero.connect(callback);
        expect(sphero.connection.emit).to.be.calledWith('err', err);
      });
    })
  });

  describe("#disconnect", function() {
    var callback;

    beforeEach(function() {
      callback = spy();
      sphero.sphero = { close: spy(), roll: spy() };
      sphero.sphero.once = sphero.sphero.close;
    });

    it("closes the connection to the Sphero", function() {
      sphero.disconnect(callback);
      expect(sphero.sphero.close).to.be.called;
    });

    it("stops the sphero", function() {
      sphero.disconnect(callback);
      expect(sphero.sphero.roll).to.be.calledWith(0,0,0);
    });
  });

  describe("#detectCollisions", function() {
    beforeEach(function() {
      sphero.sphero = { configureCollisionDetection: spy() };
    });

    it("configures collision detection on the Sphero", function() {
      var conf = sphero.sphero.configureCollisionDetection;
      sphero.detectCollisions();
      expect(conf).to.be.calledWith(0x01, 0x40, 0x40, 0x50, 0x50, 0x50);
    });
  });

  describe("setRGB", function() {
    var setRGB;

    beforeEach(function() {
      sphero.sphero = { setRGB: spy() };
      setRGB = sphero.sphero.setRGB;
    });

    context("by default", function() {
      it("persists the color", function() {
        sphero.setRGB(0xffff00);
        expect(setRGB).to.be.calledWith(0xffff00, true);
      })
    });

    context("when persist is false", function() {
      it("tells the Sphero not to persist the color", function() {
        sphero.setRGB(0xffff00, false);
        expect(setRGB).to.be.calledWith(0xffff00, false);
      })
    })
  });

  describe("#setColor", function() {
    var setRGB;

    beforeEach(function() {
      sphero.sphero = { setRGB: spy() };
      setRGB = sphero.sphero.setRGB;
    });

    context("when passed a hex number", function() {
      it("sets the color", function() {
        sphero.setColor(0xffff00);
        expect(setRGB).to.be.calledWith(0xffff00);
      })
    });

    context("when passed a string", function() {
      it("looks up the hex color", function() {
        sphero.setColor("sienna");
        expect(setRGB).to.be.calledWith(0xA0522D);
      });
    });
  });

  describe("setRandomColor", function() {
    var setRGB;

    beforeEach(function() {
      sphero.sphero = { setRGB: spy() };
      setRGB = sphero.sphero.setRGB;
      stub(Colors, 'randomColor').returns('randomcolor');
    });

    afterEach(function() {
      Colors.randomColor.restore();
    });

    it("calls setRGB with a random color", function() {
      sphero.setRandomColor();
      expect(setRGB).to.be.calledWith('randomcolor');
    });
  });

  describe("#setBackLED", function() {
    beforeEach(function() {
      sphero.sphero = { setBackLED: spy() };
    });

    it("tells the Sphero to turn on the back LED", function() {
      sphero.setBackLed(180);
      expect(sphero.sphero.setBackLED).to.be.calledWith(180);
    });

    it("defaults to a brightness of 192", function() {
      sphero.setBackLed();
      expect(sphero.sphero.setBackLED).to.be.calledWith(192);
    });
  });

  describe("setDataStreaming", function() {
    var sds;

    beforeEach(function() {
      sphero.sphero = { setDataStreaming: spy() };
      sds = sphero.sphero.setDataStreaming;
    });

    it("sends data to the Sphero's setDataStreaming method", function() {
      sphero.setDataStreaming(['locator', 'velocity', 'gyroscope']);
      expect(sds).to.be.calledWith(80, 1, 0x1C00, 0, 0xD800000);
    });
  });

  describe("#stop", function() {
    beforeEach(function() {
      sphero.sphero = { roll: spy() };
    });

    it("makes the sphero stop rolling", function() {
      sphero.stop();
      expect(sphero.sphero.roll).to.be.calledWith(0, 0, 0);
    })
  });
});
