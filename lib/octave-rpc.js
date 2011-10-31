var spawn = require("child_process").spawn;

module.exports = function (req, res) {
  res.writeHead(200, {"Content-Type": "application/json"});

  req.on("data", function (jsonReq) {
    var worker = spawn("octave", [ "-q", "--path", "./vendor/rpc", "--eval", "disp(rpc('"+jsonReq+"'));" ]),
        ans;

    try {
      JSON.parse(jsonReq);
    } catch (e) {
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify({
        version: "1.1",
        result: null,
        error: [ e.stack, jsonReq.toString()]
      })+"\n");
    }

    worker.stdout.on("data", function (data) {
      try {
        ans = JSON.stringify(JSON.parse(data.toString()).res);
        ans.error = null;
      } catch (e) {
        ans = JSON.stringify({
          version: "1.1",
          result: null,
          id: JSON.parse(jsonReq).version,
          error: [ e.stack, data.toString()]
        });
      }

      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(ans+"\n");

    });

    worker.stderr.on("data", function (data) {
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify({
        version: "1.1",
        result: null,
        error: [ data.toString(), jsonReq.toString()]
      })+"\n");
    });

  });

}
