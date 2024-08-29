import { KPermutationEnumeration } from '../../src/enumerations/KPermutationEnumeration';

describe('KPermutationEnumeration', () => {
    it('should return [0] for n=1', () => {
        const enumeration = new KPermutationEnumeration(1,1);
        expect(enumeration.nextElement()).toEqual([0]);
        expect(enumeration.hasMoreElements()).toEqual(false);
    });

    it('should correctly enumerate k-permutations for n=4 and k=2', () => {
        const enumeration = new KPermutationEnumeration(4,2);

        const expectedResults = [
            [0, 1],
            [1, 0],
            [2, 0],
            [3, 0],
            [0, 2],
            [1, 2],
            [2, 1],
            [3, 1],
            [0, 3],
            [1, 3],
            [2, 3],
            [3, 2],
        ];

        for (const expected of expectedResults) {
            const result = enumeration.nextElement();
            expect(result).toEqual(expected);
        }
        expect(enumeration.hasMoreElements()).toEqual(false);
    });
    it('should correctly enumerate k-permutations for n=4 and k=3', () => {
        const enumeration = new KPermutationEnumeration(4,3);

        const expectedResults = [            
            [0, 1, 1],
            [1, 0, 2],
            [2, 0, 1],
            [3, 0, 1],
            [0, 2, 2],
            [1, 2, 0],
            [2, 1, 0],
            [3, 1, 0],
            [0, 3, 1],
            [1, 3, 0],
            [2, 3, 0],
            [3, 2, 0],
            [0, 1, 2],
            [1, 0, 3],
            [2, 0, 3],
            [3, 0, 2],
            [0, 2, 3],
            [1, 2, 2],
            [2, 1, 3],
            [3, 1, 2],
            [0, 3, 3],
            [1, 3, 3],
            [2, 3, 1],
            [3, 2, 1],
        ];

        for (const expected of expectedResults) {
            const result = enumeration.nextElement();
            expect(result).toEqual(expected);
        }
        expect(enumeration.hasMoreElements()).toEqual(false);
    });

    it('should correctly enumerate k-permutations for n=4 and k=4', () => {
        const enumeration = new KPermutationEnumeration(4,4);

        const expectedResults = [            
            [0, 1, 1, 1],
            [1, 0, 2, 2],
            [2, 0, 1, 1],
            [3, 0, 1, 1],
            [0, 2, 2, 2],
            [1, 2, 0, 2],
            [2, 1, 0, 3],
            [3, 1, 0, 2],
            [0, 3, 1, 1],
            [1, 3, 0, 3],
            [2, 3, 0, 1],
            [3, 2, 0, 1],
            [0, 1, 2, 2],
            [1, 0, 3, 2],
            [2, 0, 3, 3],
            [3, 0, 2, 2],
            [0, 2, 3, 2],
            [1, 2, 2, 0],
            [2, 1, 3, 0],
            [3, 1, 2, 0],
            [0, 3, 3, 3],
            [1, 3, 3, 0],
            [2, 3, 1, 0],
            [3, 2, 1, 0],
        ];

        for (const expected of expectedResults) {
            const result = enumeration.nextElement();
            expect(result).toEqual(expected);
        }
        expect(enumeration.hasMoreElements()).toEqual(false);
    });
});

