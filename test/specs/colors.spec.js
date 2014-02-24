(function() {
  'use strict';
  var Colors;

  Colors = source('colors');

  describe('Colors', function() {
    describe('#fromString', function() {
      it('can fetch hex colors from a string', function() {
        return Colors.fromString('cyan').should.be.equal(0x00FFFF);
      });
      return it('throws an error if a string is not provided', function() {
        var wrapper;
        wrapper = function() {
          return Colors.fromString('ferrarired');
        };
        return expect(wrapper).to["throw"]();
      });
    });
    return describe('#randomColor', function() {
      return it('can provide random colors', function() {
        return assert(typeof Colors.randomColor() === 'number');
      });
    });
  });

}).call(this);
