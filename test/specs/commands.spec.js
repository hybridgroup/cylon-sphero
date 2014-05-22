"use strict";

var Commands = source('./commands');

describe('Cylon.Sphero.Commands', function() {
  it('is an array of string commands', function() {
    var commands = Commands;

    for (var i = 0; i < commands.length; i++) {
      var command = commands[i];
      expect(command).to.be.a('string');
    }
  });
});
