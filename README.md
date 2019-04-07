# lZ77-nodejs-streams

Compression and decompression streams for the Lempel-Ziv 77 compression algorithm. The compression stream convert streams of bytes into a stream of JSON objects that represent the data in their compressed form. The decompression stream produces the input byte stream from the JSON objects. This is designed as a dependency to another project (that doesn't exist yet) which will be responsible for serialization/de-serialization in a space efficient way. The prototype can be found here https://github.com/spacekitcat/libz77

## Progress

I've implemented the compression stream and it uses [Tiny Toatie Cache](https://github.com/spacekitcat/tiny-toatie-cache) as it's storage engine. In comparison with the original prototype, this version seems to be several times faster.

## sample.js

`sample.js` runs the compressor against any file path you give as the first argument. The `Saved` number is a tally of the number of bytes above 4 that the packet expands to, you would need about 4 bytes in overhead to serialize the packet to a file.

```bash
lz77-nodejs-streams ‹master*› % node sample.js resources/512m-test.txt
PROGRESS   ▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░  41%   ETA 64s   SAVING 209.98 MB   SPEED 5.61 MB/s   PROGRESS 210.8/512 MB

    ... 'N' seconds pass ...

PROGRESS   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  100%   ETA 1s   SAVING 510 MB   SPEED 3.5 MB/s   PROGRESS 512/512 MB

I compressed the devil outta resources/512m-test.txt

             Input size: 536870912
     Theoretical output: 2099778
```

## Unit tests

The unit tests use Jest and the Yarn command below runs them.

```bash
/lz77-nodejs-streams ‹master*› % yarn test
```
