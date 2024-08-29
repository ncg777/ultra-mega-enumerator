import { Enumeration } from 'utils/Enumeration';
import { BitSet } from 'objects/BitSet';
import { Composition } from 'objects/Composition';

export class CompositionEnumeration extends Enumeration<Composition> {
    private be: BitSet; // Assuming BitSetEnumeration is equivalent to BitSet for this context
    private n: number;

    constructor(n: number) {
        super()
        if (n < 1) {
            throw new Error("Invalid argument: n must be at least 1.");
        }
        this.be = new BitSet(n - 1);
        this.n = n;
    }

    nextElement(): Composition {
        if (!this.hasMoreElements()) {
            throw new Error("No such element");
        }
        return Composition.compositionFromBitSet(this.be); // Simplified for context
    }

    hasMoreElements(): boolean {
        return this.be.cardinality() < Math.pow(2, this.be.size());
    }
}
