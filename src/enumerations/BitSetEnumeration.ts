import { BitSet } from 'objects/BitSet';
import { Enumeration } from 'utils/Enumeration';

export class BitSetEnumeration extends Enumeration<BitSet> {
    private current: BitSet|undefined;
    private n: number;

    /**
     * @param n the base
     */
    constructor(n: number) {
        super();
        if (n < 0) {
            throw new Error("Invalid argument: n must be non-negative.");
        }
        this.current = new BitSet(n);
        this.n = n;
    }

    hasMoreElements(): boolean {
        return this.current !== null;
    }

    private next(b: BitSet): BitSet|undefined {
        const o = b.copy();
        let isLast = true;
        
        for (let i = 0; i < this.n; i++) {
            if (!o.get(i)) {
                o.set(i, true);
                isLast = false;
                break;
            } else {
                o.set(i, false);
            }
        }

        if (isLast) {
            return undefined;
        }

        return o;
    }

    nextElement(): BitSet {
        if(this.current==undefined) {
          throw Error("No such element");
        }
        const o = this.current;
        this.current = this.next(this.current) || undefined;
        return o;
    }
}
