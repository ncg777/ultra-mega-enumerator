import { Numbers } from 'utils/Numbers';
import { Enumeration } from 'utils/Enumeration';

export class PermutationEnumeration extends Enumeration<number[]> {
    private p: number[];
    
    // Constructor. WARNING: Don't make n too large.
    public constructor(n: number) {
        super();
        if (n < 1) {
            throw new Error("Min 1");
        }
        this.p = Array.from({ length: n }, (_, i) => i);
        for (let i = 0; i < this.p.length; i++) {
            this.p[i] = i;
        }
    }


    // Generate next permutation
    private static getNext(a0: number[]): number[] | null {
        const a = [...a0];

        // Find largest index j with a[j] < a[j+1]
        let j = a.length - 2;
        while (j >= 0 && a[j] > a[j + 1]) {
            j--;
        }

        if (j < 0) {
            return null;  // No more permutations
        }

        // Find index k such that a[k] is smallest integer greater than a[j]
        let k = a.length - 1;
        while (a[j] > a[k]) {
            k--;
        }

        // Interchange a[j] and a[k]
        [a[j], a[k]] = [a[k], a[j]];

        // Put tail end of permutation after jth position in increasing order
        let r = a.length - 1;
        let s = j + 1;

        while (r > s) {
            [a[s], a[r]] = [a[r], a[s]];
            r--;
            s++;
        }
        return a;
    }

    hasMoreElements(): boolean {
        return this.p != null;
    }

    nextElement(): number[] {
        this.p = PermutationEnumeration.getNext(this.p)!;
        
        return this.p;
    }
}
