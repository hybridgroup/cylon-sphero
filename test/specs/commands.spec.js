"use strict";

source('commands');

describe('Cylon.Sphero.Commands', function() {
  it('is an array of string commands', function() {
    var commands = Cylon.Sphero.Commands;

    for (var i = 0; i < commands.length; i++) {
      var command = commands[i];
      expect(command).to.be.a('string');
    }
  });
});
