import { BitSet } from '../../src/utils/BitSet';


describe('BitSet', () => {
    it('should create a BitSet and set bits correctly', () => {
        const bitset = new BitSet(200);
        bitset.set(0);
        bitset.set(5);
        bitset.set(129);
        expect(bitset.get(0)).toBe(true);
        expect(bitset.get(5)).toBe(true);
        expect(bitset.get(5)).toBe(true);
        bitset.set(129, false);
        expect(bitset.get(129)).toBe(false);
        expect(bitset.get(1)).toBe(false);
    });
});
