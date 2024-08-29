import { PermutationEnumeration } from '../../src/enumerations/PermutationEnumeration';

describe('PermutationEnumeration', () => {
    it('should return [] for n=0', () => {
        const enumeration = new PermutationEnumeration(0);
        expect(enumeration.nextElement()).toEqual([]);
        expect(enumeration.hasMoreElements()).toEqual(false);
    });

    it('should return [0] for n=1', () => {
        const enumeration = new PermutationEnumeration(1);
        expect(enumeration.nextElement()).toEqual([0]);
        expect(enumeration.hasMoreElements()).toEqual(false);
    });

    it('should correctly enumerate permutations for n=4', () => {
        const enumeration = new PermutationEnumeration(4);

        const expectedResults = [
            [0, 1, 2, 3],
            [0, 1, 3, 2],
            [0, 2, 1, 3],
            [0, 2, 3, 1],
            [0, 3, 1, 2],
            [0, 3, 2, 1],
            [1, 0, 2, 3],
            [1, 0, 3, 2],
            [1, 2, 0, 3],
            [1, 2, 3, 0],
            [1, 3, 0, 2],
            [1, 3, 2, 0],
            [2, 0, 1, 3],
            [2, 0, 3, 1],
            [2, 1, 0, 3],
            [2, 1, 3, 0],
            [2, 3, 0, 1],
            [2, 3, 1, 0],
            [3, 0, 1, 2],
            [3, 0, 2, 1],
            [3, 1, 0, 2],
            [3, 1, 2, 0],
            [3, 2, 0, 1],
            [3, 2, 1, 0],
       ];

        for (const expected of expectedResults) {
            const result = enumeration.nextElement();
            expect(result).toEqual(expected);
        }
        expect(enumeration.hasMoreElements()).toEqual(false);
    });
});

