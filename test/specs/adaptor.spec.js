"use strict";

var Adaptor = source('adaptor');
var Commands = source('./commands');

describe('Adaptor', function() {
  var sphero = new Adaptor;

  it("exposes a 'commands' method exposing all available commands", function() {
    expect(sphero.commands()).to.be.eql(Commands);
  });

  it("exposes a 'connect' method to connect to the Sphero", function() {
    expect(sphero.connect).to.be.a('function');
  });

  it("exposes a 'disconnect' method to disconnect from the Sphero", function() {
    expect(sphero.disconnect).to.be.a('function');
  });

  describe("#detectCollisions", function() {
    it("triggers collision detection on the Sphero", function() {
      var base = sphero.sphero,
          spy = sinon.spy();

      sphero.sphero = { configureCollisionDetection: spy };

      sphero.detectCollisions();
      assert(spy.calledOnce);

      sphero.sphero = base;
    });
  });

  describe('colors', function() {
    var base = sphero.sphero,
        spy = sinon.spy();

    sphero.sphero = { setRGB: spy };

    describe("#setRGB", function() {
      sphero.setRGB(0x7FFF00);

      it("sets the color on the Sphero", function() {
        return assert(spy.calledWith(0x7FFF00));
      });

      it("sets the 'persist' argument to true by default", function() {
        assert(spy.calledWith(0x7FFF00, true));
        sphero.setRGB(0x7FFF00, false);
        assert(spy.calledWith(0x7FFF00, false));
      });
    });

    describe("#setColor", function() {
      it("sets the Sphero color to based on the passed color name", function() {
        sphero.setColor('olivedrab');
        assert(spy.calledWith(0x6B8E23));
        sphero.sphero = base;
      });
    });

    describe("#setRandomColor", function() {
      it("sets the Sphero to a random color", function() {
        var newSpy = sinon.spy();

        sphero.sphero.setRGB = newSpy;
        sphero.setRandomColor();

        expect(newSpy.getCall(0).args[0]).to.be.a('number');
      });
    });
  });
});
