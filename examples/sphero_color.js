var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/rfcomm1' },
  device: { name: 'sphero', driver: 'sphero' },

  work: function(me) {
    every((1).second(), function() {
      console.log('hi');
      me.sphero.setRGB(Math.floor(Math.random() * 100000));
    });
  }
});

Cylon.start();
