# Commands

## abortMacro()

This command aborts any executing macro, and returns both it's ID code
and the command number currently in progress.

##### Returns

an array containing the ID code and command number.

## abortOrbBasicProgram()

Public: Aborts execution of any currently-running orbBasic program.

##### Returns

`null`

## appendMacroChunck(chunk)

Stores an attached macro definition into a temporary RAM buffer for
later execution. It's similar to the `saveTemporaryMacro` function, but allows
you to build up a longer temporary macros.

##### Params

- **chunk** - macro definition to be executed later. Will throw an
  error if any larger than 254 bytes.

##### Returns

a boolean indicating whether or not the macro could be packeted.

## appendOrbBasicFragment(area, programCode)

Appends a fragment of an orbBasic program to a buffer that will be
written to the Sphero eventually.

##### Params

- **area** - value to start buffer with
- **fragment** - fragment of orbBasic to be sent to the Sphero. Will throw an
  error if larger than 253 bytes

##### Returns

a boolean indicating whether or not the fragment could be packeted

## configureCollisions(opts, cb)

Internal: Configures collision detection on the Sphero, using the provided
params to decide what constitutes a 'collision'.
opts contains attributes meth, xt, yt, xs, ys, dead

##### Params

- **meth** - detection method to use. Pass `0x01` to enable collision detection
- **xt** - an 8-bit settable threshold for the X axis of the Sphero.
  A setting of `0x00` disables the contribution of this axis
- **yt** - an 8-bit settable threshold for the Y axis of the Sphero.
  A setting of `0x00` disables the contribution of this aYis
- **xs** - an 8-bit settable speed value for the X speed. This is ranged,
  then added to `xt` to generate the final threshold value.
- **ys** - an 8-bit settable speed value for the Y speed. This is ranged,
  then added to `yt` to generate the final threshold value.
- **dead** - an 8-bit post-collision dead time to prevent re-triggering of
  the collision event. Specified in 10ms increments

##### Returns

a boolean whether or not the packet to be sent to the Sphero has been built successfully

## configureLocator(opts, cb) 

opts contains attributes flag, x, y, yawTare.

Through the streaming interface, Sphero provides real-time location
data in the form of X, Y coordinates on the ground plane.

##### Params

- **flag** - number (0-1), determines whether the calibrate commands automatically set the
  yaw tare value.
- **y** - set the current X coordinates of Sphero on the ground plane in
  centimeters.
- **x** - set the current Y coordinates of Sphero on the ground plane in
  centimeters.
- **yawTare** - (0-359) value for the orientation the Sphero should use after
  calibration.

##### Returns

a boolean whether or not the packet to be sent to the Sphero has beenbuilt successfully

## detectCollisions()

Enables collision detection for the Sphero. When the Sphero detects
a collision, it will emit the `collision` event.

Shortcut method to `configureCollisionDetection` so you don't have to deal
with setting it up manually.

##### Returns

`nil`

## eraseOrbBasicStorage(area)

Internal: This erases any existing program in the specified storage area.
Specify 00h for the temporary RAM buffer or 01h for the persistent storage area.

##### Params

- **area** - which buffer should be erased, `0x00` for the temporary RAM buffer or
  `0x01` for the persistent storage area

##### Returns

`nil`

## executeOrbBasicProgram(Area, Start Line, Start Line)

This attempts to run a program in the specified storage area beginning
at the specified line number. This command will fail if there is already
an orbBasic program executing.

##### Params

- **area** - params
- **startLine** - params

##### Returns

`nil`

## getApplicationConfigurationBlock()

This allows you to retrieve the application configuration block that
is set aside for exclusive use by applications.

##### Returns

`nil`

## getConfigurationBlock(ID)

This command retrieves one of the configuration blocks.

##### Params

- **id** - params

##### Returns

`nil`

## getDeviceMode()

Gets the operation mode of Sphero based on the supplied mode value.

##### Returns

`00h (Normal mode) or 01h (User Hack mode)`

## getMacroStatus()

This command returns the ID code and command number of the currently
executing macro.

##### Returns

`(ID code, cmd number, cmd number)`

## getPermanentOptionFlags()

This command returns the ID code and command number of the currently
executing macro.

##### Returns

an array of option flags

## getRGB()

This retrieves the "user LED color" which is stored in the config
block.

##### Returns

the sphero's LED color

## getTemporaryOptionFlags

Returns the temporary option flags.

##### Returns

FLAGS

## reInitializeMacroExecutive()

This terminates any running macro and reinitializes the macro system.

##### Returns

`nil`

## readLocator(cb)

This reads Sphero's current position (X,Y), component velocities and
SOG (speed over ground) and passes these into the callback in error, data.
data has attributes xpos, ypos, xvel, yvel, sog.

##### Returns

`nil`

## roll(speed, heading, state)

This commands Sphero to roll along the provided vector. Both a speed
and a heading are required; the latter is considered relative to the last
calibrated direction.

##### Params

- **speed** - params
- **heading** - params
- **state** - params

##### Returns

`nil`

## runMacro(SEQ, DLEN, ID)

This attempts to execute the specified macro.

##### Params

- **seq** - params
- **dLen** - params
- **id** - params

##### Returns

`nil`

## saveMacro(data)

This stores the attached macro definition into the persistent store
for later execution.

##### Params

- **data** - params

##### Returns

`nil`

## saveTemporaryMacro(data)

This command controls the self level routine.

##### Params

- **options** - params
- **angleLimit** - params
- **timeout** - params
- **trueTime** - params

##### Returns

options: `array` [(0 , 1 , 2 ,3 ), (0 , 1 to 90), (0 , 1 to 255), (0 , 1 to 255)].

## selfLevel(Options, Angle Limit, Timeout, True Time), options: ((0 | 1 | 2 |3 ), (0 | 1 to 90), (0 | 1 to 255), (0 | 1 to 255)

This command controls the self level routine.

##### Params

- **range** - params

##### Returns

`integer` opt: 0 , 1 , 2 , 3.

## setAccelerometerRange(Range Idx), options: 0 | 1 | 2 | 3

## setApplicationConfigurationBlock

## setBackLED(level)

This allows you to control the brightness of the back LED. The value does
not persist across power cycles.

##### Params

- **level** - params

##### Returns

`nil`

## setBoostWithTime(STATE)

setBoostWithTime(state)

##### Params

- **state** - params

##### Returns

`nil`

## setColor(color)

Allows for convenient setting of the Sphero's color using a hex value
or a color name string

##### Params

- **color** - hex number (`0xFF1500`) or string color name to set the Sphero
  to
- **persist** - boolean, whether or not the color should persist. Defaults to
  `true`

##### Returns

`nil`

## setRandomColor()

Changes the Sphero to a random color.

##### Params

- **persist** - boolean, whether or not the color should persist. Defaults to
  `true`

##### Returns

`nil`

## setConfigurationBlock(value)

This command accepts an exact copy of the configuration block and
loads it into the RAM copy of the configuration block.

##### Params

- **value** - params

##### Returns

`nil`

## setDataStreaming(N, M, MASK, PCNT, MASK2)

Sphero supports asynchronous data streaming of certain control system and sensor parameters.

##### Params

- **n** - params
- **m** -params
- **mask** - params
- **pcnt** - params
- **mask2** - params

##### Returns

`nil`

## setDeviceMode(MODE)

Assigns the operation mode of Sphero based on the supplied mode value.

##### Params

- **mode** - params

##### Returns

`nil`

## setHeading(HEADING)

This allows the smartphone client to adjust the orientation of Sphero
by commanding a new reference heading in degrees, which ranges from 0 to 359.

##### Params

- **heading** - params

##### Returns

`nil`

## setMacroParameter(Param, Val1, Val2)

This command allows system globals that influence certain macro
commands to be selectively altered from outside of the macro system itself.

##### Params

- **param** - params
- **val1** - params
- **val2** - params

##### Returns

`nil`

## setMotionTimeout(TIME)

This sets the ultimate timeout for the last motion command to keep
Sphero from rolling away in the case of a crashed (or paused) client app.

##### Params

- **time** - params

##### Returns

`nil`

## setPermanentOptionFlags(FLAGS)

Assigns the permanent option flags to the provided value and writes them
immediately to the config block for persistence across power cycles.

- **flags** - params

##### Returns

`nil`

## setRGB(color, persist)

Allows for convenient setting of the Sphero's color using a hex value
or a color name string

##### Params

- **color** - hex number (`0xFF1500`) or to set the Sphero to
- **persist** - boolean, whether or not the color should persist. Defaults to
  `true`

##### Returns

`nil`

## setRawMotors(opts, cb)

This allows you to take over one or both of the motor output values,
instead of having the stabilization system control them.
opts contains attributes lmode, lpower, rmode, rpower

##### Params

- **lmode** - params 0=off, 1=forward, 2=reverse, 3=brake, 4=ignore
- **lpower** - params 0-255 power level
- **rmode** - params 0=off, 1=forward, 2=reverse, 3=brake, 4=ignore
- **rpower** - params 0-255 power level

##### Returns

`nil`

## setRotationRate(RATE)

Sets the rotation rate of the Sphero

##### Params

- **rate** - params

##### Returns

`nil`

## setStabilization(bool)

Sets whether the Sphero should have stabilization enabled

- **bool** - whether or not the sphero should have stabilization

##### Returns

`nil`

## setTemporaryOptionFlags(FLAGS)

Assigns the temporary option flags to the provided value. These do not
persist across a power cycle. See below for the bit definitions.

##### Params

- **flags** - params

##### Returns

`nil`

## stop

Stops the Sphero from rolling around.

##### Returns

`nil`

## submitValueToInputStatement(VAL)

This takes the place of the typical user console in orbBasic and allows a
user to answer an input request.

##### Params

- **val** - params

##### Returns

`nil`
