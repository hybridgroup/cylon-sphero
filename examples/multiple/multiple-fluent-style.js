var cylon = require('cylon');

var SpheroRobot = (function() {
  function SpheroRobot() {}

  SpheroRobot.prototype.connection = { name: 'Sphero', adaptor: 'sphero' };
  SpheroRobot.prototype.device = { name: 'sphero', driver: 'sphero' };

  SpheroRobot.prototype.work = function(robot) {
    setInterval(function() {
      console.log(robot.name);
      robot.sphero.setRandomColor();
      robot.sphero.roll(60, Math.floor(Math.random() * 360));
    }, 1000);
  };

  return SpheroRobot;
})();

var bots = [
  { name: "Thelma", port: "/dev/rfcomm0" },
  { name: "Louise", port: "/dev/rfcomm1" }
];

for (var i = 0; i < bots.length; i++) {
  var bot = bots[i];
  var robot = new SpheroRobot();

  robot.name = bot.name;
  robot.connection.port = bot.port;

  cylon.robot(robot);
}

cylon.start();
