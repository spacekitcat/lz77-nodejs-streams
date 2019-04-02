import ToatieCache from 'tiny-toatie-cache';

class Dictionary {
  constructor(initialBufferContent) {
    const cacheStorageSize = 2000000;
    this.internalStorage = ToatieCache.build(cacheStorageSize);
    if (initialBufferContent) {
      this.internalStorage.append(initialBufferContent);
    }
  }

  getInternalStore() {
    return this.internalStorage;
  }

  append(data) {
    this.internalStorage.append(data);
  }

  getLength() {
    // TODO: Expose the length in TTC
    return this.getInternalStore()
      .getInternalStore()
      .getReadOnlyBuffer().length;
  }

  find(target) {
    return this.internalStorage.find(target);
  }
}

export default Dictionary;
