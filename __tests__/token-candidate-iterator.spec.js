import TokenCandidateIterator from '../src/token-candidate-iterator';

const assertIterator = (sut, expectedOrderedResults) => {
  expectedOrderedResults.forEach(item => {
      expect(sut.peak()).toMatchObject(item);
      sut.next();
  });
};

describe('The `readNextTokenCandidate` function', () => {
  describe('when the internal buffer is empty', () => {
    it('should return `null`', () => {
      const sut = new TokenCandidateIterator();

      assertIterator(sut, [Buffer.from([])]);
    });
  });

  describe('when the internal buffer has a length of 1', () => {
    it('should return the expected Buffer', () => {
      const sut = new TokenCandidateIterator();
      const expectedContents = Buffer.from([0x33]);
      sut.append(expectedContents);
      assertIterator(sut, [ Buffer.from([0x33]), Buffer.from([]) ]);
    });
  });

  describe('when the internal buffer has a length of 2', () => {
    it('should return the expected Buffer', () => {
      const sut = new TokenCandidateIterator();
      const expectedContents = Buffer.from([0x33, 0x35]);
      sut.append(expectedContents);
      assertIterator(sut, [
        Buffer.from([0x33, 0x35]),
        Buffer.from([0x35]),
        Buffer.from([])
      ]);
    });
  });
});
