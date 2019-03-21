import partitionShrink from '../src/binary-search/partition-shrink';

class InputRunLengthSearch {
  constructor() {
    this.internalBuffer = Buffer.from([]);
    this.offset = this.internalBuffer.length;
  }

  append(appendList) {
    this.internalBuffer = Buffer.concat([this.internalBuffer, appendList]);
  }

  findMatchingSubString(dictionary) {
    const partition = partitionShrink(0, this.internalBuffer.length);
    return dictionary.find(this.internalBuffer.slice(0, partition + 1));
  }
}

export default InputRunLengthSearch;
