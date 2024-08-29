import { expect } from 'chai';
import { Combination } from './../../src/objects/Combination';
import { Numbers } from './../../src/utils/Numbers';

describe('Combination', () => {
    describe('Constructor and Size', () => {
        it('should initialize with the correct size', () => {
            const c = new Combination(5);
            expect(c.size()).to.equal(5);
        });
    });

    describe('Generate Random Combination', () => {
        it('should generate a random combination with the correct length', () => {
            const combination = Combination.generateRandom(10, 3);
            expect(combination.cardinality()).to.equal(3);
            // We could also add checks for the size if needed.
        });
    });

    describe('Cardinality', () => {
        it('should return the correct number of selected bits', () => {
            const combination = new Combination(5);
            combination.set(0, true);
            combination.set(3, true);
            expect(combination.cardinality()).to.equal(2);
        });
    });

    describe('As Sequence', () => {
        it('should return the correct indices of set bits', () => {
            const combination = new Combination(5);
            combination.set(1, true);
            combination.set(3, true);
            expect(combination.getCombinationAsArray()).to.deep.equal([1, 3]);
        });
    });

    describe('equals Method', () => {
        it('should return true for equal combinations', () => {
            const combo1 = new Combination(5);
            combo1.set(2, true);
            const combo2 = new Combination(5);
            combo2.set(2, true);
            expect(combo1.equals(combo2)).to.be.true;
        });

        it('should return false for different combinations', () => {
            const combo1 = new Combination(5);
            combo1.set(2, true);
            const combo2 = new Combination(5);
            combo2.set(3, true);
            expect(combo1.equals(combo2)).to.be.false;
        });
    });

    describe('toString Method', () => {
        it('should return a string representation of the combination', () => {
            const combination = new Combination(5);
            combination.set(1, true);
            combination.set(3, true);
            expect(combination.toString()).to.equal('{1, 3}');
        });

        it('should return an empty string for an empty combination', () => {
            const combination = new Combination(5); // No bits set
            expect(combination.toString()).to.equal('{}');
        });
    });
    
    describe('combinationFromBinaryArray Method', () => {
        it('should create a combination from a binary array', () => {
            const bits = [true, false, true, false, true];
            const combination = Combination.combinationFromBinaryArray(bits);
            expect(combination.getCombinationAsArray()).to.deep.equal([0, 2, 4]);
        });
    });

    describe('Static generate Method', () => {
        it('should generate all combinations of size k from n', () => {
            const combinations = Combination.generateAll(3, 2);
            expect(combinations.length).to.equal(Numbers.binomial(3,2));
            // Check for specific expected combinations
            expect(combinations.map(c => c.getCombinationAsArray())).to.deep.equal([
                [0, 1],
                [0, 2],
                [1, 2]
            ]);
        });
    });

    test('should return []  for combinationRefinements when no refinements exist', () => {
        const comp = new Combination(1);
        comp.set(0);
        const refinements = Combination.combinationRefinements(comp);
        expect(refinements.length).to.equal(0);
    });
    
    test('should return an array of combinations for valid refinements', () => {
        const comp = new Combination(2);
        
        const refinements = Combination.combinationRefinements(comp);
        expect(refinements).to.be.instanceOf(Array);
        expect(refinements!.length).to.equal(2);
    });

});
