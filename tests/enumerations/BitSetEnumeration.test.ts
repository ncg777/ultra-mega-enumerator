import { expect } from 'chai';
import { BitSet } from './../../src/objects/BitSet';
import { BitSetEnumeration } from './../../src/enumerations/BitSetEnumeration';
import _ from 'lodash';

describe('BitSetEnumeration', () => {
    it('should correctly enumerate all BitSet combinations of size 3', () => {
        const n = 3;
        const enumeration = new BitSetEnumeration(n);
        const bitSets: BitSet[] = [];

        // Collect all enumerated BitSets
        while (enumeration.hasMoreElements()) {
            bitSets.push(enumeration.nextElement());
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

        expect(actualTrueBits).to.have.length(expectedTrueBits.length);
        expect(_.isEqual(actualTrueBits, expectedTrueBits)).to.be.true;
    });

    it('should throw error when trying to enumerate with negative size', () => {
        expect(() => new BitSetEnumeration(-1)).to.throw(Error);
    });

    it('should not have more elements at the end of enumeration', () => {
        const n = 2;
        const enumeration = new BitSetEnumeration(n);
        
        enumeration.nextElement();
        enumeration.nextElement();
        enumeration.nextElement();
        enumeration.nextElement();

        expect(enumeration.hasMoreElements()).to.be.false; // Should have no more elements
    });

    it('should correctly return the last element when enumerating', () => {
        const n = 2;
        const enumeration = new BitSetEnumeration(n);

        let lastElement: BitSet | undefined;
        while (enumeration.hasMoreElements()) {
            lastElement = enumeration.nextElement();
        }

        expect([...lastElement?.getTrueBits()!].sort()).to.deep.equal([0, 1]);
    });

    it('should reset after reaching the end of enumerating', () => {
        const n = 2;
        const enumeration = new BitSetEnumeration(n);
        
        // Get all elements to exhaust enumeration
        while (enumeration.hasMoreElements()) {
            enumeration.nextElement();
        }

        // Check that it doesn't have more elements
        expect(enumeration.hasMoreElements()).to.be.false;

        // Create a new enumeration instance to reset
        const newEnumeration = new BitSetEnumeration(n);
        expect(newEnumeration.hasMoreElements()).to.be.true; // Should have elements again
    });
});
