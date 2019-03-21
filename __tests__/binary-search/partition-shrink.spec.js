import partitionShrink from '../../src/binary-search/partition-shrink';

const assertCalculation = ({ from, to, expected }) => {
  expect(partitionShrink(from, to)).toBe(expected);
};

const cases = [
  { from: 0, to: 0, expected: null },
  { from: 0, to: 0, expected: null },
  { from: 0, to: 0, expected: null }
];

describe('The `partitionGrow` function', () => {
  it('passes the bank of the scenarios', () => {
    cases.forEach(assertCalculation);
  });
});
