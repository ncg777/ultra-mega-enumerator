import { AbstractEnumeration } from './AbstractEnumeration';
import { CompositionEnumeration } from './CompositionEnumeration';
import { WordPermutationEnumeration } from './WordPermutationEnumeration';

export class WeakOrderEnumeration extends AbstractEnumeration<number[]> {
    private ce: CompositionEnumeration|null = null;
    private me: WordPermutationEnumeration|null = null;
    private currentBase: number[] = [];
    private zerocase: number[]|null = [];
    constructor(n: number) {
        super();
        if(n>0) {
            this.ce = new CompositionEnumeration(n);
            this.nextBase();
            this.me = new WordPermutationEnumeration(this.currentBase);
        }
    }

    private nextBase(): void {
        if(this.ce === null) throw new Error("The unexpected has happened.")
        const s: number[] = this.ce.nextElement().getCompositionAsArray();
        this.currentBase = new Array(s.length);
        for (let i = 0; i < s.length; i++) {
            this.currentBase[i] = s[i];
        }
    }

    hasMoreElements(): boolean {
        if(this.ce === null||this.me === null) {
            return this.zerocase!=null;
          }
        return this.ce.hasMoreElements() || this.me.hasMoreElements();
    }

    nextElement(): number[] {
        if(this.ce === null || this.me === null) {
            if(this.zerocase == null) throw new Error("No such element.");
            this.zerocase=null;
            return [];
        }
        if (!this.me.hasMoreElements()) {
            if (!this.ce.hasMoreElements()) {
                throw new Error("No such element");
            }
            this.nextBase();
            this.me = new WordPermutationEnumeration(this.currentBase);
        }

        return this.me.nextElement();
    }
}
