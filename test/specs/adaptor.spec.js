(function() {
  'use strict';
  source('adaptor');

  describe('Cylon.Adaptors.Sphero', function() {
    var sphero;
    sphero = new Cylon.Adaptors.Sphero;
    it("exposes a 'commands' method exposing all available commands", function() {
      return expect(sphero.commands()).to.be.eql(Cylon.Sphero.Commands);
    });
    it("exposes a 'connect' method to connect to the Sphero", function() {
      return expect(sphero.connect).to.be.a('function');
    });
    it("exposes a 'disconnect' method to disconnect from the Sphero", function() {
      return expect(sphero.disconnect).to.be.a('function');
    });
    describe("#detectCollisions", function() {
      return it("triggers collision detection on the Sphero", function() {
        var base, spy;
        spy = sinon.spy();
        base = sphero.sphero;
        sphero.sphero = {
          configureCollisionDetection: spy
        };
        sphero.detectCollisions();
        assert(spy.calledOnce);
        return sphero.sphero = base;
      });
    });
    return describe('colors', function() {
      var base, spy;
      spy = sinon.spy();
      base = sphero.sphero;
      sphero.sphero = {
        setRGB: spy
      };
      describe("#setRGB", function() {
        sphero.setRGB(0x7FFF00);
        it("sets the color on the Sphero", function() {
          return assert(spy.calledWith(0x7FFF00));
        });
        return it("sets the 'persist' argument to true by default", function() {
          assert(spy.calledWith(0x7FFF00, true));
          sphero.setRGB(0x7FFF00, false);
          return assert(spy.calledWith(0x7FFF00, false));
        });
      });
      describe("#setColor", function() {
        return it("sets the Sphero color to based on the passed color name", function() {
          sphero.setColor('olivedrab');
          assert(spy.calledWith(0x6B8E23));
          return sphero.sphero = base;
        });
      });
      return describe("#setRandomColor", function() {
        return it("sets the Sphero to a random color", function() {
          var newSpy;
          newSpy = sinon.spy();
          sphero.sphero.setRGB = newSpy;
          sphero.setRandomColor();
          return expect(newSpy.getCall(0).args[0]).to.be.a('number');
        });
      });
    });
  });

}).call(this);
