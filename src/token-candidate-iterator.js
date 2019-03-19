class TokenCandidateIterator {
  constructor() {
    this.iternalBuffer = Buffer.from([]);
    this.offset = this.iternalBuffer.length;
  }

  append(appendList) {
    this.iternalBuffer = Buffer.concat([this.iternalBuffer, appendList]);
  }

  peak() {
    return this.iternalBuffer.slice(this.offset);
  }

  next() {
    this.offset += 1;
  }
}

export default TokenCandidateIterator;
