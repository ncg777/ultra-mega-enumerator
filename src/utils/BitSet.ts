/**
 * This class represents a mutable set of bits, with methods for bit manipulation,
 * such as setting, clearing, flipping, and querying bits. The BitSet can handle
 * operations such as bitwise AND, OR, and XOR with other BitSet instances. 
 * It provides functionality to navigate through bits, including finding the next 
 * and previous set or clear bits. The BitSet can also convert its contents to 
 * a binary string representation, and it can calculate its cardinality (the 
 * number of set bits).
 * 
 * The class implements the Comparable interface to allow comparison between 
 * different BitSet instances based on their sizes and bit values. It also 
 * provides methods to create copies of the BitSet and to convert the bit 
 * representation to different formats.
 * 
 * Usage:
 * 
 * const bitSet = new BitSet(10);
 * bitSet.set(2);
 * bitSet.flip(3);
 * console.log(bitSet.toString()); // "0011000000"
 */
export class BitSet implements Comparable<BitSet>  {
    private bits: number[];
    protected n: number;

    constructor(n: number) {
        if (n < 1) {
            throw new Error("Invalid BitSet size.");
        }
        this.n = n;
        this.bits = Array(Math.ceil(n / BitSet.wordSize())).fill(0);
    }
    
    compareTo(other: BitSet): number {
        // Compare sizes
        if (this.n < other.n) return -1;
        if (this.n > other.n) return 1;

        // Compare bits if sizes are equal
        for (let i = 0; i < this.bits.length; i++) {
            if (this.get(i) < other.get(i)) return -1;
            if (this.get(i) > other.get(i)) return 1;
        }
        
        // If they are equal
        return 0;
    }

    private static wordSize(): number {
        return Number.MAX_SAFE_INTEGER.toString(2).length;
    }

    size(): number {
        return this.n;
    }
    get(bitIndex: number): boolean {
        if (bitIndex >= this.n) {
            throw new Error("Index out of bounds");
        }
        return (this.bits[Math.floor(bitIndex / BitSet.wordSize())] & (1 << (bitIndex % BitSet.wordSize()))) !== 0;
    }

    set(bitIndex: number, value: boolean = true): void {
        if (bitIndex >= this.n) {
            throw new Error("Index out of bounds");
        }
        if (value) {
            this.bits[Math.floor(bitIndex / BitSet.wordSize())] |= 1 << (bitIndex % BitSet.wordSize());
        } else {
            this.bits[Math.floor(bitIndex / BitSet.wordSize())] &= ~(1 << (bitIndex % BitSet.wordSize()));
        }
    }

    clear(bitIndex: number): void {
        this.bits[Math.floor(bitIndex / BitSet.wordSize())] &= ~(1 << (bitIndex % BitSet.wordSize()));
    }

    flip(bitIndex: number): void {
        this.bits[Math.floor(bitIndex / BitSet.wordSize())] ^= 1 << (bitIndex % BitSet.wordSize());
    }

    nextSetBit(fromIndex: number): number {
        for (let i = fromIndex; i < this.n; i++) {
            if (this.get(i)) {
                return i;
            }
        }
        return -1;
    }

    nextClearBit(fromIndex: number): number {
        for (let i = fromIndex; i < this.n; i++) {
            if (!this.get(i)) {
                return i;
            }
        }
        return -1;
    }

    previousSetBit(fromIndex: number): number {
        for (let i = fromIndex; i >= 0; i--) {
            if (this.get(i)) {
                return i;
            }
        }
        return -1;
    }

    previousClearBit(fromIndex: number): number {
        for (let i = fromIndex; i >= 0; i--) {
            if (!this.get(i)) {
                return i;
            }
        }
        return -1;
    }

    toBitString(): string {
        return Array.from({ length: this.n }, (_, i) => this.get(this.n - (i + 1)) ? "1" : "0").join("");
    }

    toString(): string {
        return this.toBitString();
    }

    cardinality(): number {
        return this.bits.reduce((sum, word) => sum + word.toString(2).split('1').length - 1, 0);
    }

    and(bitSet: BitSet): void {
        this.bits = this.bits.map((word, i) => word & bitSet.bits[i]);
    }

    or(bitSet: BitSet): void {
        this.bits = this.bits.map((word, i) => word | bitSet.bits[i]);
    }

    xor(bitSet: BitSet): void {
        this.bits = this.bits.map((word, i) => word ^ bitSet.bits[i]);
    }

    equals(obj: any): boolean {
        return obj instanceof BitSet && this.bits.every((word, i) => word === obj.bits[i]);
    }

    copy(): BitSet {
        const clone = new BitSet(this.n);
        clone.bits = [...this.bits];
        return clone;
    }

    toArray(): number[] {
        return Array.from(this.iterSearch(true));
    }

    toBinaryArray(): number[] {
        return Array.from({ length: this.n }, (_, i) => this.get(i) ? 1 : 0);
    }

    rotate(t: number): BitSet {
        let k = t;
        while (k < 0) k += this.n;
        while (k >= this.n) k -= this.n;
        const rotated = new BitSet(this.n);
        for (let i = 0; i < this.n; i++) {
            rotated.set(i, this.get((i - k + this.n) % this.n));
        }
        return rotated;
    }

    union(other: BitSet): BitSet {
        const result = new BitSet(this.n);
        for (let i = 0; i < this.n; i++) {
            result.set(i, this.get(i) || other.get(i));
        }
        return result;
    }

    intersection(other: BitSet): BitSet {
        const result = new BitSet(this.n);
        for (let i = 0; i < this.n; i++) {
            result.set(i, this.get(i) && other.get(i));
        }
        return result;
    }

    minus(other: BitSet): BitSet {
        const result = new BitSet(this.n);
        for (let i = 0; i < this.n; i++) {
            result.set(i, this.get(i) && !other.get(i));
        }
        return result;
    }

    static bitSetFromBinaryArray(bitArray: number[]): BitSet {
        const bs = new BitSet(bitArray.length);
        bitArray.forEach((bit, i) => bs.set(i, bit === 1));
        return bs;
    }

    static fromBitString(bitString: string): BitSet {
        const bs = new BitSet(bitString.length);
        Array.from(bitString).forEach((char, i) => bs.set(bs.n - (i + 1), char === "1"));
        return bs;
    }

    intersects(bitSet: BitSet): boolean {
        return this.bits.some((word, i) => (word & bitSet.bits[i]) !== 0);
    }

    isEmpty(): boolean {
        return this.bits.every(word => word === 0);
    }

    resize(newSize: number): void {
        if (newSize < 1) {
            throw new Error("Invalid BitSet size");
        }
        const newBits = Array(Math.ceil(newSize / BitSet.wordSize())).fill(0);
        this.bits.forEach((word, i) => newBits[i] = word);
        this.n = newSize;
        this.bits = newBits;
    }

    compare(other: BitSet): number {
        if (!(other instanceof BitSet)) {
            throw new Error("Can only compare with another BitSet");
        }
        for (let i = 0; i < Math.min(this.n, other.n); i++) {
            if (this.get(i) !== other.get(i)) {
                return this.get(i) ? 1 : -1;
            }
        }
        return this.n === other.n ? 0 : (this.n > other.n ? 1 : -1);
    }
    
    private *iterSearch(value: boolean): IterableIterator<number> {
        for (let i = 0; i < this.n; i++) {
            if (this.get(i) === value) {
                yield i;
            }
        }
    }
}

