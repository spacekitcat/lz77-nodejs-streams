import partitionShrink from '../../src/binary-search/partition-shrink';

const assertCalculation = ({ from, to, expected }) => {
  expect(partitionShrink(from, to)).toBe(expected);
};

const cases = [
  { from: 0, to: 0, expected: null },
  { from: 1, to: 0, expected: null },
  { from: 1, to: 1, expected: null },

  { from: 0, to: 1, expected: 0 },
  { from: 0, to: 2, expected: 1 },
  { from: 0, to: 3, expected: 1 },
  { from: 0, to: 4, expected: 2 },
  { from: 0, to: 5, expected: 2 },
  { from: 0, to: 6, expected: 3 },

  { from: 1, to: 2, expected: 1 },
  { from: 1, to: 3, expected: 2 },
  { from: 1, to: 4, expected: 2 },
  { from: 1, to: 5, expected: 3 },
  { from: 1, to: 6, expected: 3 },
  { from: 1, to: 7, expected: 4 },

  { from: 2, to: 3, expected: 2 },
  { from: 2, to: 4, expected: 3 },
  { from: 2, to: 5, expected: 3 },
  { from: 2, to: 6, expected: 4 },
  { from: 2, to: 7, expected: 4 },
  { from: 2, to: 8, expected: 5 },

  { from: 3, to: 4, expected: 3 },
  { from: 3, to: 5, expected: 4 },
  { from: 3, to: 6, expected: 4 },
  { from: 3, to: 7, expected: 5 },
  { from: 3, to: 8, expected: 5 },
  { from: 3, to: 9, expected: 6 }
];

describe('The `partitionGrow` function', () => {
  it('passes the bank of the scenarios', () => {
    cases.forEach(assertCalculation);
  });
});
