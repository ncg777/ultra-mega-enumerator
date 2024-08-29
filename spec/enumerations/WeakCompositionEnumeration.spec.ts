import { WeakCompositionEnumeration } from '../../src/enumerations/WeakCompositionEnumeration';

describe('WeakCompositionEnumeration', () => {
    it('should return [1] for n=1 and k=1', () => {
        const enumeration = new WeakCompositionEnumeration(1,1);
        expect(enumeration.nextElement()).toEqual([1]);
        expect(enumeration.hasMoreElements()).toEqual(false);
    });

    it('should correctly enumerate weak compositions for n=4 and k=2', () => {
        const enumeration = new WeakCompositionEnumeration(4,2);

        const expectedResults = [
            [0, 4],
            [1, 3],
            [2, 2],
            [3, 1],
            [4, 0],
        ];

        for (const expected of expectedResults) {
            const result = enumeration.nextElement();
            expect(result).toEqual(expected);
        }
        expect(enumeration.hasMoreElements()).toEqual(false);
    });
    it('should correctly enumerate weak compositions for n=4 and k=3', () => {
        const enumeration = new WeakCompositionEnumeration(4,3);

        const expectedResults = [            
            [0, 0, 4],
            [0, 1, 3],
            [1, 0, 3],
            [0, 2, 2],
            [1, 1, 2],
            [2, 0, 2],
            [0, 3, 1],
            [1, 2, 1],
            [2, 1, 1],
            [3, 0, 1],
            [0, 4, 0],
            [1, 3, 0],
            [2, 2, 0],
            [3, 1, 0],
            [4, 0, 0],
        ];

        for (const expected of expectedResults) {
            const result = enumeration.nextElement();
            expect(result).toEqual(expected);
        }
        expect(enumeration.hasMoreElements()).toEqual(false);
    });

    it('should correctly enumerate weak compositions for n=4 and k=4', () => {
        const enumeration = new WeakCompositionEnumeration(4,4);

        const expectedResults = [            
            [0, 0, 0, 4],
            [0, 0, 1, 3],
            [0, 1, 0, 3],
            [1, 0, 0, 3],
            [0, 0, 2, 2],
            [0, 1, 1, 2],
            [1, 0, 1, 2],
            [0, 2, 0, 2],
            [1, 1, 0, 2],
            [2, 0, 0, 2],
            [0, 0, 3, 1],
            [0, 1, 2, 1],
            [1, 0, 2, 1],
            [0, 2, 1, 1],
            [1, 1, 1, 1],
            [2, 0, 1, 1],
            [0, 3, 0, 1],
            [1, 2, 0, 1],
            [2, 1, 0, 1],
            [3, 0, 0, 1],
            [0, 0, 4, 0],
            [0, 1, 3, 0],
            [1, 0, 3, 0],
            [0, 2, 2, 0],
            [1, 1, 2, 0],
            [2, 0, 2, 0],
            [0, 3, 1, 0],
            [1, 2, 1, 0],
            [2, 1, 1, 0],
            [3, 0, 1, 0],
            [0, 4, 0, 0],
            [1, 3, 0, 0],
            [2, 2, 0, 0],
            [3, 1, 0, 0],
            [4, 0, 0, 0],
        ];

        for (const expected of expectedResults) {
            const result = enumeration.nextElement();
            expect(result).toEqual(expected);
        }
        expect(enumeration.hasMoreElements()).toEqual(false);
    });
});

