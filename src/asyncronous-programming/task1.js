// 1
function foo(x, cb) {
  if (x > 10) {
    console.log('x > 10');
    cb();
  }
  if (x <= 10) {
    console.log('x <= 10');
  }
}

function createCb(srt) {
  return () => console.log(srt);
}

foo(6, createCb('cb'));
foo(20, createCb('cb'));
