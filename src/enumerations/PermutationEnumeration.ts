import { Numbers } from 'utils/Numbers';
import { Enumeration } from './../interfaces/Enumeration';

export class PermutationEnumeration implements Enumeration<number[]> {
    private a: number[];
    private numLeft: number=-1;
    private total: number;

    // Constructor. WARNING: Don't make n too large.
    public constructor(n: number) {
        if (n < 1) {
            throw new Error("Min 1");
        }
        this.a = Array.from({ length: n }, (_, i) => i);
        this.total = Numbers.factorial(n);
        this.reset();
    }

    // Reset
    public reset(): void {
        for (let i = 0; i < this.a.length; i++) {
            this.a[i] = i;
        }
        this.numLeft = this.total;
    }

    // Return number of permutations not yet generated
    public getNumLeft(): number {
        return this.numLeft;
    }

    // Return total number of permutations
    public getTotal(): number {
        return this.total;
    }

    // Are there more permutations?
    public hasMore(): boolean {
        return this.numLeft > 0;
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

    public getNext(): number[] {
        if (this.numLeft === this.total) {
            this.numLeft--;
            return this.a;
        }

        const next = PermutationEnumeration.getNext(this.a);
        if (next === null) {
            throw new Error("No such element");
        }

        this.a = next;
        this.numLeft--;
        return this.a;
    }

    public hasMoreElements(): boolean {
        return this.hasMore();
    }

    public nextElement(): number[] {
        return this.getNext();
    }
}
