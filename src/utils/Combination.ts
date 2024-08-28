import { CombinationEnumeration } from 'enumerations/CombinationEnumeration';
import { BitSet } from './BitSet'; // Adjust the import path according to your project
import { Composition } from './Composition';
import { Numbers } from './Numbers';
import { hashCodeFor } from './utils';

/**
 * Class representing a Combination, which extends BitSet to manage combinations
 * of bits. It includes additional methods specific to combination logic.
 */
export class Combination extends BitSet implements Comparable<Combination> {
    constructor(n: number) {
        super(n);
    }
    getN(): number { return this.n;}

    // Returns the number of selected bits (or elements in the combination)
    getK(): number {
        return this.cardinality(); // Uses BitSet's cardinality method
    }

    asSequence(): number[]{
        const  o = [];
        for (let i = this.nextSetBit(0); i >= 0; i = this.nextSetBit(i + 1)) {
            o.push(i)
        }
        return o;
    }

    // Inside the Combination class
    public getComposition(): Composition {
        const nsb = this.nextSetBit(0);
        if (nsb === -1) {
            return new Composition(this.n); // Assuming Composition constructor accepts a number
        } else {
            const t = this.rotate(-nsb); // Rotate by the negative index of the first set bit
            const l: boolean[] = [];
            for (let i = 1; i < this.n; i++) {
                l.push(t.get(i)); // Collect bits starting from index 1
            }
            return Composition.compositionFromBooleanArray(l); // Return a new Composition instance initialized with the list of boolean values
        }
    }

    // Intersect this combination with another
    intersect(other: Combination): Combination {
        const result = new Combination(this.size());
        for (let i = 0; i < this.size(); i++) {
            result.set(i, this.get(i) && other.get(i));
        }
        return result;
    }

    // Subtract another combination from this one
    minus(other: Combination): Combination {
        const result = new Combination(this.size());
        for (let i = 0; i < this.size(); i++) {
            result.set(i, this.get(i) && !other.get(i));
        }
        return result;
    }

    // Calculate symmetric difference with another combination
    symmetricDifference(other: Combination): Combination {
        const result = new Combination(this.size());
        for (let i = 0; i < this.size(); i++) {
            result.set(i, this.get(i) !== other.get(i));
        }
        return result;
    }

    // Rotate the bits in the combination
    rotate(t: number): Combination {
        const result = new Combination(this.size());
        for (let i = 0; i < this.size(); i++) {
            result.set(i, this.get((i - t + this.size()) % this.size()));
        }
        return result;
    }

    // Static method to generate a random combination of size k from n
    static generateRandom(n: number, k: number): Combination {
        const combination = new Combination(n);
        let count = 0;
        const selectedIndices: Set<number> = new Set();

        while (count < k) {
            const index = Math.floor(Math.random() * n);

            if (!selectedIndices.has(index)) {
                combination.set(index, true);
                selectedIndices.add(index);
                count++;
            }
        }

        return combination;
    }

    // A method to convert from a binary array to a Combination instance
    static combinationFromBinaryArray(bitArray: boolean[]): Combination {
        const combination = new Combination(bitArray.length);
        bitArray.forEach((bit, index) => {
            combination.set(index, bit);
        });
        return combination;
    }

    // Implementing the partition function that accepts a sequence
    partition(sequence: number[]): Combination[] {
        const partitionArray = sequence.map(i => i) as number[];
        return this.partitionByIndices(partitionArray);
    }

    // Implementing the private partition function with Integer array
    private partitionByIndices(partition: number[]): Combination[] {
        if (partition.length !== this.getK()) {
            throw new Error("Invalid partition size compared to combination size.");
        }

        const min = Math.min(...partition);
        const max = Math.max(...partition);

        if (min !== 0 || max > this.getK()) {
            throw new Error("Invalid partition values.");
        }

        const set: number[] = [];
        for (let i = this.nextSetBit(0); i >= 0; i = this.nextSetBit(i + 1)) {
            set.push(i);
        }

        const combinations = new Array<Combination>(max + 1);
        const bitSets = new Array<BitSet>(max + 1);

        for (let i = 0; i <= max; i++) {
            bitSets[i] = new BitSet(this.size());
            for (let j = 0; j < partition.length; j++) {
                if (partition[j] === i) {
                    bitSets[i].set(set[j]);
                }
            }
            combinations[i] = new Combination(this.size());
            combinations[i].copyFrom(bitSets[i]); // Assuming a hypothetical copyFrom method exists
        }

        return combinations;
    }

    // Method to copy from another BitSet if needed
    private copyFrom(bitSet: BitSet): void {
        for (let i = 0; i < this.size(); i++) {
            this.set(i, bitSet.get(i));
        }
    }

    public copy(): Combination {
        const o = new Combination(this.n);
        o.copyFrom(this);
        return o;
    }

    // Hash Code Implementation
    hashCode(): number {
        const prime = 31;
        let result = hashCodeFor(this); // Assuming there's a hashCode in BitSet class
        result = prime * result + this.n;
        return result;
    }

    // Equals Implementation
    equals(obj: any): boolean {
        if (obj == null || !(obj instanceof Combination)) {
            return false;
        }
        return this.compareTo(obj) === 0;
    }

    // To String Implementation
    toString(): string {
        let output = '';
        for (let i = this.nextSetBit(0); i >= 0; i = this.nextSetBit(i + 1)) {
            output += `${i}, `;
        }
        if (output.length > 0) {
            output = output.substring(0, output.length - 2); // Remove trailing comma
        }
        return `{${output}}`;
    }


    public static generate(n: number, k: number): Combination[] {
        const cnt = Numbers.binomial(n, k);
        const combinations: Combination[] = new Array(cnt);
        const combinationEnumeration = new CombinationEnumeration(n, k);
        
        for (let i = 0; i < cnt; i++) {
            combinations[i] = combinationEnumeration.nextElement();
        }
        
        return combinations;
    }
    
    // Create a Combination from a binary Sequence
    static combinationFromBinarySequence(s: boolean[]): Combination {
        const c = new Combination(s.length);
        for (let i = 0; i < s.length; i++) {
            if (s[i]) {
                c.set(i, true);
            }
        }
        return c;
    }

    // Compare this Combination with another
    compareTo(other: Combination): number {
        if (this.n < other.n) return -1;
        if (this.n > other.n) return 1;

        const a = new BitSet(this.size());
        a.or(this);
        const b = new BitSet(this.size());
        b.or(other);
        a.xor(b);
        const i = a.nextSetBit(0);
        if (i === -1) {
            return 0;
        } else {
            return b.get(i) ? -1 : 1;
        }
    }

    // List all combinations that have 1 more element than this one
    static combinationRefinements(c: Combination): Combination[] {
        const n = c.getN() - c.getK();
        if (n === 0) {
            return [];
        }
        const o: Combination[] = [];
        let k = 0;

        for (let i = 0; i < n; i++) {
            while (c.get(k)) {
                k++;
            }
            const b = new BitSet(c.size());
            b.or(c);
            b.set(k++);
            const toAdd = new Combination(b.size());
            toAdd.copyFrom(b);
            o.push(toAdd);
        }
        return o;
    }

    // Merge two combinations
    static merge(a: Combination, b: Combination): Combination {
        const x = new BitSet(Math.max(a.size(), b.size()));
        x.or(a);
        x.or(b);
        return new Combination(x.size());
    }   
}
