# octave-rpc

A little json-rpc server for octave functions.

## example

    josh@onix:~/octave-rpc$ cat functions/oneup.m 
    function ans = oneup (x)
      ans = x+1;
    end

    josh@onix:~/octave-rpc$ curl -X POST -d '{"id": "1", "method": "oneup", "params": [1]}' localhost:8080
    {"result":[2],"version":"1.1","id":"1"}


## prereqs

* node.js
* npm
* GNU octave (I used 3.2)
* [jsonlab](http://iso2mesh.sourceforge.net/cgi-bin/index.cgi?jsonlab) (bundled)

## install & run

    git clone git@github.com:jesusabdullah/octave-rpc.git
    cd octave-rpc
    npm install
    node bin/octave-rpc

Runs on port 8080.

## add your own functions

Functions are stored in ./functions as m-files.

## Tests

No tests yet. If there were tests, it would consist of a series of example rpc
calls, and then making sure that the results are as expected.

You want tests? You write them. Or, wait until this becomes something I use.

## License

My code is licensed MIT/X11. jsonlab is licensed under its own terms (dual GPL/BSD).
