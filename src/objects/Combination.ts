import { CombinationEnumeration } from './../enumerations/CombinationEnumeration';
import { BitSet } from '.';
import { Numbers } from '../Numbers';
import { Utils } from '../Utils';

/**
 * Class representing a Combination, which extends BitSet to manage combinations
 * of bits. It includes additional methods specific to combination logic.
 */
export class Combination extends BitSet {
    constructor(n: number) {
        super(n);
    }
    public getN(): number {
        return this.n;
    }
    public static fromBooleanArray(array: boolean[]): Combination {
        const combination = new Combination(array.length);
        for (let i = 0; i < array.length; i++) {
            combination.set(i, array[i]);
        }
        return combination;
    }
    public static createWithSizeAndSet(n: number, set: Set<number>): Combination {
        // Create a boolean array of size n
        const booleanArray: boolean[] = Array.from({ length: n }, (_, index) => set.has(index));
    
        // Use the fromBooleanArray method to create the Combination instance
        const combination = Combination.fromBooleanArray(booleanArray);
    
        // Return the new ImmutableCombination instance
        return combination;
    }
    public asSequence(): number[] {
        const seq: number[] = [];
        for (let i = this.nextSetBit(0); i >= 0; i = this.nextSetBit(i + 1)) {
            seq.push(i);
        }
        return seq;
    }
    public combinationString(): string {
        const str = Array.from(this.getTrueBits()).map((s) => s.toString()).join(" ");
        return str;
    }
   
    public getIntervalVector(): number[] {
        return Utils.calcIntervalVector(this.getBitSetAsNumberArray());
    }
    getCombinationAsArray(): number[]{
        const  o = [];
        for (let i = this.nextSetBit(0); i >= 0; i = this.nextSetBit(i + 1)) {
            o.push(i)
        }
        return o;
    }

    // Method to find the intersection of two combinations
    public intersect(c: Combination): Combination {
        const n = Math.min(this.getN(), c.getN());
        const intersectionBits: boolean[] = Array(n).fill(false);

        for (let i = 0; i < n; i++) {
            intersectionBits[i] = this.get(i) && c.get(i); // Bitwise AND operation
        }

        return Combination.fromBooleanArray(intersectionBits);
    }

    // Method to subtract one combination from another
    public minus(c: Combination): Combination {
        const resultBits: boolean[] = Array(this.getN()).fill(false); // Initialize with false
        const n = Math.min(this.getN(), c.getN());

        for (let i = 0; i < this.getN(); i++) {
            resultBits[i] = this.get(i); // Start with current combination bits
        }

        // for each index, set to false if both combinations have the bit set to true
        for (let i = 0; i < n; i++) {
            if (this.get(i) && c.get(i)) {
                resultBits[i] = false; // Remove the bit if it exists in both
            } else {
                resultBits[i] = this.get(i); // Keep the original bit if it doesn't exist in c
            }
        }

        return Combination.fromBooleanArray(resultBits);
    }

    // Static method to merge two combinations
    public static merge(a: Combination, b: Combination): Combination {
        const maxN = Math.max(a.getN(), b.getN());
        const mergedBits: boolean[] = Array(maxN).fill(false);

        for (let i = 0; i < a.getN(); i++) {
            mergedBits[i] = mergedBits[i] || a.get(i); // Bitwise OR operation
        }
        
        for (let i = 0; i < b.getN(); i++) {
            mergedBits[i] = mergedBits[i] || b.get(i); // Bitwise OR operation
        }

        return Combination.fromBooleanArray(mergedBits);
    }

    public mergeWith(a: Combination) {
        return Combination.merge(this,a);
    }

    public symmetricDifference(y: Combination): Combination {
        const x = new BitSet(Math.max(this.getN(), y.getN()));
        x.or(this);
        x.xor(y);
        return Combination.fromBooleanArray(x.getBitSetAsBooleanArray());
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
    public static combinationFromBitSet(x: BitSet): Combination {
        const instance = new Combination(x.size());
        instance.copyFrom(x)
        return instance;
    }
    // Implementing the partition function that accepts a sequence
    partition(sequence: number[]): Combination[] {
        const partitionArray = sequence.map(i => i) as number[];
        return this.partitionByIndices(partitionArray);
    }

    // Implementing the private partition function with Integer array
    private partitionByIndices(partition: number[]): Combination[] {
        if (partition.length !== this.cardinality()) {
            throw new Error("Invalid partition size compared to combination size.");
        }

        const min = Math.min(...partition);
        const max = Math.max(...partition);

        if (min !== 0 || max > this.cardinality()) {
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
        this.bits = new Set<number>(bitSet.getTrueBits());
    }

    public copy(): Combination {
        const o = new Combination(this.n);
        o.copyFrom(this);
        return o;
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


    public static generateAll(n: number, k: number): Combination[] {
        const cnt = Numbers.binomial(n, k);
        const combinations: Combination[] = new Array(cnt);
        const combinationEnumeration = new CombinationEnumeration(n, k);
        
        for (let i = 0; i < cnt; i++) {
            combinations[i] = combinationEnumeration.nextElement();
        }
        
        return combinations;
    }

    // List all combinations that have 1 more element than this one
    static combinationRefinements(c: Combination): Combination[] {
        const n = c.size() - c.cardinality();
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
            o.push(Combination.combinationFromBitSet(b));
        }
        return o;
    }  
}
