import { BitSet } from '../../src/objects/BitSet';
import { BitSetEnumeration } from '../../src/enumerations/BitSetEnumeration';

describe('BitSetEnumeration', () => {
    it('should correctly enumerate all BitSet combinations of size 3', () => {
        const n = 3;
        const enumeration = new BitSetEnumeration(n);
        const bitSets: BitSet[] = [];
        for(const e of enumeration) {
            bitSets.push(e);
        }

        // Expected BitSet combinations for a size of 3
        const expectedResults = [
            BitSet.bitSetFromNumberArray([0, 0, 0]),
            BitSet.bitSetFromNumberArray([1, 0, 0]),
            BitSet.bitSetFromNumberArray([0, 1, 0]),
            BitSet.bitSetFromNumberArray([1, 1, 0]),
            BitSet.bitSetFromNumberArray([0, 0, 1]),
            BitSet.bitSetFromNumberArray([1, 0, 1]),
            BitSet.bitSetFromNumberArray([0, 1, 1]),
            BitSet.bitSetFromNumberArray([1, 1, 1]),
        ];

        // Validate using Lodash to compare arrays of true bits
        const actualTrueBits = bitSets.map(bs => [...bs.getTrueBits()].sort());
        const expectedTrueBits = expectedResults.map(bs => [...bs.getTrueBits()].sort());

        expect(actualTrueBits.length).toBe(expectedTrueBits.length);
        expect(actualTrueBits).toEqual(expectedTrueBits);
    });

    it('should throw error when trying to enumerate with negative size', () => {
        expect(() => new BitSetEnumeration(-1)).toThrow(Error);
    });

    it('should not have more elements at the end of enumeration', () => {
        const n = 2;
        const enumeration = new BitSetEnumeration(n);
        
        enumeration.nextElement();
        enumeration.nextElement();
        enumeration.nextElement();
        enumeration.nextElement();

        expect(enumeration.hasMoreElements()).toEqual(false);
    });

    it('should correctly return the last element when enumerating', () => {
        const n = 2;
        const enumeration = new BitSetEnumeration(n);

        let lastElement: BitSet | undefined;
        while (enumeration.hasMoreElements()) {
            lastElement = enumeration.nextElement();
        }

        expect([...lastElement?.getTrueBits()!].sort()).toEqual([0, 1]);
    });

    it('should reset after reaching the end of enumerating', () => {
        const n = 2;
        const enumeration = new BitSetEnumeration(n);
        
        // Get all elements to exhaust enumeration
        while (enumeration.hasMoreElements()) {
            enumeration.nextElement();
        }

        // Check that it doesn't have more elements
        expect(enumeration.hasMoreElements()).toEqual(false);

        // Create a new enumeration instance to reset
        const newEnumeration = new BitSetEnumeration(n);
        expect(newEnumeration.hasMoreElements()).toEqual(true); // Should have elements again
    });
});
