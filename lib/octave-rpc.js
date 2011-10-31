var spawn = require("child_process").spawn;

module.exports = function (req, res) {
  res.writeHead(200, {"Content-Type": "application/json"});

  req.on("data", function (jsonReq) {
    var worker = spawn("octave", [ "-q", "--path", "./vendor/rpc", "--eval", "disp(rpc('"+jsonReq+"'));" ]),
        ans;

    console.log(jsonReq.toString());

    worker.stdout.on("data", function (data) {
      try {
        ans = JSON.stringify(JSON.parse(data.toString()).res);
        ans.error = null;
      } catch (e) {
        ans = JSON.stringify({
          version: "1.1",
          result: null,
          id: JSON.parse(jsonReq).version,
          error: e.stack
        });
      }

      console.log(ans);
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(ans+"\n");

    });

    worker.stderr.on("data", function (data) {

      ans = JSON.stringify(JSON.parse(data.toString()).res);
      ans.result = null;

      console.log(ans);

      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(ans+"\n");
    });

  });

}
