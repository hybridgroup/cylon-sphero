var spheron = require('spheron');
var sphero = spheron.sphero();
var spheroPort = '/dev/rfcomm0';
var COLORS = spheron.toolbelt.COLORS;

sphero.on('open', function() {
  sphero.setRGB(COLORS.BLUE, false);
});

sphero.open(spheroPort);
