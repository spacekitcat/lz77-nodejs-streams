import LibzStream from '../src/libz-stream';
import { isTSAnyKeyword } from '@babel/types';

describe('The `LibzStream` class', () => {
  describe('when an empty Buffer is pushed', () => {
    it('should produce the expected output', () => {
      const stream = new LibzStream();

      let outputAccumulator = Buffer.from([]);
      stream.on('data', compressedPacket => {
        outputAccumulator = Buffer.concat([
          outputAccumulator,
          compressedPacket
        ]);
      });

      stream.on('finish', () => {
        expect(outputAccumulator).toMatchObject(Buffer.from([]));
      });

      stream.write(Buffer.from([]));
      stream.end();
    });
  });

  describe('when repeating content is appended', () => {
    it('should produce the expected output', () => {
      const stream = new LibzStream();

      let outputAccumulator = [];
      stream.on('data', compressedPacket => {
        outputAccumulator.push(compressedPacket);
      });

      stream.on('finish', () => {
        expect(outputAccumulator).toMatchObject([
          { token: Buffer.from([0x33]), prefix: null },
          { token: Buffer.from([0x24]), prefix: null },
          { token: Buffer.from([0x78]), prefix: null },
          { token: Buffer.from([0x33]), prefix: { offset: 2, length: 3 } }
        ]);
      });

      stream.write(Buffer.from([0x33, 0x24, 0x78, 0x33, 0x24, 0x78, 0x33]));
      stream.end();
    });
  });
});
