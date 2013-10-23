(function() {
  'use strict';
  var cylonSphero;

  cylonSphero = source("cylon-sphero");

  describe("basic tests", function() {
    it("standard async test", function(done) {
      var bool;
      bool = false;
      bool.should.be["false"];
      setTimeout(function() {
        bool.should.be["false"];
        bool = true;
        return bool.should.be["true"];
      });
      150;
      setTimeout(function() {
        bool.should.be["true"];
        return done();
      });
      return 300;
    });
    it("standard sync test", function() {
      var data, obj;
      data = [];
      obj = {
        id: 5,
        name: 'test'
      };
      data.should.be.empty;
      data.push(obj);
      data.should.have.length(1);
      data[0].should.be.eql(obj);
      return data[0].should.be.equal(obj);
    });
    return it("cylon-sphero should be awesome", function() {
      cylonSphero.should.have.keys('awesome');
      cylonSphero.awesome.should.be.a('function');
      return cylonSphero.awesome().should.be.equal('awesome');
    });
  });

}).call(this);
