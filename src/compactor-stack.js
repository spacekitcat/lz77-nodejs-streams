import findNextToken from './binary-search/dictionary-token-finder';

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

  popNextToken(dictionary) {
    if (this.internalBuffer.length > 0) {
      let token = this.internalBuffer.slice(
        this.internalBuffer.length - 1,
        this.internalBuffer.length
      );

      let searchPartition = this.internalBuffer.slice(
        0,
        this.internalBuffer.length - 1
      );

      const result = findNextToken(dictionary, searchPartition);

      if (!result.value) {
        token = this.internalBuffer.slice(0, 1);
      } else {
        if (result.length < this.internalBuffer.length) {
          token = this.internalBuffer.slice(result.length, result.length + 1);
        }
      }

      return {
        token: token
      };
    }

    return null;
  }
}

export default CompactorStack;
