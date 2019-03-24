import LibzStream from '../src/libz-stream';
import { isTSAnyKeyword } from '@babel/types';

describe('The `LibzStream` class', () => {
  it('should work', () => {
    const stream = new LibzStream();

    expect(stream).not.toBe(null);
  });
});
