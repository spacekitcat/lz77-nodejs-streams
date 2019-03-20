# lZ77-nodejs-streams

Compression and decompression streams for the Lempel-Ziv 77 compression algorithm. The compression stream convert streams of bytes into a stream of JSON objects that represent the data in their compressed form. The decompression stream produces the input byte stream from the JSON objects. This is designed as a dependency to another project (that doesn't exist yet) which will be responsible for serialization/deserialization in a space efficient way. The prototype can be found here https://github.com/spacekitcat/libz77

## Unit tests

The unit tests use Jest and the Yarn command below runs them.

```bash
/lz77-nodejs-streams ‹master*› % yarn test
```
