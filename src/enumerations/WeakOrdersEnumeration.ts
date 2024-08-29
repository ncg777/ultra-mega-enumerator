import { Enumeration } from 'utils/Enumeration';
import { CompositionEnumeration } from './CompositionEnumeration';
import { WordPermutationEnumeration } from './WordPermutationEnumeration';

export class WeakOrdersEnumeration extends Enumeration<number[]> {
    private ce: CompositionEnumeration;
    private me: WordPermutationEnumeration;
    private currentBase: number[] = [];

    constructor(n: number) {
        this.ce = new CompositionEnumeration(n);
        this.nextBase();
        this.me = new WordPermutationEnumeration(this.currentBase);
    }

    private nextBase(): void {
        const s: number[] = this.ce.nextElement().asArray();
        this.currentBase = new Array(s.length);
        for (let i = 0; i < s.length; i++) {
            this.currentBase[i] = s[i];
        }
    }

    hasMoreElements(): boolean {
        return this.ce.hasMoreElements() || this.me.hasMoreElements();
    }

    nextElement(): number[] {
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
