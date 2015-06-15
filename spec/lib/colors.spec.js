"use strict";

var colors = lib("colors");

describe("Colors", function() {
  describe("#colors", function() {
    it("is an object mapping names to hex colors", function() {
      expect(colors.colors).to.be.an("object");
      for (var color in colors.colors) {
        var hex = colors.colors[color];
        expect(color).to.be.a("string");
        expect(hex).to.be.a("number");
      }
    });
  });

  describe("#fromString", function() {
    context("if a color can be found", function() {
      it("returns the appropriate hex number", function() {
        expect(colors.fromString("sienna")).to.be.eql(0xA0522D);
      });
    });

    context("if a color can't be found", function() {
      it("throws an error", function() {
        var fn = function() { return colors.fromString("notacolor"); };
        expect(fn).to.throw(/No Matching Color/);
      });
    });
  });

  describe("#randomColor", function() {
    it("returns a random color", function() {
      expect(colors.randomColor()).to.be.a("number");
    });
  });
});
