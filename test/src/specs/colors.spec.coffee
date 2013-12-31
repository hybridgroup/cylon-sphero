'use strict'

Colors = source 'colors'

describe 'Colors', ->
  describe '#fromString', ->
    it 'can fetch hex colors from a string', ->
      Colors.fromString('cyan').should.be.equal 0x00FFFF

    it 'throws an error if a string is not provided', ->
      wrapper = -> Colors.fromString('ferrarired')
      expect(wrapper).to.throw()

  describe '#randomColor', ->
    it 'can provide random colors', ->
      assert typeof Colors.randomColor() is 'number'
