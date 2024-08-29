import { Enumeration } from 'utils/Enumeration';
import { DyckWordEnumeration } from './DyckWordEnumeration'; // Assuming this is defined somewhere

export class NGoodPathEnumeration extends Enumeration<number[]> {
  
    private dw: DyckWordEnumeration;

    constructor(n: number) {
        super();
        this.dw = new DyckWordEnumeration(n);
    }

    hasMoreElements(): boolean {
        return this.dw.hasMoreElements();
    }

    nextElement(): number[] {
        if (!this.hasMoreElements()) {
            throw new Error("No such element");
        }
        return NGoodPathEnumeration.convertDyckWordToPath(this.dw.nextElement());
    }

    private static convertDyckWordToPath(s: string): number[] {
        let x = 0;
        let y = 0;
        const n = s.length / 2;

        const o: number[] = new Array(n);

        for (let i = 0; i < s.length; i++) {
            if (s.charAt(i) === '(') {
                o[x++] = y;
            } else {
                y++;
            }
        }
        return o;
    }
}
