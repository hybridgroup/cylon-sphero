(function() {
  'use strict';
  var namespace, sphero;

  namespace = require('node-namespace');

  sphero = source("cylon-sphero");

  describe("Cylon.Sphero", function() {
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
    it("can register the adaptor and driver", function() {
      return sphero.register.should.be.a('function');
    });
    it("can create adaptor", function() {
      return sphero.adaptor.should.be.a('function');
    });
    return it("can create driver", function() {
      return sphero.driver.should.be.a('function');
    });
  });

}).call(this);
