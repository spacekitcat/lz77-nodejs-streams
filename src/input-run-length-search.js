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
    // TODO: Expose the length in dictionary (and then also do it in TTC)
    const dictionarySize = dictionary
      .getInternalStore()
      .getInternalStore()
      .getReadOnlyBuffer().length;

    let internalBufferPartition = this.internalBuffer.slice(0, dictionarySize);
    return dictionary.find(internalBufferPartition);
  }
}

export default InputRunLengthSearch;
