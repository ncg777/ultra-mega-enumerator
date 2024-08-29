import { FixedSetPartitionEnumeration } from '../../src/enumerations/FixedSetPartitionEnumeration';

describe('FixedSetPartitionEnumeration', () => {
    it('should return [0] for n=1', () => {
        const enumeration = new FixedSetPartitionEnumeration(1,1);
        expect(enumeration.nextElement()).toEqual([0]);
        expect(enumeration.hasMoreElements()).toEqual(false);
    });

    it('should correctly enumerate fixed set partitions for n=4 and k=2', () => {
        const enumeration = new FixedSetPartitionEnumeration(4,2);

        const expectedResults = [
            [0, 0, 0, 1],
            [0, 0, 1, 0],
            [0, 0, 1, 1],
            [0, 1, 0, 0],
            [0, 1, 0, 1],
            [0, 1, 1, 0],
            [0, 1, 1, 1],
        ];

        for (const expected of expectedResults) {
            const result = enumeration.nextElement();
            expect(result).toEqual(expected);
        }
        expect(enumeration.hasMoreElements()).toEqual(false);
    });
    it('should correctly enumerate fixed set partitions for n=4 and k=3', () => {
        const enumeration = new FixedSetPartitionEnumeration(4,3);

        const expectedResults = [            
            [0, 0, 1, 2],
            [0, 1, 0, 2],
            [0, 1, 1, 2],
            [0, 1, 2, 0],
            [0, 1, 2, 1],
            [0, 1, 2, 2],
        ];

        for (const expected of expectedResults) {
            const result = enumeration.nextElement();
            expect(result).toEqual(expected);
        }
        expect(enumeration.hasMoreElements()).toEqual(false);
    });

    it('should correctly enumerate fixed set partitions for n=4 and k=4', () => {
        const enumeration = new FixedSetPartitionEnumeration(4,4);

        const expectedResults = [            
            [0,1,2,3],
        ];

        for (const expected of expectedResults) {
            const result = enumeration.nextElement();
            expect(result).toEqual(expected);
        }
        expect(enumeration.hasMoreElements()).toEqual(false);
    });
});

