import { throwStatement } from '@babel/types';

class CompactorStack {
  constructor() {
    this.internalBuffer = Buffer.from([]);
  }

  append(newByteData) {
    this.internalBuffer = Buffer.concat([this.internalBuffer, newByteData]);
  }

  getInternalBuffer() {
    return this.internalBuffer;
  }

  popNextToken() {
    if (this.internalBuffer.length > 0) {
      return {
        token: this.internalBuffer.slice(
          this.internalBuffer.length - 1,
          this.internalBuffer.length
        )
      };
    }

    return null;
  }
}

export default CompactorStack;
