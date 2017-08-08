# Octave-RPC

A little JSON-RPC server for Octave functions.

## Example

``` shell
josh@onix:~/octave-rpc$ cat src/functions/oneup.m 
function ans = oneup (x)
  ans = x + 1;
end

josh@onix:~/octave-rpc$ curl -X POST \
  -d '{"version": "1.1", "id": "1", "method": "oneup", "params": [1,2,3]}' \
  localhost:8080/rpc/octave/oneup.json
{"result":[2,3,4],"version":"1.1","id":"1"}
```

## Prereqs

Note: This was so far only tested on macOS and is still under further development.

* [Node.js](https://nodejs.org) (Min. 6.0)
* [GNU Octave](https://www.gnu.org/software/octave/) (Tested on 4.2.1)
* [jsonlab](https://github.com/fangq/jsonlab) (Tested on 1.5.0, Installs via NPM)

## Install & Run

``` shell
git clone git@github.com:jesusabdullah/octave-rpc.git
cd octave-rpc

npm install 
npm start
```

Server listens on port 8080 (Setting environment variable `PORT` to override).

## Add your own functions

Functions are stored in `src/functions` as `.m`-files.

## Tests

Still no tests yet. If there were tests, it would consist of a series of example rpc
calls, and then making sure that the results are as expected.

You want tests? You write them. Or, wait until this becomes something I use.

## License

My code is licensed MIT/X11. jsonlab is licensed under its own terms (dual GPL/BSD).
