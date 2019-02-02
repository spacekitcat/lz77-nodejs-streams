import generator from '../../src/generator';

describe('The `generator` function', () => {
    describe('when a single byte buffer and an empty dictionary is specified', () => {
        it('should return the expected result', () => {
            const specifiedDictionary = Buffer.from([]);
            const specifiedReadBuffer = Buffer.from([0x61]);

            expect(generator(specifiedDictionary, specifiedReadBuffer)).toMatchObject({
                token: specifiedReadBuffer,
                prefix: null
            });
        });

        it('should return the expected result (variation of the test data)', () => {
            const specifiedDictionary = Buffer.from([]);
            const specifiedReadBuffer = Buffer.from([0x45]);

            expect(generator(specifiedDictionary, specifiedReadBuffer)).toMatchObject({
                token: specifiedReadBuffer,
                prefix: null
            });
        });
    });

    
});
