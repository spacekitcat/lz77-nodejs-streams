# LZ77-NODEJS-STREAMS

Compression and decompression streams for the Lempel-Ziv 77 compression algorithm. The compression stream convert streams of bytes into a stream of JSON objects that represent the data in their compressed form. The decompression stream produces the input byte stream from the JSON objects. This is designed as a dependecy to another project (that doesn't exist yet) which will be responsible for serialisation/deserialisation in a space efficient way. The prototype can be found here https://github.com/spacekitcat/libz77
