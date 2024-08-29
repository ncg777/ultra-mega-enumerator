import { Enumeration } from './../utils/Enumeration';
import { MixedRadixEnumeration } from './MixedRadixEnumeration';

export class KPermutationEnumeration extends Enumeration<Array<number>> {
    private mre: MixedRadixEnumeration;
    private n: number;
    private k: number;

    constructor(n: number, k: number) {
        super();
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
        const o:number[] = []
        const l:number[] = []
        for(let i=0;i<this.n;i++){l.push(i);}
        for(let i=0;i<this.k;i++){
            o.push(l[m[i]]); 
            l.splice(l.findIndex((x) => x === m[i]),1);
        }
        return o;
    }
}
