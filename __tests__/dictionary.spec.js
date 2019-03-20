import Dictionary from '../src/dictionary';

describe('The `Dictionary` class', () => {
  describe('the constructor', () => {
    it('should instantiate with empty internal storage', () => {
      const dictionary = new Dictionary();
      expect(
        dictionary
          .getInternalStore()
          .getInternalStore()
          .getReadOnlyBuffer()
      ).toMatchObject([]);
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
          .getReadOnlyBuffer()
      ).toMatchObject(appendData);
    });
  });

  describe('the `find` method', () => {
    describe('and the buffer is empty', () => {
      it('should return null', () => {
        const dictionary = new Dictionary();
        expect(dictionary.find([0x4c])).toBe(null);
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
