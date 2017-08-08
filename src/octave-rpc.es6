import restify from 'restify'
import corsMiddleware from 'restify-cors-middleware'
import cp from 'child_process'
import path from 'path'
import * as pkg from '../package.json'

const server = restify.createServer({ name: pkg.name, version: pkg.version, acceptable: ['application/json'] }),
  cors = corsMiddleware({ origins: ['*'] }),
  dataHandler = (buffer, data, writeStream = undefined) => {
    if (!data || data.length === 0) return buffer
    buffer = Buffer.concat([buffer, data])
    if (writeStream && typeof writeStream.write === 'function') writeStream.write(`${data}\n`)
    return buffer
  }

server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

server.post('/rpc/octave.json', function (req, res, next) {
  const input = typeof req.body === 'string' ? req.body : JSON.stringify(req.body),
    command = `disp(rpc('${input.replace(/\\/g, '').replace(/'/g, '\\\'')}'))`,
    worker = cp.spawn('octave', ['-q', '--path', path.join(__dirname, 'rpc'), '--eval', command])

  let buffer = Buffer.alloc(0), bufferErr = Buffer.alloc(0),
    errorLogger = process.env.NODE_ENV !== 'production' ? process.stderr : undefined
  worker.stdout.on('data', data => { buffer = dataHandler(buffer, data, process.stdout) })
  worker.stderr.on('data', data => { bufferErr = dataHandler(bufferErr, data, errorLogger) })
  worker.on('close', code => {
    if (code !== 0) return next(new Error(`Error code ${code}: ${bufferErr.toString()}`, code))
    res.send(JSON.parse(buffer.toString()))
  })
})

export { server }
