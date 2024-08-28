import { BitSet } from '../../src/utils/BitSet';


describe('BitSet', () => {
    it('should create a BitSet and set bits correctly', () => {
        const bitset = new BitSet(6);
        bitset.set(0);
        bitset.set(5);
        expect(bitset.get(0)).toBe(true);
        expect(bitset.get(5)).toBe(true);
        expect(bitset.get(1)).toBe(false);
    });
});
