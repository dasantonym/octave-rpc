'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = undefined;

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _restifyCorsMiddleware = require('restify-cors-middleware');

var _restifyCorsMiddleware2 = _interopRequireDefault(_restifyCorsMiddleware);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _package = require('../package.json');

var pkg = _interopRequireWildcard(_package);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const server = _restify2.default.createServer({ name: pkg.name, version: pkg.version, acceptable: ['application/json'] }),
      cors = (0, _restifyCorsMiddleware2.default)({ origins: ['*'] }),
      dataHandler = (buffer, data, writeStream = undefined) => {
  if (!data || data.length === 0) return buffer;
  buffer = Buffer.concat([buffer, data]);
  if (writeStream && typeof writeStream.write === 'function') writeStream.write(`${data}\n`);
  return buffer;
};

server.pre(cors.preflight);
server.use(cors.actual);
server.use(_restify2.default.plugins.acceptParser(server.acceptable));
server.use(_restify2.default.plugins.queryParser());
server.use(_restify2.default.plugins.bodyParser());

server.post('/rpc/octave.json', function (req, res, next) {
  const input = typeof req.body === 'string' ? req.body : JSON.stringify(req.body),
        command = `disp(rpc('${input.replace(/\\/g, '').replace(/'/g, '\\\'')}'))`,
        worker = _child_process2.default.spawn('octave', ['-q', '--path', _path2.default.join(__dirname, 'rpc'), '--eval', command]);

  let buffer = Buffer.alloc(0),
      bufferErr = Buffer.alloc(0),
      errorLogger = process.env.NODE_ENV !== 'production' ? process.stderr : undefined;
  worker.stdout.on('data', data => {
    buffer = dataHandler(buffer, data, process.stdout);
  });
  worker.stderr.on('data', data => {
    bufferErr = dataHandler(bufferErr, data, errorLogger);
  });
  worker.on('close', code => {
    if (code !== 0) return next(new Error(`Error code ${code}: ${bufferErr.toString()}`, code));
    res.send(JSON.parse(buffer.toString()));
  });
});

exports.server = server;