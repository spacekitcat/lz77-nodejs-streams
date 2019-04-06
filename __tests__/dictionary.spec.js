import Dictionary from '../src/dictionary';

describe('The `Dictionary` class', () => {
  describe('the constructor', () => {
    it('should instantiate with empty internal storage', () => {
      const dictionary = new Dictionary();
      expect(
        dictionary
          .getInternalStore()
          .getInternalStore()
          .getBufferCopy()
      ).toMatchObject(Buffer.from([]));
    });

    describe('and initial data is specified', () => {
      const expectedBuffer = Buffer.from([0x45]);
      const dictionary = new Dictionary(expectedBuffer);
      expect(
        dictionary
          .getInternalStore()
          .getInternalStore()
          .getBufferCopy()
      ).toMatchObject(expectedBuffer);
    });
  });

  describe('the append method', () => {
    it('should append the specified data', () => {
      const dictionary = new Dictionary();
      const appendData = Buffer.from([0x4c, 0x53, 0x44]);
      dictionary.append(appendData);

      expect(
        dictionary
          .getInternalStore()
          .getInternalStore()
          .getBufferCopy()
      ).toMatchObject(appendData);
      expect(dictionary.getLength()).toBe(3);
    });
  });

  describe('the `find` method', () => {
    describe('and the buffer is empty', () => {
      it('should return null', () => {
        const dictionary = new Dictionary();
        expect(dictionary.find(Buffer.from([0x4c]))).toBe(null);
      });
    });

    describe('and the buffer has content', () => {
      it('should append the specified data', () => {
        const dictionary = new Dictionary();
        const searchTarget = Buffer.from([0x4c]);
        dictionary.append(searchTarget);

        expect(dictionary.find(searchTarget)).toMatchObject(
          dictionary.getInternalStore().find(searchTarget)
        );
      });
    });
  });
});
