import { BitSet } from '../../src/utils/BitSet';

describe('BitSet', () => {
    it('should create a BitSet and set bits correctly', () => {
        const bitset = new BitSet(200);
        bitset.set(0);
        bitset.set(5);
        bitset.set(129);
        
        expect(bitset.get(0)).toBe(true);
        expect(bitset.get(5)).toBe(true);
        expect(bitset.get(129)).toBe(true);
        
        bitset.set(129, false);
        expect(bitset.get(129)).toBe(false);
        expect(bitset.get(1)).toBe(false);
    });

    it('should flip bits correctly', () => {
        const bitset = new BitSet(10);
        bitset.set(1);
        expect(bitset.get(1)).toBe(true);
        
        bitset.flip(1);
        expect(bitset.get(1)).toBe(false);
        
        bitset.flip(1);
        expect(bitset.get(1)).toBe(true);
    });

    it('should return the correct cardinality', () => {
        const bitset = new BitSet(10);
        bitset.set(0);
        bitset.set(1);
        bitset.set(3);
        
        expect(bitset.cardinality()).toBe(3);
        
        bitset.clear(1);
        
        expect(bitset.cardinality()).toBe(2);
    });

    it('should check if the BitSet is empty', () => {
        const bitset = new BitSet(5);
        expect(bitset.isEmpty()).toBe(true);
        
        bitset.set(0);
        expect(bitset.isEmpty()).toBe(false);
        
        bitset.clear(0);
        expect(bitset.isEmpty()).toBe(true);
    });

    it('should perform AND operation correctly', () => {
        const bitset1 = new BitSet(5);
        const bitset2 = new BitSet(5);
        
        bitset1.set(0);
        bitset1.set(2);
        bitset2.set(2);
        bitset2.set(3);
        
        bitset1.and(bitset2);
        
        expect(bitset1.get(0)).toBe(false);
        expect(bitset1.get(2)).toBe(true);
        expect(bitset1.get(3)).toBe(false);
    });

    it('should perform OR operation correctly', () => {
        const bitset1 = new BitSet(5);
        const bitset2 = new BitSet(5);
        
        bitset1.set(0);
        bitset1.set(2);
        bitset2.set(2);
        bitset2.set(3);
        
        bitset1.or(bitset2);
        
        expect(bitset1.get(0)).toBe(true);
        expect(bitset1.get(1)).toBe(false);
        expect(bitset1.get(2)).toBe(true);
        expect(bitset1.get(3)).toBe(true);
    });

    it('should perform XOR operation correctly', () => {
        const bitset1 = new BitSet(5);
        const bitset2 = new BitSet(5);
        
        bitset1.set(0);
        bitset1.set(2);
        bitset2.set(2);
        bitset2.set(3);
        
        bitset1.xor(bitset2);
        
        expect(bitset1.get(0)).toBe(true);
        expect(bitset1.get(2)).toBe(false);
        expect(bitset1.get(3)).toBe(true);
    });

    it('should intersect correctly', () => {
        const bitset1 = new BitSet(5);
        const bitset2 = new BitSet(5);
        
        bitset1.set(1);
        bitset1.set(2);
        bitset2.set(2);
        bitset2.set(3);

        expect(bitset1.intersects(bitset2)).toBe(true);
        
        bitset2.clear(2);
        
        expect(bitset1.intersects(bitset2)).toBe(false);
    });

    it('should convert to binary string correctly', () => {
        const bitset = new BitSet(8);
        bitset.set(0);
        bitset.set(3);
        bitset.set(5);

        expect(bitset.toString()).toBe('00101001');
    });

    it('should create BitSet from binary array', () => {
        const bitArray = [1, 0, 1, 1, 0, 0, 1, 0];
        const bitset = BitSet.bitSetFromNumberArray(bitArray);
        
        expect(bitset.get(0)).toBe(true);
        expect(bitset.get(1)).toBe(false);
        expect(bitset.get(2)).toBe(true);
        expect(bitset.get(3)).toBe(true);
        expect(bitset.get(4)).toBe(false);
        expect(bitset.get(5)).toBe(false);
        expect(bitset.get(6)).toBe(true);
        expect(bitset.get(7)).toBe(false);
    });

    it('should create BitSet from binary string', () => {
        const bitString = '11001010';
        const bitset = BitSet.fromBitString(bitString);
        
        expect(bitset.get(0)).toBe(true);
        expect(bitset.get(1)).toBe(true);
        expect(bitset.get(2)).toBe(false);
        expect(bitset.get(3)).toBe(false);
        expect(bitset.get(4)).toBe(true);
        expect(bitset.get(5)).toBe(false);
        expect(bitset.get(6)).toBe(true);
        expect(bitset.get(7)).toBe(false);
    });

    it('should resize BitSet correctly', () => {
        const bitset = new BitSet(5);
        
        bitset.set(0);
        bitset.set(2);
        
        expect(bitset.cardinality()).toBe(2);
        
        bitset.resize(10);
        
        expect(bitset.size()).toBe(10);
        expect(bitset.cardinality()).toBe(2);
        expect(bitset.get(0)).toBe(true);
        expect(bitset.get(1)).toBe(false);
        expect(bitset.get(5)).toBe(false);
        
        bitset.resize(2);
        expect(bitset.size()).toBe(2);
        expect(bitset.cardinality()).toBe(1); // only bit 0 should be set
    });

    it('should throw error on invalid resize', () => {
        const bitset = new BitSet(5);
        expect(() => bitset.resize(0)).toThrow("Invalid BitSet size");
    });

    it('should correctly copy itself', () => {
        const bitset = new BitSet(5);
        bitset.set(1);
        bitset.set(3);
        
        const copy = bitset.copy();

        expect(copy.equals(bitset)).toBe(true); // Should be equal to the original
        copy.set(1, false);
        expect(copy.get(1)).toBe(false); // Should not affect the original
        expect(bitset.get(1)).toBe(true);
    });

    it('should return correct nextSetBit and previousSetBit', () => {
        const bitset = new BitSet(10);
        bitset.set(2);
        bitset.set(5);
        bitset.set(8);
        
        expect(bitset.nextSetBit(0)).toBe(2);
        expect(bitset.nextSetBit(2)).toBe(2);
        expect(bitset.nextSetBit(3)).toBe(5);
        expect(bitset.nextSetBit(6)).toBe(8);
        expect(bitset.nextSetBit(9)).toBe(-1); // No more set bits
        
        expect(bitset.previousSetBit(9)).toBe(8);
        expect(bitset.previousSetBit(8)).toBe(8);
        expect(bitset.previousSetBit(4)).toBe(2);
        expect(bitset.previousSetBit(1)).toBe(-1); // No more set bits before index 2
    });

    it('should correctly create intersections', () => {
        const bitset1 = new BitSet(5);
        const bitset2 = new BitSet(5);
        
        bitset1.set(1);
        bitset1.set(2);
        bitset2.set(2);
        bitset2.set(3);
        
        const intersection = bitset1.intersection(bitset2);
        
        expect(intersection.get(1)).toBe(false);
        expect(intersection.get(2)).toBe(true);
        expect(intersection.get(3)).toBe(false);
    });

    it('should perform UNION operation correctly', () => {
        const bitset1 = new BitSet(5);
        const bitset2 = new BitSet(5);
        
        bitset1.set(0);
        bitset1.set(1);
        bitset2.set(2);
        bitset2.set(3);
        
        const union = bitset1.union(bitset2);
        
        expect(union.get(0)).toBe(true);
        expect(union.get(1)).toBe(true);
        expect(union.get(2)).toBe(true);
        expect(union.get(3)).toBe(true);
        expect(union.get(4)).toBe(false);
    });

    it('should perform MINUS operation correctly', () => {
        const bitset1 = new BitSet(5);
        const bitset2 = new BitSet(5);
        
        bitset1.set(0);
        bitset1.set(2);
        bitset2.set(2);
        
        const difference = bitset1.minus(bitset2);
        
        expect(difference.get(0)).toBe(true); // 0 should remain
        expect(difference.get(2)).toBe(false); // 2 should be removed
    });

    it('should handle MINUS with empty BitSet', () => {
        const bitset1 = new BitSet(5);
        const bitset2 = new BitSet(5);
        
        bitset1.set(0);
        bitset1.set(2);
        
        const difference = bitset1.minus(bitset2);
        
        expect(difference.get(0)).toBe(true);
        expect(difference.get(2)).toBe(true); // Should remain, as bitset2 is empty
    });

    it('should rotate bits correctly', () => {
        let bitset = new BitSet(8);
        bitset.set(1);
        bitset.set(2);
        bitset.set(3);
        bitset.set(5);
        
        bitset = bitset.rotate(2); // Rotate right by 2
            
        expect(bitset.get(0)).toBe(false);
        expect(bitset.get(1)).toBe(false);
        expect(bitset.get(2)).toBe(false);
        expect(bitset.get(3)).toBe(true);
        expect(bitset.get(4)).toBe(true);
        expect(bitset.get(5)).toBe(true);
        expect(bitset.get(6)).toBe(false);
        expect(bitset.get(7)).toBe(true);
    });

    it('should rotate bits correctly with negative values', () => {
        let bitset = new BitSet(8);
        bitset.set(0);
        bitset.set(1);
        
        bitset = bitset.rotate(-1); // Rotate left by 1
        
        expect(bitset.get(0)).toBe(true);
        expect(bitset.get(1)).toBe(false);
        expect(bitset.get(2)).toBe(false);
        expect(bitset.get(3)).toBe(false);
        expect(bitset.get(4)).toBe(false);
        expect(bitset.get(5)).toBe(false);
        expect(bitset.get(6)).toBe(false);
        expect(bitset.get(7)).toBe(true);
    });
});

