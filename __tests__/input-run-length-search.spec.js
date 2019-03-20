import InputRunLengthSearch from '../src/input-run-length-search';

describe('The `findMatchingSubString` function', () => {
  describe('when the internal buffer is empty', () => {
    describe('and input is empty', () => {
      it('should return `null`', () => {
        const sut = new InputRunLengthSearch();
        sut.append(Buffer.from([]));
        expect(sut.findMatchingSubString(Buffer.from([]))).toBe(null);
      });
    });

    describe('and `input` is of length 1', () => {
      it('should return `null`', () => {
        const sut = new InputRunLengthSearch();
        sut.append(Buffer.from([]));
        expect(sut.findMatchingSubString(Buffer.from([0x4C]))).toBe(null);        
      });
    });
  });

  describe('when the internal buffer is of length 1', () => {
    describe('and `input` is empty', () => {
      it('should return `null`', () => {
        const sut = new InputRunLengthSearch();
        sut.append(Buffer.from([0x4c]));
        expect(sut.findMatchingSubString(Buffer.from([]))).toBe(null);
      });
    });

    describe('and `input` is a non-match of length 1', () => {
      it('should return `null`', () => {
        const sut = new InputRunLengthSearch();
        sut.append(Buffer.from([0x4C]));
        expect(sut.findMatchingSubString(Buffer.from([0x53]))).toBe(null);        
      });
    });
  });
});
