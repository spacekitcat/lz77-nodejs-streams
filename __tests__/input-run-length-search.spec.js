import InputRunLengthSearch from '../src/input-run-length-search';
import Dictionary from '../src/dictionary';

describe('The `findMatchingSubString` function', () => {
  describe('when the internal buffer is empty', () => {
    describe('and the dictionary is empty', () => {
      it('should return `null`', () => {
        const sut = new InputRunLengthSearch();
        const dictionary = new Dictionary();
        const findSpy = jest.spyOn(dictionary, 'find');

        expect(sut.findMatchingSubString(dictionary)).toBe(null);
        expect(findSpy).toHaveBeenCalled();
      });
    });

    describe('and the dictionary has a length of 1', () => {
      it('should return `null`', () => {
        const sut = new InputRunLengthSearch();
        const dictionary = new Dictionary();
        const findSpy = jest.spyOn(dictionary, 'find');

        expect(sut.findMatchingSubString(dictionary)).toBe(null);
        expect(findSpy).toHaveBeenCalled();
      });
    });
  });

  describe('when the internal buffer is of length 1', () => {
    describe('and the dictionary is empty', () => {
      it('should return `null`', () => {
        const data = Buffer.from([0x79]);
        const sut = new InputRunLengthSearch();
        const dictionary = new Dictionary();
        const findSpy = jest.spyOn(dictionary, 'find');
        sut.append(data);

        expect(sut.findMatchingSubString(dictionary)).toBe(null);
        expect(findSpy).toHaveBeenCalledWith(data);
      });
    });

    describe('and the dictionary is the same as the internal buffer', () => {
      it('should return the expected data', () => {
        const data = Buffer.from([0x4c]);
        const sut = new InputRunLengthSearch();
        const dictionary = new Dictionary();
        const findSpy = jest.spyOn(dictionary, 'find');

        sut.append(data);
        dictionary.append(data);

        expect(sut.findMatchingSubString(dictionary)).toMatchObject(
          dictionary.find(data)
        );
        expect(findSpy).toHaveBeenCalledTimes(2);
        expect(findSpy).toHaveBeenCalledWith(Buffer.from(data));
      });
    });
  });
});
