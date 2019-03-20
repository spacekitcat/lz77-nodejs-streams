class InputRunLengthSearch {
  constructor() {
    this.internalBuffer = Buffer.from([]);
    this.offset = this.internalBuffer.length;
  }

  append(appendList) {
    this.internalBuffer = Buffer.concat([this.internalBuffer, appendList]);
  }

  findMatchingSubString(dictionary) {
    for (let i = 0; i < this.internalBuffer.length; ++i) {
      dictionary.find(this.internalBuffer.slice(0, i));
    }

    return dictionary.find(this.internalBuffer);
  }
}

export default InputRunLengthSearch;
