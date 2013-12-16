(function() {
  'use strict';
  var Colors;

  Colors = source('colors');

  describe('Cylon.Sphero.Colors', function() {
    it('can fetch hex colors from a string', function() {
      return Colors.fromString('cyan').should.be.equal(0x00FFFF);
    });
    return it('can provide random colors', function() {
      return assert(typeof Colors.randomColor() === 'number');
    });
  });

}).call(this);
