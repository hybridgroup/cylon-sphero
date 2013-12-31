'use strict'

source 'commands'

describe 'Cylon.Sphero.Commands', ->
  it 'is an array of string commands', ->
    assert Cylon.Sphero.Commands instanceof Array
    assert typeof command is 'string' for command in Cylon.Sphero.Commands
