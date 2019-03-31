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

  getAvailableBytes() {
    return this.internalBuffer.length;
  }

  popNextToken(dictionary) {
    if (this.internalBuffer.length > 0) {
      let searchPartition = this.internalBuffer.slice(
        0,
        this.internalBuffer.length - 1
      );

      const result = findNextToken(dictionary, searchPartition);

      let token;
      let prefix = null;
      if (!result.value) {
        token = this.internalBuffer.slice(0, 1);
        this.internalBuffer = this.internalBuffer.slice(
          1,
          this.internalBuffer.length
        );
      } else {
        token = this.internalBuffer.slice(result.length, result.length + 1);
        this.internalBuffer = this.internalBuffer.slice(
          result.length + 1,
          this.internalBuffer.length
        );
        prefix = result;
      }

      return {
        token,
        prefix
      };
    }

    return null;
  }
}

export default CompactorStack;
