import { CombinationEnumeration } from '../../src/enumerations/CombinationEnumeration';

describe('CombinationEnumeration', () => {
    it('should return an empty array for n=0 and k=0', () => {
        const enumeration = new CombinationEnumeration(0,0);
        expect(enumeration.nextElement().getCombinationAsArray()).toEqual([]);
        expect(enumeration.hasMoreElements()).toEqual(false);
    });

    it('should return [0] for n=1 and k=1', () => {
        const enumeration = new CombinationEnumeration(1,1);
        expect(enumeration.nextElement().getCombinationAsArray()).toEqual([0]);
        expect(enumeration.hasMoreElements()).toEqual(false);
    });
    it('should return [] for n=1 and k=0', () => {
        const enumeration = new CombinationEnumeration(1,0);
        expect(enumeration.nextElement().getCombinationAsArray()).toEqual([]);
        expect(enumeration.hasMoreElements()).toEqual(false);
    });

    it('should correctly enumerate permutations for n=4 and k=2', () => {
        const enumeration = new CombinationEnumeration(4,2);

        const expectedResults = [
            [0, 1],
            [0, 2],
            [1, 2],
            [0, 3],
            [1, 3],
            [2, 3]
        ];

        for (const expected of expectedResults) {
            const result = enumeration.nextElement().getCombinationAsArray();
            expect(result).toEqual(expected);
        }
        expect(enumeration.hasMoreElements()).toEqual(false);
    });
});

