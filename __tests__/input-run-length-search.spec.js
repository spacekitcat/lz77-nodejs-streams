import InputRunLengthSearch from '../src/input-run-length-search';
import Dictionary from '../src/dictionary';

const assertScenario = ({
  dictionaryContents,
  inputBufferContents,
  expectedMatch,
  expectedFindCallCount
}) => {
  const dictionary = new Dictionary();
  const sut = new InputRunLengthSearch();

  sut.append(inputBufferContents);
  dictionary.append(dictionaryContents);
  const findSpy = jest.spyOn(dictionary, 'find');

  if (expectedMatch) {
    const expected = dictionary.find(expectedMatch);
    const result = sut.findMatchingSubString(dictionary);
    expect(result).toEqual(expected);
    expect(findSpy).toHaveBeenCalledTimes(expectedFindCallCount + 1);
  } else {
    expect(sut.findMatchingSubString(dictionary)).toBe(null);
    expect(findSpy).toHaveBeenCalledTimes(expectedFindCallCount);
  }
};

describe('The `findMatchingSubString` function', () => {
  describe('when the dictionary has a size of 1', () => {
    it('should return a match (dictionary: [0x4c], searchBuffer: [0x4c])', () => {
      assertScenario({
        dictionaryContents: Buffer.from([0x4c]),
        inputBufferContents: Buffer.from([0x4c]),
        expectedMatch: Buffer.from([0x4c]),
        expectedFindCallCount: 1
      });
    });

    it('should return a match for (dictionary: [0x4c], searchBuffer: [0x4c, 0x4e])', () => {
      assertScenario({
        dictionaryContents: Buffer.from([0x4c]),
        inputBufferContents: Buffer.from([0x4c, 0x4e]),
        expectedMatch: Buffer.from([0x4c]),
        expectedFindCallCount: 1
      });
    });

    it('should return null for (dictionary: [0x4c], searchBuffer: [0x4d])', () => {
      assertScenario({
        dictionaryContents: Buffer.from([0x4c]),
        inputBufferContents: Buffer.from([0x4d]),
        expectedMatch: null,
        expectedFindCallCount: 1
      });
    });

    it('should return null for (dictionary: [0x4c], searchBuffer: [0x4e, 0x4c])', () => {
      assertScenario({
        dictionaryContents: Buffer.from([0x4c]),
        inputBufferContents: Buffer.from([0x4e, 0x4c]),
        expectedMatch: null,
        expectedFindCallCount: 1
      });
    });
  });

  describe('when the dictionary has a size of 2', () => {
    it('should return a match (dictionary: [0x15, 0x56], searchBuffer: [0x15])', () => {
      assertScenario({
        dictionaryContents: Buffer.from([0x15, 0x56]),
        inputBufferContents: Buffer.from([0x15]),
        expectedMatch: Buffer.from([0x15]),
        expectedFindCallCount: 1
      });
    });

    it('should return a match (dictionary: [0x15, 0x56], searchBuffer: [0x56])', () => {
      assertScenario({
        dictionaryContents: Buffer.from([0x15, 0x56]),
        inputBufferContents: Buffer.from([0x56]),
        expectedMatch: Buffer.from([0x56]),
        expectedFindCallCount: 1
      });
    });

    it('should return a match (dictionary: [0x15, 0x56], searchBuffer: [0x15, 0x56])', () => {
      assertScenario({
        dictionaryContents: Buffer.from([0x15, 0x56]),
        inputBufferContents: Buffer.from([0x15, 0x56]),
        expectedMatch: Buffer.from([0x15, 0x56]),
        expectedFindCallCount: 1
      });
    });

    it('should return a match (dictionary: [0x15, 0x56], searchBuffer: [0x15, 0x56, 0x89])', () => {
      assertScenario({
        dictionaryContents: Buffer.from([0x15, 0x56]),
        inputBufferContents: Buffer.from([0x15, 0x56, 0x89]),
        expectedMatch: Buffer.from([0x15, 0x56]),
        expectedFindCallCount: 1
      });
    });

    it('should return null (dictionary: [0x15, 0x56], searchBuffer: [0x26])', () => {
      assertScenario({
        dictionaryContents: Buffer.from([0x15, 0x56]),
        inputBufferContents: Buffer.from([0x26]),
        expectedMatch: null,
        expectedFindCallCount: 1
      });
    });

    it('should return null (dictionary: [0x15, 0x56], searchBuffer: [0x89, 0x15, 0x56])', () => {
      assertScenario({
        dictionaryContents: Buffer.from([0x15, 0x56]),
        inputBufferContents: Buffer.from([0x89, 0x15, 0x56]),
        expectedMatch: null,
        expectedFindCallCount: 1
      });
    });
  });

  describe('when the dictionary has a size of 3', () => {
    it('should return a match (dictionary: [0x57, 0x23, 0x87], searchBuffer: [0x57, 0x23])', () => {
      assertScenario({
        dictionaryContents: Buffer.from([0x57, 0x23, 0x87]),
        inputBufferContents: Buffer.from([0x57, 0x23]),
        expectedMatch: Buffer.from([0x57, 0x23]),
        expectedFindCallCount: 1
      });
    });

    it('should return a match (dictionary: [0x57, 0x23, 0x87], searchBuffer: [0x23, 0x87])', () => {
      assertScenario({
        dictionaryContents: Buffer.from([0x57, 0x23, 0x87]),
        inputBufferContents: Buffer.from([0x23, 0x87]),
        expectedMatch: Buffer.from([0x23, 0x87]),
        expectedFindCallCount: 1
      });
    });
  });
});
