import partitionGrow from '../../src/binary-search/partition-grow';

const assertCalculation = ({ from, to, parent_size, expected }) => {
  expect(partitionGrow(from, to, parent_size)).toBe(expected);
};

const cases = [
  { from: 0, to: 0, parent_size: 0, expected: null },
  { from: 0, to: 0, parent_size: 1, expected: null },
  { from: 0, to: 0, parent_size: 2, expected: 1 },

  { from: 1, to: 0, parent_size: 0, expected: null },
  { from: 1, to: 0, parent_size: 1, expected: null },
  { from: 1, to: 0, parent_size: 2, expected: null },

  { from: 0, to: 1, parent_size: 2, expected: null },
  { from: 0, to: 1, parent_size: 3, expected: 2 },
  { from: 0, to: 1, parent_size: 4, expected: 3 },
  { from: 0, to: 1, parent_size: 5, expected: 3 },
  { from: 0, to: 1, parent_size: 6, expected: 4 },
  { from: 0, to: 1, parent_size: 7, expected: 4 },
  { from: 0, to: 1, parent_size: 8, expected: 5 },

  { from: 1, to: 2, parent_size: 3, expected: null },
  { from: 1, to: 2, parent_size: 4, expected: 3 },
  { from: 1, to: 2, parent_size: 5, expected: 4 },
  { from: 1, to: 2, parent_size: 6, expected: 4 },
  { from: 1, to: 2, parent_size: 7, expected: 5 },
  { from: 1, to: 2, parent_size: 8, expected: 5 },
  { from: 1, to: 2, parent_size: 9, expected: 6 }
];

describe('The `partitionGrow` function', () => {
  it('passes the bank of the scenarios', () => {
    cases.forEach(assertCalculation);
  });
});
