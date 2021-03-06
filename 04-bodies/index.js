
var fs = require('fs');
var koa = require('koa');
var path = require('path');

var app = module.exports = koa();

/**
 * Create the `GET /stream` route that streams this file.
 * In node.js, the current file is available as a variable `__filename`.
 */

app.use(function* (next) {
  if (this.request.path !== '/stream') return yield* next;
  var filepath = path.join(__dirname, 'index.js');
  var fstat = yield stat(filepath);

  if (fstat.isFile()) {
    this.response.type = path.extname(filepath);
    this.response.body = fs.createReadStream(filepath);
  }

});

function stat(file) {
  return function (done) {
    fs.stat(file, done);
  };
}

/**
 * Create the `GET /json` route that sends `{message:'hello world'}`.
 */

app.use(function* (next) {
  if (this.request.path !== '/json') return yield* next;

  this.response.body = {
    message: 'hello world'
  };
});
