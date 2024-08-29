import { KCompositionEnumeration } from '../../src/enumerations/KCompositionEnumeration';

describe('KCompositionEnumeration', () => {
    it('should return [1] for n=1', () => {
        const enumeration = new KCompositionEnumeration(1,1);
        expect(enumeration.nextElement().getCompositionAsArray()).toEqual([1]);
        expect(enumeration.hasMoreElements()).toEqual(false);
    });

    it('should correctly enumerate compositions for n=4 and k=2', () => {
        const enumeration = new KCompositionEnumeration(4,2);

        const expectedResults = [
            [1,3],
            [2,2],
            [3,1],
        ];

        for (const expected of expectedResults) {
            const result = enumeration.nextElement().getCompositionAsArray();
            expect(result).toEqual(expected);
        }
        expect(enumeration.hasMoreElements()).toEqual(false);
    });
    it('should correctly enumerate compositions for n=4 and k=3', () => {
        const enumeration = new KCompositionEnumeration(4,3);

        const expectedResults = [            
            [1,1,2],
            [1,2,1],
            [2,1,1],
        ];

        for (const expected of expectedResults) {
            const result = enumeration.nextElement().getCompositionAsArray();
            expect(result).toEqual(expected);
        }
        expect(enumeration.hasMoreElements()).toEqual(false);
    });

    it('should correctly enumerate compositions for n=4 and k=4', () => {
        const enumeration = new KCompositionEnumeration(4,4);

        const expectedResults = [            
            [1,1,1,1],
        ];

        for (const expected of expectedResults) {
            const result = enumeration.nextElement().getCompositionAsArray();
            expect(result).toEqual(expected);
        }
        expect(enumeration.hasMoreElements()).toEqual(false);
    });
});

