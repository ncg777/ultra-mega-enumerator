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

    test('combine() with Combiner.NegativeProduct should return the correct negative product result', () => {
        const x = new Sequence(1, 2);
        const y = new Sequence(3, 4);
        
        const result = Sequence.combine(Combiner.NegativeProduct, Operation.Add, x, y);
        expect(result.toArray()).toEqual([5, 5, 6, 4]); // Expected result according to the negative product logic
    });

    test('combine() with Combiner.Triangular should return the correct triangular result', () => {
        const x = new Sequence(1, 2, 3);
        const y = new Sequence(4, 5);
        
        const result = Sequence.combine(Combiner.Triangular, Operation.Add, x, y);
        expect(result.toArray()).toEqual([5, 6, 7, 7, 8]);
    });

    test('combine() with Combiner.Apply should return the correct result based on applying operation', () => {
        const x = new Sequence(1, 2);
        const y = new Sequence(0, 1);
        
        const result = Sequence.combine(Combiner.Apply, Operation.Add, x, y);
        expect(result.toArray()).toEqual([1, 3]); // Expected: 1+0, 2+1
    });

    test('combine() with Combiner.LCM should return the correct result for LCM combining', () => {
        const x = new Sequence(1, 2);
        const y = new Sequence(2, 3);
        
        const result = Sequence.combine(Combiner.LCM, Operation.Add, x, y);
        expect(result.toArray()).toEqual([3, 5]); // Expected: 1+2, 2+3
    });

    test('combine() with Combiner.Recycle should return the correct result based on recycling', () => {
        const x = new Sequence(1, 2);
        const y = new Sequence(3, 4);
        
        const result = Sequence.combine(Combiner.Recycle, Operation.Add, x, y);
        expect(result.toArray()).toEqual([4, 6]); // Expected result based on recycling with addition
    });

    test('combine() with Combiner.MixedRadix should return the correct result based on mixed radix', () => {
        const x = new Sequence(2, 3);
        const y = new Sequence(1, 2);
        
        const result = Sequence.combine(Combiner.MixedRadix, Operation.Multiply, x, y);
        expect(result.toArray()).toEqual([0, 1, 2, 3, 4, 5]);
    });
    test('combine() with Combiner.Convolution should return the correct convolution result', () => {
        const x = new Sequence(1, 2, 3);
        const y = new Sequence(4, 5);
        
        const result = Sequence.combine(Combiner.Convolution, Operation.Add, x, y);
        expect(result.toArray()).toEqual([13, 12, 14]); // Expected result based on convolution
    });
    test('combine() with Combiner.Bits 1', () => {
        const x = new Sequence(15, 15, 3);
        const y = new Sequence(4, 5, 3);
        
        const result = Sequence.combine(Combiner.Bits, Operation.X, x, y);
        expect(result.toArray()).toEqual([1,1,1,1,0,1,1,1,1,0,1,1]);
    });
    test('combine() with Combiner.Bits 2', () => {
        const x = new Sequence(15, 15, 3);
        const y = new Sequence(4, 5, -3);
        
        const result = Sequence.combine(Combiner.Bits, Operation.Y, x, y);
        expect(result.toArray()).toEqual([8,4,2,1,16,8,4,2,1,1,2,4]);
    });
    test('combine() with Combiner.Bits 3', () => {
        const x = new Sequence(15, 15, 3);
        const y = new Sequence(4);
        
        const result = Sequence.combine(Combiner.Bits, Operation.Y, x, y);
        expect(result.toArray()).toEqual([8,4,2,1,8,4,2,1,8,4,2,1]);
    });
    test('combine() with Combiner.Trits 1', () => {
        const x = new Sequence(5, 5, 5);
        const y = new Sequence(3, 3, -3);
        
        const result = Sequence.combine(Combiner.Trits, Operation.X, x, y);
        expect(result.toArray()).toEqual([1,-1,-1,1,-1,-1,-1,-1,1]);
    });
    test('combine() with Combiner.Trits 2', () => {
        const x = new Sequence(5, 5, 1);
        const y = new Sequence(3, 3, -3);
        
        const result = Sequence.combine(Combiner.Trits, Operation.Y, x, y);
        expect(result.toArray()).toEqual([9,3,1,9,3,1,1,3,9]);
    });
    test('combine() with Combiner.Trits 3', () => {
        const x = new Sequence(5, 5, 1);
        const y = new Sequence(3);
        
        const result = Sequence.combine(Combiner.Trits, Operation.Y, x, y);
        expect(result.toArray()).toEqual([9,3,1,9,3,1,9,3,1]);
    });
});