import ToatieCache from 'tiny-toatie-cache';

class Dictionary {
  constructor() {
    const cacheStorageSize = 1234456;
    this.internalStorage = ToatieCache.build(cacheStorageSize);
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
