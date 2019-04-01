import { Transform } from 'stream';
import CompactorStack from './compactor-stack';
import Dictionary from './dictionary';

class LibzStream extends Transform {
  constructor(options) {
    super({ objectMode: true });

    this.compactor = new CompactorStack();
    this.dictionary = new Dictionary();
  }

  _transform(chunk, encoding, callback) {
    this.compactor.append(chunk);
    while (this.compactor.getAvailableBytes() > 0) {
      const result = this.compactor.popNextToken(this.dictionary);
      this.dictionary.append(result.token);
      this.push(result);
    }
    callback();
  }
}

export default LibzStream;
