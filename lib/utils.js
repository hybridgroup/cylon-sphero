global.hasProp = {}.hasOwnProperty;
global.slice = [].slice;

global.subclass = function (child, parent) {
  for (var key in parent) {
    if (hasProp.call(parent, key)) { child[key] = parent[key]; }
  }

  function ctor() { this.constructor = child; }

  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
  child.__super__ = parent.prototype;
  return child;
};

global.instantiate = function(func, args, ctor) {
  ctor.prototype = func.prototype;

  var child = new ctor(),
      result = func.apply(child, args);

  return Object(result) === result ? result : child;
};

global.createDriver = global.instantiate;
global.createAdaptor = global.instantiate;

global.getArgs = function(args) {
  if (args.length >= 1) {
    return slice.call(args, 0);
  } else {
    return [];
  }
};
