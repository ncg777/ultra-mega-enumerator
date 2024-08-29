import { BitSet } from 'objects/BitSet';
import { Combination } from 'objects/Combination';

export class Composition extends Combination {
     // Constructor that initializes an empty composition based on the size n
    constructor(n: number) {
        super(n-1);
    }

    // Creating a Composition from a boolean array
    public static compositionFromBooleanArray(comp: boolean[]): Composition {
        const instance = new Composition(comp.length);
        for (let i = 0; i < instance.n; i++) {
            if (comp[i]) {
                instance.set(i, true);
            }
        }
        return instance;
    }

    // Creating a Composition from a BitSet
    public static compositionFromBitSet(x: BitSet): Composition {
        const instance = new Composition(x.size());
        for (let i = 0; i < x.size(); i++) {
            // Example method to initialize based on BitSet which you will implement
            if (x.get(i)) {
                instance.set(i, true);
            }
        }
        return instance;
    }

    // Creating a Composition from a Combination
    public static compositionFromCombination(c: Combination): Composition {
        return c.getComposition();
    }

    getTotal(): number {
        return this.n + 1;
    }

    asArray(): number[] {
        const result: number[] = [];
        let count = 1;
        for (let i = 0; i < this.n; i++) {
            if (this.get(i)) {
                result.push(count);
                count = 1;
            } else {
                count++;
            }
        }
        result.push(count); // Push the last segment
        return result;
    }

    asCombination(): Combination {
        const o = new Combination(this.n + 1);
        o.set(0);
        for (let i = 1; i < this.n + 1; i++) {
            o.set(i, this.get(i - 1));
        }
        return o;
    }

    degrade(): Composition {
        const c = this.cardinality();
        if (c === 0) {
            throw new Error("Composition cannot be degraded because it has a cardinality of zero.");
        }
        const o = new Composition(this.getTotal() - 1);
        if (c === 1) {
            return o;
        }
        let i = this.nextSetBit(0); // It can't be that i = -1
        for (let j = 0; j < o.n; j++) {
            o.set(j, this.get((j + i + 1) % o.n));
        }
        return o;
    }

    partitionByEquality(): number[] {
        const s = this.asArray();
        const groups: number[] = new Array(s.length).fill(0);
        let k = 0;
        for (let j = s.length - 1; j >= 0; j--) {
            if (s[0] === s[j]) { k--; }
            else { break; }
        }
        k += s.length;
        k = k % s.length;
        let previousValue = s[k];
        let currentGroup = 0;
        for (let i = k + 1; i < s.length + k; i++) {
            const v = s[i % s.length];
            if (v !== previousValue) {
                currentGroup++;
            }
            groups[i % groups.length] = currentGroup;
            previousValue = v;  
        }
        return groups;
    }


    toString(): string {
        return this.asArray().toString();
    }

    static compositionRefinements(co: Composition): Composition[] | null {
        const c = Combination.combinationRefinements(co);
        if (c == null) {
            return null;
        }
        const o: Composition[] = new Array<Composition>(c.length);
        for (let i = 0; i < c.length; i++) {
            o[i] = new Composition(co.n);
            for (let j = 0; j < co.n; j++) {
                o[i].set(j, c[i].get(j));
            }
        }
        return o;
    }
}
