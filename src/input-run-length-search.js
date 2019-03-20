class InputRunLengthSearch {
  constructor() {
    this.internalBuffer = Buffer.from([]);
    this.offset = this.internalBuffer.length;
  }

  append(appendList) {
    this.internalBuffer = Buffer.concat([this.internalBuffer, appendList]);
  }

  findMatchingSubString(input, matchCriteria) {
    return null;
  }
}

export default InputRunLengthSearch;
