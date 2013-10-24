Cylon = require('cylon')

RobotInfo = 
  connection: 
    name: 'Sphero', adaptor: 'sphero'

  work:
    every 2.seconds(), -> Logger.info "Required cylon-sphero adaptor!"

huey = Object.create(RobotInfo)
huey.connection['port'] = '/dev/cu.Sphero-RGB'

dewey = Object.create(RobotInfo)
dewey.connection['port'] = '/dev/cu.Sphero-GRB'

louie = Object.create(RobotInfo)
louie.connection['port'] = '/dev/cu.Sphero-BRG'

Cylon.robot(huey)
Cylon.robot(dewey)
Cylon.robot(louie)

Cylon.start()
