// src/enumerations/PartitionEnumeration.ts
import { AbstractEnumeration } from './AbstractEnumeration';

export class PartitionEnumeration extends AbstractEnumeration<Array<number>> {
    private p: number[]; // Array to store the current partition
    private k: number; // Current index in p
    private hasNext: boolean; // Flag to indicate if more partitions are available
    private first: boolean; // Flag to handle the first partition
    private next: Array<number> | null = null; // The next partition to return

    constructor(n: number) {
        super();
        if (n < 0) {
            throw new Error("n must be non-negative.");
        }
        
        this.p = new Array(n + 1).fill(0);
        this.p[0] = n; // Start with the partition [n]
        this.k = 0; // Start at the first index
        this.hasNext = n >= 0;
        this.first = true;
        this.nextPartition();
    }

    protected hasMoreElements(): boolean {
        return this.next !== null;
    }

    protected nextElement(): Array<number> {
        const partition = this.next!.slice(); // Copy the current partition
        this.nextPartition();
        return partition;
    }

    private nextPartition(): void {
        if (!this.hasNext) {
            throw new Error("No more partitions available.");
        }

        // Handle the first partition
        if (this.first) {
            this.first = false;
            if (this.p[0] === 0) {
                this.hasNext = false;
                this.next = [];
                return;
            }
            this.next = [this.p[0]];
            return;
        }

        // Find the rightmost element that can be decreased
        let rem = 0;
        while (this.k >= 0 && this.p[this.k] === 1) {
            rem += this.p[this.k];
            this.k--;
        }

        // If k is negative, all elements were 1's and we are done
        if (this.k < 0) {
            this.hasNext = false;
            this.next = null; // No more partitions
            return;
        }

        // Decrease p[k] by 1
        this.p[this.k]--;
        // Calculate the new remainder to be distributed
        rem += 1;

        // Distribute the remainder among the following elements
        let i = this.k + 1;
        while (rem > this.p[this.k] && i < this.p.length) {
            this.p[i] = this.p[this.k];
            rem -= this.p[this.k];
            i++;
        }

        // Assign the remaining remainder
        if (i < this.p.length) {
            this.p[i] = rem;
            this.k = i; // Update the current index
        }

        // Construct the current partition to return
        const currentPartition: number[] = [];
        for (let j = 0; j <= this.k; j++) {
            currentPartition.push(this.p[j]);
        }
        this.next = currentPartition;
    }

    public static of(n: number): PartitionEnumeration {
        return new PartitionEnumeration(n);
    }
}