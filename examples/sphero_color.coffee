Cylon = require('cylon')

Cylon.robot
  connection:
    name: 'sphero', adaptor: 'sphero', port: '/dev/rfcomm1'

  device:
    name: 'sphero', driver: 'sphero'

  work: (me) ->
    every 1.second(), ->
      console.log 'hi'
      me.sphero.setRGB Math.floor(Math.random() * 100000)

Cylon.start()
