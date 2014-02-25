"use strict";

var Colors = source('colors');

describe('Colors', function() {
  describe('#fromString', function() {
    it('can fetch hex colors from a string', function() {
      Colors.fromString('cyan').should.be.equal(0x00FFFF);
    });

    it('throws an error if a string is not provided', function() {
      var wrapper = function() { Colors.fromString('ferrarired'); };

      expect(wrapper).to["throw"]();
    });
  });

  describe('#randomColor', function() {
    it('can provide random colors', function() {
      assert(typeof Colors.randomColor() === 'number');
    });
  });
});
