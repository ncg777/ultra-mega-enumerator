// src/objects/Sequence.spec.ts
import { Combiner, Operation, Sequence } from '../../src/objects/Sequence';

describe('Sequence Class', () => {
    let seq: Sequence;

    beforeEach(() => {
        seq = new Sequence(1, 2, 3, 4, 5);
    });

    test('toString() should return a string representation of the sequence', () => {
        expect(seq.toString()).toBe('1 2 3 4 5');
    });

    test('add() should add an item to the sequence', () => {
        seq.add(6);
        expect(seq.toString()).toBe('1 2 3 4 5 6');
    });

    test('size() should return the correct size of the sequence', () => {
        expect(seq.size()).toBe(5);
        seq.add(6);
        expect(seq.size()).toBe(6);
    });

    test('get() should return the correct item at the given index', () => {
        expect(seq.get(0)).toBe(1);
        expect(seq.get(4)).toBe(5);
        expect(seq.get(5)).toBeUndefined();
    });

    test('set() should update the item at the given index', () => {
        seq.set(0, 10);
        expect(seq.get(0)).toBe(10);
    });

    test('toArray() should return the items as an array', () => {
        expect(seq.toArray()).toEqual([1, 2, 3, 4, 5]);
    });

    test('signs() should return a sequence of signs', () => {
        const negativeSeq = new Sequence(-5, -1, 0, 1, 5);
        expect(negativeSeq.signs().toArray()).toEqual([-1, -1, 0, 1, 1]);
    });

    test('isNatural() should return true for sequences with non-negative integers', () => {
        expect(seq.isNatural()).toBe(true);
    });

    test('difference() should return the correct sequence of differences', () => {
        expect(seq.difference().toArray()).toEqual([1, 1, 1, 1]);
    });

    test('cyclicalDifference() should return the correct cyclical difference', () => {
        expect(seq.cyclicalDifference().toArray()).toEqual([1, 1, 1, 1, -4]);
    });

    test('antidifference() should return the correct antidifference sequence', () => {
        expect(seq.antidifference(0).toArray()).toEqual([0, 1, 3, 6, 10, 15]);
    });

    test('cyclicalAntidifference() should return the correct cyclical antidifference sequence', () => {
        expect(seq.cyclicalAntidifference(0).toArray()).toEqual([5, 6, 8, 11, 15]);
    });

    test('getMean() should return the correct mean of the sequence', () => {
        expect(seq.getMean()).toBe(3);
    });

    test('sum() should return the correct sum of the sequence', () => {
        expect(seq.sum()).toBe(15);
    });

    test('getMin() should return the minimum value in the sequence', () => {
        expect(seq.getMin()).toBe(1);
    });

    test('getMax() should return the maximum value in the sequence', () => {
        expect(seq.getMax()).toBe(5);
    });

    test('rotate() should return the rotated sequence', () => {
        expect(seq.rotate(2).toArray()).toEqual([4, 5, 1, 2, 3]);
    });

    test('frequencyMap() should return the correct frequency map of the sequence', () => {
        const freqSeq = new Sequence(1, 2, 2, 3, 3, 3);
        const freqMap = freqSeq.frequencyMap();
        expect(freqMap.get(1)).toBe(1);
        expect(freqMap.get(2)).toBe(2);
        expect(freqMap.get(3)).toBe(3);
    });

    test('static parse() should correctly parse a sequence from a string', () => {
        const parsedSeq = Sequence.parse('[1, 2, 3]');
        expect(parsedSeq.toArray()).toEqual([1, 2, 3]);
    });
    test('combine() with Combiner.Product should return the correct product result', () => {
        const x = new Sequence(1, 2);
        const y = new Sequence(3, 4);
        
        const result = Sequence.combine(Combiner.Product, Operation.Add, x, y);
        expect(result.toArray()).toEqual([4, 5, 5, 6]); // Expected result based on addition of elements
    });

    test('combine() with Combiner.Triangular should return the correct triangular result', () => {
        const x = new Sequence(1, 2, 3);
        const y = new Sequence(4, 5);
        
        const result = Sequence.combine(Combiner.Triangular, Operation.Add, x, y);
        expect(result.toArray()).toEqual([5, 6, 7, 7, 8]);
    });

    test('combine() with Combiner.Apply should return the correct result based on applying operation', () => {
        const x = new Sequence(1, 2);
        const y = new Sequence(0, -1);
        
        const result = Sequence.combine(Combiner.Apply, Operation.X, x, y);
        expect(result.toArray()).toEqual([1, 2]);
    });

    test('combine() with Combiner.Divisive should return the correct result for divisive combining', () => {
        const x = new Sequence(1, 2);
        const y = new Sequence(2, 3);
        
        const result = Sequence.combine(Combiner.Divisive, Operation.Add, x, y);
        expect(result.toArray()).toEqual([3, 5]); // Expected: 1+2, 2+3
    });

    test('combine() with Combiner.Recycle should return the correct result based on recycling', () => {
        const x = new Sequence(1, 2);
        const y = new Sequence(3, 4);
        
        const result = Sequence.combine(Combiner.Recycle, Operation.Add, x, y);
        expect(result.toArray()).toEqual([4, 6]); // Expected result based on recycling with addition
    });

    test('combine() with Combiner.IterateBetween should return the correct result based on iteration', () => {
        const x = new Sequence(0, 4);
        const y = new Sequence(4, -4);
        
        const result = Sequence.combine(Combiner.Recycle, Operation.IterateBetween, x, y);
        expect(result.toArray()).toEqual([0,1,2,3,4,3,2,1,0,-1,-2,-3]);
    });
    test('combine() with Combiner.Convolution should return the correct convolution result', () => {
        const x = new Sequence(1, 2, 3);
        const y = new Sequence(4, 5);
        
        const result = Sequence.combine(Combiner.Convolution, Operation.Add, x, y);
        expect(result.toArray()).toEqual([13, 12, 14]); // Expected result based on convolution
    });
    test('combine() with Combiner.MixedRadix should return the correct result based on mixed radix', () => {
        const x = new Sequence(2, 3);
        const y = new Sequence(1, 2);
        
        const result = Sequence.combine(Combiner.MixedRadix, Operation.Multiply, x, y);
        expect(result.toArray()).toEqual([0, 1, 2, 3, 4, 5]);
    });
    test('combine() with Combiner.Bits', () => {
        const x = new Sequence(15, 15, 3);
        const y = new Sequence(4, 5, 3);
        
        const result = Sequence.combine(Combiner.Recycle, Operation.Bits, x, y);
        expect(result.toArray()).toEqual([1,1,1,1,0,1,1,1,1,0,1,1]);
    });
    test('combine() with Operation.Trits', () => {
        const x = new Sequence(5, 5, 5);
        const y = new Sequence(3, 3, -3);
        
        const result = Sequence.combine(Combiner.Recycle, Operation.Trits, x, y);
        expect(result.toArray()).toEqual([1,-1,-1,1,-1,-1,-1,-1,1]);
    });
    test('combine() with bitwise AND', () => {
        const x = new Sequence(6, -5, 0, 7);
        const y = new Sequence(3, 2, -1, 7);
        // 6 & 3 = 2, -5 & 2 = -0b101 & 0b10 = -0b0 = 0, 0 & -1 = 0, 7 & 7 = 7
        const result = Sequence.combine(Combiner.Recycle, Operation.And, x, y);
        expect(result.toArray()).toEqual([2, 0, 0, 7]);
    });

    test('combine() with bitwise OR', () => {
        const x = new Sequence(6, -5, 0, 7);
        const y = new Sequence(3, 2, -1, 7);
        // 6 | 3 = 7, -5 | 2 = -0b101 | 0b10 = -0b111, 0 | -1 = -1, 7 | 7 = 7
        const result = Sequence.combine(Combiner.Recycle, Operation.Or, x, y);
        expect(result.toArray()).toEqual([7, -7, -1, 7]);
    });

    test('combine() with bitwise XOR', () => {
        const x = new Sequence(6, -5, 0, 7);
        const y = new Sequence(3, 2, -1, 7);
        // 6 ^ 3 = 5, -5 ^ 2 = -0b101 ^ 0b10 = -0b101 ^ 0b010 = -0b111 = -7, 0 ^ -1 = -1, 7 ^ 7 = 0
        const result = Sequence.combine(Combiner.Recycle, Operation.Xor, x, y);
        expect(result.toArray()).toEqual([5, -7, -1, 0]);
    });

    test('combine() with bitwise NAND', () => {
        const x = new Sequence(6, -5, 0, 7);
        const y = new Sequence(3, 2, -1, 7);
        // 6 NAND 3 = ~(6 & 3) = ~2 = 5, -5 NAND 2 = ~0 = -7, 0 NAND -1 = ~0 = -1, 7 NAND 7 = ~7 = 0
        const result = Sequence.combine(Combiner.Recycle, Operation.Nand, x, y);
        expect(result.toArray()).toEqual([5, -7, -1, 0]);
    });

    test('combine() with bitwise NOR', () => {
        const x = new Sequence(6, -5, 0, 7);
        const y = new Sequence(3, 2, -1, 7);
        // 6 NOR 3 = ~(6 | 3) = ~7 = 0, -5 NOR 2 = ~(-7) = 0, 0 NOR -1 = ~(-1) = 0, 7 NOR 7 = ~7 = 0
        const result = Sequence.combine(Combiner.Recycle, Operation.Nor, x, y);
        expect(result.toArray()).toEqual([0, 0, 0, 0]);
    });

    test('combine() with bitwise XNOR', () => {
        const x = new Sequence(6, -5, 0, 7);
        const y = new Sequence(3, 2, -1, 7);
        // 6 XNOR 3 = ~(6 ^ 3) = ~5 = 2, -5 XNOR 2 = ~(-7) = 6, 0 XNOR -1 = ~(-1) = 0, 7 XNOR 7 = ~0 = 7
        const result = Sequence.combine(Combiner.Recycle, Operation.Xnor, x, y);
        expect(result.toArray()).toEqual([2, 0, 0, 7]);
    });

    test('combine() with bitwise implication', () => {
        const x = new Sequence(6, 0, 1);
        const y = new Sequence(3, 1, 0);
        // implication: (!a) | b
        const result = Sequence.combine(Combiner.Recycle, Operation.Implication, x, y);
        expect(result.toArray()).toEqual([3, 1, 0]);
    });

    test('combine() with bitwise reverse implication', () => {
        const x = new Sequence(6, 0, 1);
        const y = new Sequence(3, 1, 0);
        // reverse implication: (!b) | a
        const result = Sequence.combine(Combiner.Recycle, Operation.ReverseImplication, x, y);
        expect(result.toArray()).toEqual([6, 0, 1]);
    });

    test('combine() with ShiftBits (left shift)', () => {
        const x = new Sequence(3, 5, 7);
        const y = new Sequence(1, 2, 3);
        // 3 << 1 = 6, 5 << 2 = 20, 7 << 3 = 56
        const result = Sequence.combine(Combiner.Recycle, Operation.ShiftBits, x, y);
        expect(result.toArray()).toEqual([6, 20, 56]);
    });

    test('combine() with ShiftBits (right shift)', () => {
        const x = new Sequence(8, 16, 32);
        const y = new Sequence(-1, -2, -3);
        // 8 >> 1 = 4, 16 >> 2 = 4, 32 >> 3 = 4
        const result = Sequence.combine(Combiner.Recycle, Operation.ShiftBits, x, y);
        expect(result.toArray()).toEqual([4, 4, 4]);
    });

    test('combine() with ShiftBits (zero and negative)', () => {
        const x = new Sequence(0, -8, 15);
        const y = new Sequence(2, -1, 0);
        // 0 << 2 = 0, -8 >> 1 = -4, 15 << 0 = 15
        const result = Sequence.combine(Combiner.Recycle, Operation.ShiftBits, x, y);
        expect(result.toArray()).toEqual([0, -4, 15]);
    });
    test('combine() with ProjectBits', () => {
        const x = new Sequence(0,1,2,3);
        const y = new Sequence(5,-5,0);
        const result = Sequence.combine(Combiner.Product, Operation.ProjectBits, x, y);
        expect(result.toArray()).toEqual([0,0,0,1,-1,0,4,-4,0,5,-5,0]);
    });
});