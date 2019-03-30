import partitionShrink from './partition-shrink';
import partitionGrow from './partition-grow';

export default (dictionary, searchBuffer) => {
  let maximum = searchBuffer.length;
  let partition = partitionShrink(0, maximum);
  let result = null;

  while (partition !== null) {
    let internalBufferPartition = searchBuffer.slice(0, partition + 1);
    result = dictionary.find(internalBufferPartition);
    if (!result) {
      maximum = partition;
      partition = partitionShrink(0, partition);
    } else {
      partition = partitionGrow(0, partition, maximum);
    }
  }

  if (result) {
    return result;
  }

  return {
    value: null,
    offset: null,
    length: null
  };
};
