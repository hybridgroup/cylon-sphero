var Cylon = require('cylon');

var RobotInfo = {
  connection: { name: 'Sphero', adaptor: 'sphero' },

  work: every((2).seconds(), function() {
    Logger.info("Required cylon-sphero adaptor!");
  })
};

var huey = Object.create(RobotInfo);
huey.connection['port'] = '/dev/cu.Sphero-RGB';

var dewey = Object.create(RobotInfo);
dewey.connection['port'] = '/dev/cu.Sphero-GRB';

var louie = Object.create(RobotInfo);
louie.connection['port'] = '/dev/cu.Sphero-BRG';

Cylon.robot(huey);
Cylon.robot(dewey);
Cylon.robot(louie);

Cylon.start();
