import CompactorStack from '../src/compactor-stack';

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

        expect(sut.popNextToken()).toBe(null);
      });
    });

    describe('when the internal Buffer is a single byte', () => {
      it('should return the expected value', () => {
        const sut = new CompactorStack();
        const expectedContent = Buffer.from([0x34]);
        sut.append(expectedContent);
        expect(sut.popNextToken()).toMatchObject({
          token: expectedContent
        });
      });
    });
  });
});
