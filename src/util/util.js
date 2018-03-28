const throttle = function f(){
  var isClear = arguments[0], fn;
  if (typeof isClear === 'boolean') {
    fn = arguments[1]
    fn.__throttleID && clearTimeout(fn.__throttleID)
  } else {
    fn = isClear;
    var param = arguments[1]
    var p = Object.assign({
        context: null,
        args: [],
        time: 300
      }, param) 
    f(true, fn);
    fn.__throttleID = setTimeout(() => {
      fn.apply(p.context, p.args)
    }, p.time)
  }
}

export default throttle