import { NonCrossingPartitionEnumeration } from '../../src/enumerations/NonCrossingPartitionEnumeration';

describe('NonCrossingPartitionEnumeration', () => {
    it('should return [] for n=0', () => {
        const enumeration = new NonCrossingPartitionEnumeration(0);
        expect(enumeration.nextElement()).toEqual([]);
        expect(enumeration.hasMoreElements()).toEqual(false);
    });

    it('should return [0] for n=1', () => {
        const enumeration = new NonCrossingPartitionEnumeration(1);
        expect(enumeration.nextElement()).toEqual([0]);
        expect(enumeration.hasMoreElements()).toEqual(false);
    });

    it('should correctly enumerate non-crossing partitions for n=4', () => {
        const enumeration = new NonCrossingPartitionEnumeration(4);

        const expectedResults = [
            [0, 1, 2, 3],
            [0, 0, 1, 2],
            [1, 0, 1, 2],
            [0, 0, 0, 1],
            [1, 0, 0, 1],
            [1, 1, 0, 1],
            [0, 0, 0, 0],
            [2, 0, 1, 2],
            [1, 0, 1, 1],
            [0, 0, 1, 1],
            [0, 1, 1, 2],
            [0, 2, 1, 2],
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

