import generator from '../../src/generator';

describe('The `generator` function', () => {
    describe('when the specified read buffer contains a single byte', () => {
        describe('and an empty dictionary is specified', () => {
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

        describe('and a single byte dictionary is specified', () => {
            it('should return the expected result', () => {
                const specifiedDictionary = Buffer.from([0x32]);
                const specifiedReadBuffer = Buffer.from([0x45]);

                expect(generator(specifiedDictionary, specifiedReadBuffer)).toMatchObject({
                    token: specifiedReadBuffer,
                    prefix: null
                });
            });
        });


        describe('and a multi-byte dictionary is specified', () => {
            it('should return the expected result', () => {
                const specifiedDictionary = Buffer.from([0x32, 0x33, 0x32, 0x12, 0x67]);
                const specifiedReadBuffer = Buffer.from([0x81]);

                expect(generator(specifiedDictionary, specifiedReadBuffer)).toMatchObject({
                    token: specifiedReadBuffer,
                    prefix: null
                });
            });
        });
    });

    describe('when the specified read buffer contains multiple byte', () => {
        describe('and an empty dictionary is specified', () => {
            it('should return the expected result', () => {
                const specifiedDictionary = Buffer.from([]);
                const specifiedReadBuffer = Buffer.from([0x17, 0x25, 0x50, 0x75, 0xFF]);

                expect(generator(specifiedDictionary, specifiedReadBuffer)).toMatchObject({
                    token: specifiedReadBuffer.slice(0, 1),
                    prefix: null
                });
            });

            it('should return the expected result (variation of the test data)', () => {
                const specifiedDictionary = Buffer.from([]);
                const specifiedReadBuffer = Buffer.from([0xAE, 0xEA, 0x3A, 0xF9, 0xEE]);

                expect(generator(specifiedDictionary, specifiedReadBuffer)).toMatchObject({
                    token: specifiedReadBuffer.slice(0, 1),
                    prefix: null
                });
            });
        });

        describe('and a single byte dictionary with no matches is specified', () => {
            it('should return the expected result', () => {
                const specifiedDictionary = Buffer.from([0x99]);
                const specifiedReadBuffer = Buffer.from([0x11, 0x22]);

                expect(generator(specifiedDictionary, specifiedReadBuffer)).toMatchObject({
                    token: specifiedReadBuffer.slice(0, 1),
                    prefix: null
                });
            });
        });

        describe('and a single byte dictionary with matches is specified', () => {
            it('should return the expected result', () => {
                const specifiedDictionary = Buffer.from([0x4A]);
                const specifiedReadBuffer = Buffer.from([0x4A, 0xDD]);

                expect(generator(specifiedDictionary, specifiedReadBuffer)).toMatchObject({
                    token: specifiedReadBuffer.slice(1, 2),
                    prefix: {
                        fromPosition: 0,
                        toPosition: 1
                    }
                });
            });
        });
    });
});
