(function() {
  'use strict';
  source('commands');

  describe('Cylon.Sphero.Commands', function() {
    return it('is an array of string commands', function() {
      var command, _i, _len, _ref, _results;
      assert(Cylon.Sphero.Commands instanceof Array);
      _ref = Cylon.Sphero.Commands;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        command = _ref[_i];
        _results.push(assert(typeof command === 'string'));
      }
      return _results;
    });
  });

}).call(this);
