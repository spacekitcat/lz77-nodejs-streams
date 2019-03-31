import CompactorStack from '../src/compactor-stack';
import Dictionary from '../src/dictionary';

describe('The `CompactorStack` class', () => {
  describe('The `append` method', () => {
    describe('single byte Buffer specified', () => {
      it('should append the specified Buffer', () => {
        const sut = new CompactorStack();
        const expectedContents = Buffer.from([0x34]);

        sut.append(expectedContents);

        expect(sut.getInternalBuffer()).toMatchObject(expectedContents);
      });

      it('should append the specified Buffer (alt)', () => {
        const sut = new CompactorStack();
        const expectedContents = Buffer.from([0x42]);

        sut.append(expectedContents);

        expect(sut.getInternalBuffer()).toMatchObject(expectedContents);
      });
    });

    describe('multiple appends', () => {
      it('should append the specified Buffers', () => {
        const sut = new CompactorStack();

        sut.append(Buffer.from([0x23]));
        sut.append(Buffer.from([0x19]));
        sut.append(Buffer.from([0x53]));
        sut.append(Buffer.from([0x99]));

        expect(sut.getInternalBuffer()).toMatchObject(
          Buffer.from([0x23, 0x19, 0x53, 0x99])
        );
      });
    });
  });

  describe('The `popNextToken` method', () => {
    describe('when the internal Buffer is empty', () => {
      it('should return null', () => {
        const sut = new CompactorStack();

        expect(sut.popNextToken(new Dictionary())).toBe(null);
      });
    });

    describe('when the internal Buffer is a single byte', () => {
      it('should return the expected value', () => {
        const sut = new CompactorStack();
        const expectedContent = Buffer.from([0x34]);
        sut.append(expectedContent);
        expect(sut.popNextToken(new Dictionary())).toMatchObject({
          token: expectedContent,
          prefix: null
        });
        expect(sut.getAvailableBytes()).toBe(0);
      });
    });

    describe('when the internal Buffer is a single byte', () => {
      it('should return the expected value', () => {
        const sut = new CompactorStack();
        const expectedContent = Buffer.from([0x34, 0x89, 0x22, 0x28]);
        sut.append(expectedContent);
        expect(sut.popNextToken(new Dictionary())).toMatchObject({
          token: Buffer.from([0x34]),
          prefix: null
        });
        expect(sut.getAvailableBytes()).toBe(3);
      });
    });

    describe('when the internal buffer has a match within the dictionary', () => {
      it('should return the expected value', () => {
        const sut = new CompactorStack();
        const expectedContent = Buffer.from([0x67, 0x12, 0x97, 0x75]);

        sut.append(expectedContent);

        expect(
          sut.popNextToken(
            new Dictionary(Buffer.from([0x36, 0x23, 0x67, 0x12]))
          )
        ).toMatchObject({
          token: Buffer.from([0x97]),
          prefix: null
        });
        expect(sut.getAvailableBytes()).toBe(1);
      });
    });

    describe('and the next token is also in the dictionary', () => {
      it('should return the expected value', () => {
        const sut = new CompactorStack();
        const expectedContent = Buffer.from([0x67, 0x12, 0x67, 0x97]);

        sut.append(expectedContent);

        expect(
          sut.popNextToken(
            new Dictionary(Buffer.from([0x67, 0x12, 0x67, 0x97]))
          )
        ).toMatchObject({
          token: Buffer.from([0x97]),
          prefix: null
        });
        expect(sut.getAvailableBytes()).toBe(0);
      });
    });
  });

  describe('The `getAvailableBytes` method', () => {
    describe('when the internal Buffer is empty', () => {
      it('should return the expected value', () => {
        const sut = new CompactorStack();
        expect(sut.getAvailableBytes()).toBe(0);
      });
    });

    describe('when the internal Buffer is a single byte', () => {
      it('should return the expected value', () => {
        const sut = new CompactorStack();
        sut.append(Buffer.from([0x56, 0x44]));
        expect(sut.getAvailableBytes()).toBe(2);
      });
    });
  });
});
