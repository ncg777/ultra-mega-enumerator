// SetPartitionEnumeration.ts
import { Enumeration } from 'utils/Enumeration';

export class SetPartitionEnumeration extends Enumeration<number[]> {
    private readonly n: number;
    private k: number[];
    private m: number[];
    private hasMore: boolean;

    constructor(n: number) {
        this.n = n;
        this.k = new Array(n).fill(0);
        this.m = new Array(n).fill(0);
        this.hasMore = true;

        this.initializeFirstPartition();
    }

    private initializeFirstPartition() {
        // No need for explicit initialization, as we already filled arrays with 0s.
    }

    private nextPartition(): boolean {
        for (let i = this.n - 1; i > 0; i--) {
            if (this.k[i] <= this.m[i - 1]) {
                this.k[i]++;
                this.m[i] = Math.max(this.m[i], this.k[i]);

                for (let j = i + 1; j < this.n; j++) {
                    this.k[j] = 0;
                    this.m[j] = this.m[i];
                }
                return true;
            }
        }
        return false;
    }

    public hasMoreElements(): boolean {
        return this.hasMore;
    }

    public nextElement(): number[] {
        if (!this.hasMore) {
            throw new Error("No such element");
        }

        const currentPartition = [...this.k];
        if (this.n === 0) {
            this.hasMore = false;
            return [];
        } else {
            this.hasMore = this.nextPartition();
        }

        return currentPartition;
    }
}
