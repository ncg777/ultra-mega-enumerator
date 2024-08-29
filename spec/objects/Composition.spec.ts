
import { Composition } from '../../src/objects/Composition';
import { BitSet } from '../../src/objects/BitSet';
import { Combination } from '../../src/objects/Combination';

describe('Composition Class Tests', () => {
    test('should create a Composition with size n', () => {
        const comp = new Composition(5);
        expect(comp.getSum()).toEqual(5);
    });

    test('should generate a Composition from a boolean array', () => {
        const boolArray = [true, false, true, true];
        const comp = Composition.compositionFromBooleanArray(boolArray);
        expect(comp.getCompositionAsArray()).toEqual([1,2,1,1]);
    });

    test('should generate a Composition from a Combination', () => {
        const comb = new Combination(5);
        comb.set(1);
        comb.set(3);
        const comp = Composition.compositionFromCombination(comb);
        expect(comp.getCompositionAsArray()).toEqual([2,3]);
    });

    test('should generate a Composition from a BitSet', () => {
        const bitSet = new BitSet(4);
        bitSet.set(0, true);
        bitSet.set(2, true);
        const comp = Composition.compositionFromBitSet(bitSet);
        expect(comp.getCompositionAsArray()).toEqual([1,2,2]);
    });

    test('should translate the Composition to an array', () => {
        const comp = new Composition(5);
        comp.set(0, true);
        comp.set(1, true);
        comp.set(2, true);
        const array = comp.getCompositionAsArray();
        expect(array).toEqual([1,1,1,2]);
    });


    test('should convert to string properly', () => {
        const comp = new Composition(5);
        comp.set(0, true);
        comp.set(1, true);
        const str = comp.toString();
        expect(str).toEqual("{1,1,3}"); // Adjust based on actual expected output
    });

    test('should return [] for compositionRefinements when no refinements exist', () => {
        const comp = new Composition(1);
        const refinements = Composition.compositionRefinements(comp);
        expect(refinements?.length).toEqual(0);
    });
    
    test('should return an array of Composition for valid refinements', () => {
        const comp = new Composition(4);
        comp.set(0, true);
        const refinements = Composition.compositionRefinements(comp);
        expect(refinements).toBeInstanceOf(Array);
        expect(refinements!.length).toBeGreaterThan(0);
    });
});
