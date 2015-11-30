"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("sphero", { adaptor: "sphero", port: "/dev/rfcomm0" })
  .device("sphero", { driver: "sphero" })
  .on("ready", function(bot) {
    console.log("Setting up Odometer Data Streaming...");

    bot.sphero.on("dataStreaming", function(data) {
      console.log("data:");
      console.log(data);
    });

    // To detect odometer from the Sphero we use setDataStreaming.
    // The data sources available for data streaming from the
    // Sphero API are as follows:
    // ["motorsPWM", "imu", "accelerometer", "gyroscope", "motorsIMF"
    //  "quaternion", "odometer", "accelOne", "velocity"]
    // It is also possible to pass an opts object to setDataStreaming():
    var opts = {
      // n: int, divisor of the max sampling rate, 400 hz/s
      // n = 40 means 400/40 = 10 data samples per second,
      // n = 200 means 400/200 = 2 data samples per second
      n: 200,
      // m: int, number of data packets buffered before passing to the stream
      // m = 10 means each time you get data it will contain 10 data packets
      // m = 1 is usually best for real time data readings.
      m: 1,
      // pcnt: 1 -255, how many packets to send.
      // pcnt = 0 means unlimited data Streaming
      // pcnt = 10 means stop after 10 data packets
      pcnt: 0,
      dataSources: ["odometer"]
    };

    bot.sphero.setDataStreaming(opts);
  });

Cylon.start();
