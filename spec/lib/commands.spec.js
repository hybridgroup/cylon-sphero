"use strict";

var Commands = lib("./commands");

describe("Cylon.Sphero.Commands", function() {
  it("is an array of string commands", function() {
    expect(Commands).to.be.a("array");

    Commands.forEach(function(command) {
      expect(command).to.be.a("string");
    });
  });
});
