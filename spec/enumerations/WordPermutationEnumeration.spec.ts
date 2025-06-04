import { WordPermutationEnumeration } from '../../src/enumerations/WordPermutationEnumeration';

describe('WordPermutationEnumeration', () => {
    it('should return an empty array for rk = []', () => {
        const enumeration = new WordPermutationEnumeration([]);
        expect(enumeration.nextElement()).toEqual([]);
        expect(enumeration.hasMoreElements()).toEqual(false);
    });

    it('should return [0] for rk = [1]', () => {
        const enumeration = new WordPermutationEnumeration([1]);
        expect(enumeration.nextElement()).toEqual([0]);
        expect(enumeration.hasMoreElements()).toEqual(false);
    });

    it('should correctly enumerate permutations for rk = [1, 2, 3]', () => {
        const enumeration = new WordPermutationEnumeration([1, 2, 3]);

        const expectedResults = [
            [0, 1, 1, 2, 2, 2],
            [1, 0, 1, 2, 2, 2],
            [1, 1, 0, 2, 2, 2],
            [0, 1, 2, 1, 2, 2],
            [1, 0, 2, 1, 2, 2],
            [1, 1, 2, 0, 2, 2],
            [0, 1, 2, 2, 1, 2],
            [1, 0, 2, 2, 1, 2],
            [1, 1, 2, 2, 0, 2],
            [0, 1, 2, 2, 2, 1],
            [1, 0, 2, 2, 2, 1],
            [1, 1, 2, 2, 2, 0],
            [0, 2, 1, 1, 2, 2],
            [1, 2, 0, 1, 2, 2],
            [1, 2, 1, 0, 2, 2],
            [0, 2, 1, 2, 1, 2],
            [1, 2, 0, 2, 1, 2],
            [1, 2, 1, 2, 0, 2],
            [0, 2, 1, 2, 2, 1],
            [1, 2, 0, 2, 2, 1],
            [1, 2, 1, 2, 2, 0],
            [0, 2, 2, 1, 1, 2],
            [1, 2, 2, 0, 1, 2],
            [1, 2, 2, 1, 0, 2],
            [0, 2, 2, 1, 2, 1],
            [1, 2, 2, 0, 2, 1],
            [1, 2, 2, 1, 2, 0],
            [0, 2, 2, 2, 1, 1],
            [1, 2, 2, 2, 0, 1],
            [1, 2, 2, 2, 1, 0],
            [2, 0, 1, 1, 2, 2],
            [2, 1, 0, 1, 2, 2],
            [2, 1, 1, 0, 2, 2],
            [2, 0, 1, 2, 1, 2],
            [2, 1, 0, 2, 1, 2],
            [2, 1, 1, 2, 0, 2],
            [2, 0, 1, 2, 2, 1],
            [2, 1, 0, 2, 2, 1],
            [2, 1, 1, 2, 2, 0],
            [2, 0, 2, 1, 1, 2],
            [2, 1, 2, 0, 1, 2],
            [2, 1, 2, 1, 0, 2],
            [2, 0, 2, 1, 2, 1],
            [2, 1, 2, 0, 2, 1],
            [2, 1, 2, 1, 2, 0],
            [2, 0, 2, 2, 1, 1],
            [2, 1, 2, 2, 0, 1],
            [2, 1, 2, 2, 1, 0],
            [2, 2, 0, 1, 1, 2],
            [2, 2, 1, 0, 1, 2],
            [2, 2, 1, 1, 0, 2],
            [2, 2, 0, 1, 2, 1],
            [2, 2, 1, 0, 2, 1],
            [2, 2, 1, 1, 2, 0],
            [2, 2, 0, 2, 1, 1],
            [2, 2, 1, 2, 0, 1],
            [2, 2, 1, 2, 1, 0],
            [2, 2, 2, 0, 1, 1],
            [2, 2, 2, 1, 0, 1],
            [2, 2, 2, 1, 1, 0]
        ];

        for (const expected of expectedResults) {
            const result = enumeration.nextElement();
            expect(result).toEqual(expected);
        }
        expect(enumeration.hasMoreElements()).toEqual(false);
    });
});

