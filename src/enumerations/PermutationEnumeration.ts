import { AbstractEnumeration } from './AbstractEnumeration';

export class PermutationEnumeration extends AbstractEnumeration<number[]> {
    private p: number[]|null;
    
    // Constructor. WARNING: Don't make n too large.
    public constructor(n: number) {
        super();
        if (n < 0) {
            throw new Error("Min 0");
        }
        this.p = [];
        for(let i=0;i<n;i++) this.p.push(i);
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
        const o = this.p;
        if(o == null) {throw new Error("No such element");}

        this.p = PermutationEnumeration.getNext(this.p!);
        
        return o;
    }
}
