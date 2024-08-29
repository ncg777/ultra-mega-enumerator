import { CompositionEnumeration } from '../../src/enumerations/CompositionEnumeration';

describe('CompositionEnumeration', () => {
    it('should return [1] for n=1', () => {
        const enumeration = new CompositionEnumeration(1);
        expect(enumeration.nextElement().getCompositionAsArray()).toEqual([1]);
        expect(enumeration.hasMoreElements()).toEqual(false);
    });

    it('should correctly enumerate compositions for n=4', () => {
        const enumeration = new CompositionEnumeration(4);

        const expectedResults = [
            [4],
            [1,3],
            [2,2],
            [1,1,2],
            [3,1],
            [1,2,1],
            [2,1,1],
            [1,1,1,1]
        ];

        for (const expected of expectedResults) {
            const result = enumeration.nextElement().getCompositionAsArray();
            expect(result).toEqual(expected);
        }
        expect(enumeration.hasMoreElements()).toEqual(false);
    });
});

