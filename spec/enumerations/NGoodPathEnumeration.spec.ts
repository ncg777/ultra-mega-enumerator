import { NGoodPathEnumeration } from '../../src/enumerations/NGoodPathEnumeration';

describe('NGoodPathEnumeration', () => {
    it('should return [] for n=0', () => {
        const enumeration = new NGoodPathEnumeration(0);
        expect(enumeration.nextElement()).toEqual([]);
        expect(enumeration.hasMoreElements()).toEqual(false);
    });

    it('should return [0] for n=1', () => {
        const enumeration = new NGoodPathEnumeration(1);
        expect(enumeration.nextElement()).toEqual([0]);
        expect(enumeration.hasMoreElements()).toEqual(false);
    });

    it('should correctly enumerate n-good paths for n=4', () => {
        const enumeration = new NGoodPathEnumeration(4);

        const expectedResults = [
            [0, 1, 2, 3],
            [0, 0, 2, 3],
            [0, 0, 1, 3],
            [0, 0, 0, 3],
            [0, 0, 0, 2],
            [0, 0, 0, 1],
            [0, 0, 0, 0],
            [0, 0, 1, 2],
            [0, 0, 1, 1],
            [0, 0, 2, 2],
            [0, 1, 1, 3],
            [0, 1, 1, 2],
            [0, 1, 1, 1],
            [0, 1, 2, 2],
        ];

        for (const expected of expectedResults) {
            const result = enumeration.nextElement();
            expect(result).toEqual(expected);
        }
        expect(enumeration.hasMoreElements()).toEqual(false);
    });
});

