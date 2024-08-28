import { combineHashCodes } from "./utils";

export class HeterogeneousPair<T, U> implements Comparable<HeterogeneousPair<T, U>> {
    private x: T;
    private y: U;

    private constructor(first: T, second: U) {
        this.x = first;
        this.y = second;
    }

    static makeHeterogeneousPair<T, U>(first: T, second: U): HeterogeneousPair<T, U> {
        return new HeterogeneousPair(first, second);
    }

    getFirst(): T {
        return this.x;
    }

    getSecond(): U {
        return this.y;
    }

    converse(): HeterogeneousPair<U, T> {
        return HeterogeneousPair.makeHeterogeneousPair(this.y, this.x);
    }

    hashCode(): number {
        return combineHashCodes(this.x, this.y); // Use utility function to compute hash code
    }

    equals(obj: any): boolean {
        if (this === obj) return true;
        if (obj == null || obj.constructor !== this.constructor) return false;
        const other: HeterogeneousPair<T, U> = obj as HeterogeneousPair<T, U>;
        return this.compareTo(other) === 0;
    }

    compareTo(other: HeterogeneousPair<T, U>): number {
        const xComparison = this.compare(this.x, other.x);
        return xComparison !== 0 ? xComparison : this.compare(this.y, other.y);
    }

    private compare<A>(a: A, b: A): number {
        if (a === null) return -1;
        if (b === null) return 1;
        if (a! < b!) return -1; // Asserting 'a' and 'b' are not undefined
        if (a! > b!) return 1;
        return 0;
    }

    toString(): string {
        return `<${this.x !== null ? this.x : "null"}, ${this.y !== null ? this.y : "null"}>`;
    }
}
