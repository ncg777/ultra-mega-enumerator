import { Enumeration } from './../utils/Enumeration';
import { Composition } from './../objects/Composition';
import { BitSetEnumeration } from './BitSetEnumeration';

export class CompositionEnumeration extends Enumeration<Composition> {
    private be: BitSetEnumeration;
    private n: number;

    constructor(n: number) {
        super()
        if (n < 1) {
            throw new Error("Invalid argument: n must be at least 1.");
        }
        this.be = new BitSetEnumeration(n - 1);
        this.n = n;
    }

    nextElement(): Composition {
        if (!this.hasMoreElements()) {
            throw new Error("No such element");
        }
        return Composition.compositionFromBitSet(this.be.nextElement());
    }

    hasMoreElements(): boolean {
        return this.be.hasMoreElements();
    }
}
