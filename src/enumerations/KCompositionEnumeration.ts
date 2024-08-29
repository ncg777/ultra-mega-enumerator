import { Enumeration } from './../utils/Enumeration';
import { Composition } from './../objects/Composition';
import { CombinationEnumeration } from './CombinationEnumeration';

export class KCompositionEnumeration extends Enumeration<Composition> {
    private ce: CombinationEnumeration;
    private n: number;

    constructor(n: number, k:number) {
        super()
        if (n < 1) {
            throw new Error("Invalid argument: n must be at least 1.");
        }
        if (k < 1) {
            throw new Error("Invalid argument: k must be at least 1.");
        }
        this.ce = new CombinationEnumeration(n - 1, k-1);
        this.n = n;
    }

    nextElement(): Composition {
        if (!this.hasMoreElements()) {
            throw new Error("No such element");
        }
        return Composition.compositionFromBitSet(this.ce.nextElement());
    }

    hasMoreElements(): boolean {
        return this.ce.hasMoreElements();
    }
}
