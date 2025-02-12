import { PartitionEnumeration } from '../../src/enumerations/PartitionEnumeration';

describe('PartitionEnumeration', () => {
    test.each([
        [1, [[1]]],
        [2, [[2], [1, 1]]],
        [3, [[3], [2, 1], [1, 1, 1]]],
        [4, [[4], [3, 1], [2, 2], [2, 1, 1], [1, 1, 1, 1]]],
        [5, [[5], [4, 1], [3, 2], [3, 1, 1], [2, 2, 1], [2, 1, 1, 1], [1, 1, 1, 1, 1]]],
    ])('correctly computes partitions for n = %i', (n, expected) => {
        const enumeration = PartitionEnumeration.of(n);
        const partitions = Array.from(enumeration);
        expect(partitions).toEqual(expected);
    });
});