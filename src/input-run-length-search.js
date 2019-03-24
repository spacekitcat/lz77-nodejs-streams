import partitionShrink from './binary-search/partition-shrink';
import partitionGrow from './binary-search/partition-grow';

class InputRunLengthSearch {
  constructor() {
    this.internalBuffer = Buffer.from([]);
    this.offset = this.internalBuffer.length;
  }

  append(appendList) {
    this.internalBuffer = Buffer.concat([this.internalBuffer, appendList]);
  }

  findMatchingSubString(dictionary) {
    let maximum = this.internalBuffer.length;
    let partition = partitionShrink(0, maximum);
    let result = null;

    while (partition !== null) {
      let internalBufferPartition = this.internalBuffer.slice(0, partition + 1);
      result = dictionary.find(internalBufferPartition);
      if (!result) {
        maximum = partition;
        partition = partitionShrink(0, partition);
      } else {
        partition = partitionGrow(0, partition, maximum);
      }
    }

    return result;
  }
}

export default InputRunLengthSearch;
