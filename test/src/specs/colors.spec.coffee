'use strict';

Colors = source 'colors'

describe 'Cylon.Sphero.Colors', ->
  it 'can fetch hex colors from a string', ->
    Colors.fromString('cyan').should.be.equal 0x00FFFF

  it 'can provide random colors', ->
    assert typeof Colors.randomColor() is 'number'
