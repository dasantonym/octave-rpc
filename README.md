# Octave-RPC

A little JSON-RPC server for Octave functions. Dormant for so many dark years it is now back from the grave, so it may one day bridge my Node.js <-> Octave gaps in a magical future wonderland.

## Example

``` shell
josh@onix:~/octave-rpc$ cat src/functions/oneup.m 
function ans = oneup (x)
  ans = x + 1;
end

josh@onix:~/octave-rpc$ curl -X POST -H "Accept: application/json" -H "Content-Type: application/json" \
  -d '{"version":"1.1","id":"1","method":"oneup","params":[1,2,3]}' localhost:8080/rpc/octave.json
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

Server listens on port 8080 (Set environment variable `PORT` to override this).

## Add your own functions

Functions are stored in `src/functions` as `.m`-files.

## Tests

Still no tests after all these years. When will this dream finally become your and my reality? :soon: 
With a beautiful series of example RPC calls, we'll always be sure that responses are :ok_hand: at all times and :100: :muscle: like [Putin's Nukular](https://www.youtube.com/watch?v=IMejiyrWrMg).

## License

My code is licensed MIT/X11. jsonlab is licensed under its own terms (dual GPL/BSD).
A little bit additional credits [are belong to the mine](https://github.com/dasantonym) for extended cleaning and updating like a ~~good boy~~. :neckbeard:

<br /><p align="center">:fu: Nice. :metal:</p><p align="center"><img src="http://replygif.net/i/1437.gif" alt="Yeah, nice."></p>
