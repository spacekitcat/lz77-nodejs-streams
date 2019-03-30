import findNextToken from '../../src/binary-search/dictionary-token-finder';
import Dictionary from '../../src/dictionary';

const performTest = (
  { specifiedDictionaryBuffer, specifiedSearchBuffer },
  { expectedValue, expectedOffset, expectedLength }
) => {
  const dictionary = new Dictionary();
  dictionary.append(Buffer.from(specifiedDictionaryBuffer));
  expect(
    findNextToken(dictionary, Buffer.from(specifiedSearchBuffer))
  ).toMatchObject({
    value: expectedValue,
    offset: expectedOffset,
    length: expectedLength
  });
};

describe('The `findNextToken` function', () => {
  it('should return the expected result (dictionary: [0x4c], searchBuffer: [0x4c])', () => {
    performTest(
      { specifiedDictionaryBuffer: [0x4c], specifiedSearchBuffer: [0x4c] },
      {
        expectedValue: Buffer.from([0x4c]),
        expectedOffset: 0,
        expectedLength: 1
      }
    );
  });

  it('should return the expected result (dictionary: [0x8c], searchBuffer: [0x4c])', () => {
    performTest(
      { specifiedDictionaryBuffer: [0x8c], specifiedSearchBuffer: [0x4c] },
      { expectedValue: null, expectedOffset: null, expectedLength: null }
    );
  });

  it('should return the expected result (dictionary: [0x4c, 0x78], searchBuffer: [0x4c])', () => {
    performTest(
      {
        specifiedDictionaryBuffer: [0x4c, 0x78],
        specifiedSearchBuffer: [0x4c]
      },
      {
        expectedValue: Buffer.from([0x4c]),
        expectedOffset: 1,
        expectedLength: 1
      }
    );
  });

  it('should return the expected result (dictionary: [0x33], searchBuffer: [0x33, 0x4c])', () => {
    performTest(
      {
        specifiedDictionaryBuffer: [0x33],
        specifiedSearchBuffer: [0x33, 0x4c]
      },
      {
        expectedValue: Buffer.from([0x33]),
        expectedOffset: 0,
        expectedLength: 1
      }
    );
  });

  it('should return the expected result (dictionary: [0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x30], searchBuffer: [0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28])', () => {
    performTest(
      {
        specifiedDictionaryBuffer: [
          0x20,
          0x21,
          0x22,
          0x23,
          0x24,
          0x25,
          0x26,
          0x27,
          0x28,
          0x29,
          0x30
        ],
        specifiedSearchBuffer: [0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28]
      },
      {
        expectedValue: Buffer.from([0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28]),
        expectedOffset: 8,
        expectedLength: 7
      }
    );
  });
});
