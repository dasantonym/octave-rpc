const server = require('./octave-rpc').server
server.listen(process.env.PORT || 8080, function () {
  process.stdout.write(`${server.name} listening on ${server.url}\n`)
})
