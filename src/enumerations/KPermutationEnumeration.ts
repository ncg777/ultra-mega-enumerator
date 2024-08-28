import { Enumeration } from './../interfaces/Enumeration';
import { MixedRadixEnumeration } from './MixedRadixEnumeration';

export class KPermutationEnumeration implements Enumeration<Array<number>> {
    private mre: MixedRadixEnumeration;
    private n: number;
    private k: number;

    constructor(n: number, k: number) {
        this.n = n;
        this.k = k;
        const base: number[] = new Array(k);
        for (let i = 0; i < k; i++) {
            base[i] = n - i;
        }
        this.mre = new MixedRadixEnumeration(base);
    }

    hasMoreElements(): boolean {
        return this.mre.hasMoreElements();
    }

    nextElement(): Array<number> {
        if (!this.hasMoreElements()) {
            throw new Error("No such element");
        }
        const m = this.mre.nextElement();
        const o: Array<number> = [];
        const l: Array<number> = [];

        for (let i = 0; i < this.n; i++) {
            l.push(i);
        }

        for (let i = 0; i < this.k; i++) {
            o.push(l[m[i]]);
            l.splice(m[i], 1); // Remove the used element
        }

        return o;
    }
}
