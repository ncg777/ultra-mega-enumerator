import { Numbers } from "../Numbers";

// Define Operation Enum
export enum Operation {
    Add = 'Add',
    Subtract = 'Subtract',
    Multiply = 'Multiply',
    Divide = 'Divide',
    X = 'X',
    Y = 'Y',
    Power = 'Power',
    Log = 'Log',
    Min = 'Min',
    Max = 'Max',
    MaxZeroX = 'MaxZeroX',
    MinZeroX = 'MinZeroX',
    MaxZeroY = 'MaxZeroY',
    MinZeroY = 'MinZeroY',
    Modulo = 'Modulo',
    Bounce = 'Bounce',
    And = 'And',
    Nand = 'Nand',
    Or = 'Or',
    Nor = 'Nor',
    Implication = 'Implication',
    ReverseImplication = 'ReverseImplication',
    Xor = 'Xor',
    Xnor = 'Xnor',
    ShiftBits = 'ShiftBits',
    LCM = 'LCM',
    GCD = 'GCD',
    Equal = 'Equal',
    NotEqual = 'NotEqual',
    LessThan = 'LessThan',
    LessThanOrEqual = 'LessThanOrEqual',
    GreaterThan = 'GreaterThan',
    GreaterThanOrEqual = 'GreaterThanOrEqual',
    Binomial = 'Binomial',
    ExpandBits = 'ExpandBits',
    ExpandBitsFill = 'ExpandBitsFill',
    CantorIntervalBinaryNumber = 'CantorIntervalBinaryNumber',
    PermuteBits = 'PermuteBits',
    HardThreshold = 'HardThreshold',
    RandInt = 'RandInt'
  }
  
  // Define Combiner Enum
  export enum Combiner {
    Product = 'Product',
    NegativeProduct = 'NegativeProduct',
    Convolution = 'Convolution',
    Triangular = 'Triangular',
    Recycle = 'Recycle',
    LCM = 'LCM',
    Apply = 'Apply',
    Reduce = 'Reduce',
    MixedRadix = 'Mixed Radix',
    Bits = 'Bits',
    Trits = 'Trits'
  }
  function maxBinaryDigits(a: number, b: number): number {
    const absA = Math.abs(a);
    const absB = Math.abs(b);
    // Special case: 0 requires 1 digit
    const digitsA = absA === 0 ? 1 : Math.floor(Math.log2(absA)) + 1;
    const digitsB = absB === 0 ? 1 : Math.floor(Math.log2(absB)) + 1;
    return Math.max(digitsA, digitsB);
  }

function applyBitwise(
    x: number,
    y: number,
    op: (a: boolean, b: boolean) => boolean
): number {
    const nbdigits = maxBinaryDigits(x, y);
    const bx = Numbers.toBinary(x, nbdigits);
    const by = Numbers.toBinary(y, nbdigits);

    // Map -1/1 to true, 0 to false
    const boolx = bx.map(bit => bit !== 0);
    const booly = by.map(bit => bit !== 0);

    // Apply the boolean operation bitwise
    const resultBool = boolx.map((b, i) => op(b, booly[i]));

    // Map booleans back to 1 (true) and 0 (false)
    const resultBits = resultBool.map(b => b ? 1 : 0);
    
    let signX = Math.sign(x);
    signX = signX === 0 ? 1 :signX;

    let signY = Math.sign(y);
    signY = signY === 0 ? 1 :signY;

    // The sign is the product of the signs of x and y
    const sign = signX * signY;

    // Convert back to integer
    const result = sign*Numbers.fromBinary(resultBits);
    
    return result == -0 ? 0 : result;
  }

  /**
 * Shifts the bits of a number left or right using Numbers.toBinary and Numbers.fromBinary.
 * @param n The number to shift.
 * @param positions The number of positions to shift (positive = left, negative = right).
 * @returns The shifted number.
 */
function shift(n: number, positions: number): number {
    if (positions === 0) return n;
    if (positions > 0) {
        return n * Math.pow(2, positions);
    } else {
        // Arithmetic shift for negative numbers, logical for positive
        return n >= 0
            ? Math.floor(n / Math.pow(2, -positions))
            : -Math.floor(Math.abs(n) / Math.pow(2, -positions));
    }
}

  const ops = new Map<Operation, (x: number, y: number) => number>([
    [Operation.Add, (x, y) => x + y],
    [Operation.Subtract, (x, y) => x - y],
    [Operation.Multiply, (x, y) => x * y],
    [Operation.Divide, (x, y) => y !== 0 ? Math.floor(x / y) : 0],
    [Operation.X, (x, y) => x],
    [Operation.Y, (x, y) => y],
    [Operation.Power, (x, y) => Math.round(Math.pow(x, y))],
    [Operation.Log, (x, y) => y > 1 && x > 0 ? Math.floor(Math.log(x) / Math.log(y)) : 0],
    [Operation.Min, (x, y) => Math.min(x, y)],
    [Operation.Max, (x, y) => Math.max(x, y)],
    [Operation.Modulo, (x, y) => y !== 0 ? x % y : 0],
    [Operation.Bounce, (x, y) => {
      if (y === 0) return 0;
      const mod = x % (2 * y);
      return mod <= y ? mod : 2 * y - mod;
    }],
    [Operation.And, (x, y) => applyBitwise(x,y, (a,b) => a && b)],
    [Operation.Nand, (x, y) => applyBitwise(x,y, (a,b) => !(a && b))],
    [Operation.Or, (x, y) => applyBitwise(x,y, (a,b) => a || b)],
    [Operation.Nor, (x, y) => applyBitwise(x,y, (a,b) => !(a || b))],
    [Operation.Implication, (x, y) => applyBitwise(x,y, (a,b) => (!a) || b)],
    [Operation.ReverseImplication, (x, y) => applyBitwise(x,y, (a,b) => (!b) || a)],
    [Operation.Xor, (x, y) => applyBitwise(x,y, (a,b) => a !== b)],
    [Operation.Xnor, (x, y) => applyBitwise(x,y, (a,b) => a === b)],
    [Operation.ShiftBits, (x, y) => shift(x, y)],
    [Operation.LCM, (x, y) => Numbers.lcm(x, y)],
    [Operation.GCD, (x, y) => Numbers.gcd(x, y)],
    [Operation.Equal, (x, y) => (x === y ? 1 : 0)],
    [Operation.NotEqual, (x, y) => (x !== y ? 1 : 0)],
    [Operation.LessThan, (x, y) => (x < y ? 1 : 0)],
    [Operation.LessThanOrEqual, (x, y) => (x <= y ? 1 : 0)],
    [Operation.GreaterThan, (x, y) => (x > y ? 1 : 0)],
    [Operation.GreaterThanOrEqual, (x, y) => (x >= y ? 1 : 0)],
    [Operation.Binomial, (x, y) => Numbers.binomial(x,y)],
    [Operation.ExpandBits, (x, y) => Numbers.expandBits(x,y,'0')],
    [Operation.ExpandBitsFill, (x, y) => Numbers.expandBits(x,y,'bit')],
    [Operation.CantorIntervalBinaryNumber, (x,y) => Numbers.CantorIntervalBinaryNumber(x,y)],
    [Operation.PermuteBits, (x,y) => Numbers.permuteBits(x,y)],
    [Operation.MaxZeroX, (x,y) => Math.max(0, x)],
    [Operation.MinZeroX, (x,y) => Math.min(0, x)],
    [Operation.MaxZeroY, (x,y) => Math.max(0, y)],
    [Operation.MinZeroY, (x,y) => Math.min(0, y)],
    [Operation.HardThreshold, (x, y) => Math.abs(x) > Math.abs(y) ? 0 : x],
    [Operation.RandInt, (x,y) => {
        let a = Math.min(x,y);
        let b = Math.max(x,y);
        return Math.floor(a+(Math.random()*(b-a+1)));
    }],
  ]);
  
export class Sequence{
    private items: number[];

    constructor(...items: number[]) {
        this.items = items??[];
    }
    toString() {
        return this.toArray().join(' ');
    }
    add(item: number) {
        this.items.push(item);
    }

    size(): number {
        return this.items.length;
    }

    get(index: number): number | undefined {
        return this.items[index];
    }
    set(index: number, value:number): void {
        this.items[index] = value;
    }
    toArray(): number[] {
        return this.items;
    }
    // New signs method
    signs(): Sequence {
        const signArray = this.items.map(item => {
            if (item > 0) return 1;
            else if (item < 0) return -1;
            return 0;
        });
        return new Sequence(...signArray); // Create a new Sequence with sign values
    }
    isNatural(): boolean {
        return this.items.every(n => n >= 0);
    }
    difference(): Sequence {
        if (this.size() < 2) {
            throw new Error("Difference requires at least two elements.");
        }
        const output = this.items.slice(1).map((item, index) => item - this.items[index]);
        return new Sequence(...output);
    }

    cyclicalDifference(): Sequence {
        if (this.size() == 0) {
            return new Sequence();
        }
        if (this.size() == 1) {
            return new Sequence(...[0]);
        }
        const output = this.items.map((item, index) => {
            return this.items[(index + 1) % this.size()] - item;
        });
        return new Sequence(...output);
    }

    antidifference(k: number): Sequence {
        const output:number[] = new Array(this.size() + 1);
        output[0] = k;
        for (let i = 0; i < this.size(); i++) {
            output[i + 1] = output[i] + this.items[i];
        }
        return new Sequence(...output);
    }

    cyclicalAntidifference(k: number): Sequence {
        const output:number[] = new Array(this.size());
        output[this.size() - 1] = k;
        for (let i = 0; i < this.size(); i++) {
            output[i] = output[(i - 1 + this.size()) % this.size()] + this.items[(i - 1 + this.size()) % this.size()];
        }
        return new Sequence(...output);
    }
    getSymmetries(): number[] {
        const symmetries: number[] = [];
        const n = this.size();
        for (let i = 0; i < n * 2; i++) {
            let axis = Math.floor(i / 2);
            let found = true;
            if (i % 2 === 0) {
                for (let j = 0; j < 1 + Math.floor(n / 2); j++) {
                    if (this.get((axis + j) % n) !== this.get((n + axis - j) % n)) {
                        found = false;
                        break;
                    }
                }
            } else {
                for (let j = 0; j < 1 + Math.floor(n / 2); j++) {
                    if (this.get((axis + j + 1) % n) !== this.get((n + axis - j) % n)) {
                        found = false;
                        break;
                    }
                }
            }
            if (found) {
                symmetries.push(i / 2);
            }
        }
        return symmetries;
    }

    static parse(s: string): Sequence {
        const output = new Sequence();
        const trimmed = s.trim().replace(/[,]/g, "");
        let str0 = trimmed.startsWith('[') && trimmed.endsWith(']')
            ? trimmed.substring(1, trimmed.length - 1)
            : trimmed;
        const ss = str0.split(/\s+/);
        for (const i of ss) {
            if (i.trim() !== '') {
                output.add(parseInt(i.trim()));
            }
        }
        return output;
    }

    getMean(): number {
        return this.sum() / this.size();
    }

    sum(): number {
        return this.items.reduce((a, b) => a + b, 0);
    }

    getMin(): number {
        return Math.min(...this.items);
    }

    getMax(): number {
        return Math.max(...this.items);
    }

    rotate(n: number): Sequence {
        const rotatedItems = [...this.items.slice(-n), ...this.items.slice(0, -n)];
        const resultSeq = new Sequence();
        for (const item of rotatedItems) {
            resultSeq.add(item);
        }
        return resultSeq;
    }

    static fromArray(arr: number[]): Sequence {
        const seq = new Sequence();
        for (const item of arr) {
            seq.add(item);
        }
        return seq;
    }

    // Frequency map
    frequencyMap(): Map<number, number> {
        const freqMap = new Map<number, number>();
        for (const item of this.items) {
            freqMap.set(item, (freqMap.get(item) || 0) + 1);
        }
        return freqMap;
    }

    static genRnd(length: number, amp: number, sum: number, maxAmp: number, exclude0: boolean): Sequence {
        if (length <= 1 || amp < 1 || maxAmp < 2 || (exclude0 && maxAmp < 2) ||
            (Math.abs(sum) >= maxAmp)) {
            throw new Error("Invalid parameters for random sequence generation.");
        }

        const sequence = new Sequence();
        let currVal = sum;
        sequence.add(currVal);
        const possibleValues: number[] = [];

        while (sequence.size() < length) {
            possibleValues.length = 0;
            for (let i = -amp; i <= amp; i++) {
                if (Math.abs(currVal + i) < maxAmp && (i !== 0 || !exclude0)) {
                    possibleValues.push(i);
                }
            }
            if (possibleValues.length === 0) break;

            const randomIndex = Math.floor(Math.random() * possibleValues.length);
            currVal += possibleValues[randomIndex];
            sequence.add(currVal);
        }
        return sequence;
    }

    // Calculate interval vector for a specific condition
    private static calculateIntervalVector(n: number, conditionFn: (j: number) => boolean): Sequence {
        const m = Math.floor(n / 2);
        const result = new Sequence();

        for (let i = 1; i <= m; i++) {
            let count = 0;
            for (let j = 0; j < n; j++) {
                if (conditionFn(j) && conditionFn((i + j) % n)) {
                    count++;
                }
            }
            if (i === m && n % 2 === 0) {
                count = Math.floor(count / 2);
            }
            result.add(count);
        }
        return result;
    }

    // Calculate interval vector for a boolean array
    static calcIntervalVector(input: boolean[]): Sequence {
        const n = input.length;
        return this.calculateIntervalVector(n, (j: number) => input[j]);
    }

    // Calculate interval vector for a BitSet (presented as an array as TypeScript doesn't have BitSet)
    static calcIntervalVectorBitSet(input: boolean[], n: number): Sequence {
        return this.calculateIntervalVector(n, (j: number) => input[j]);
    }

    // For distinct values in a sequence input
    static calcIntervalVectorDistinct(sequence: Sequence): Map<number, Sequence> {
        const output = new Map<number, Sequence>();
        const distinctValues = new Set(sequence.toArray());

        for (const value of distinctValues) {
            const booleanArray = sequence.toArray().map(item => item === value);
            const intervalVector = this.calcIntervalVector(booleanArray);
            output.set(value, intervalVector);
        }
        return output;
    }

    // Alternative overload to handle Integer[] while avoiding code duplication
    static calcIntervalVectorInts(input: number[]): Map<number, Sequence> {
        const sequence = new Sequence(...input);
        return this.calcIntervalVectorDistinct(sequence);
    }

    static combine(combiner:Combiner, operation:Operation, x: Sequence, y: Sequence): Sequence {
        const o = new Sequence();
        const operationFn = ops.get(operation);
        const lcm = Numbers.lcm(x.size(),y.size());
        switch (combiner) {
          case Combiner.Apply:
            for (let i = 0; i < y.size(); i++) {    
              if (operationFn) {
                o.add(operationFn(x.get(y.get(i)! % x.size())!, y.get(i % y.size())!));
              }
            }
            break;
          case Combiner.LCM:
            for (let i = 0; i < lcm; i++) {    
              if (operationFn) {
                o.add(operationFn(x.get(i/(lcm/x.size())>>0)!, y.get(i/(lcm/y.size())>>0)!));
              }
            }
            break;
          case Combiner.Recycle:
            for (let i = 0; i < lcm; i++) {    
              if (operationFn) {
                o.add(operationFn(x.get(i%x.size())!, y.get(i%y.size())!));
              }
            }
            break;
          case Combiner.Product:
            for (let i = 0; i < x.size(); i++) {
              for (let j = 0; j < y.size(); j++) {   
                    if (operationFn) {
                        o.add(operationFn(x.get(i)!, y.get(j)!));
                    }
                }
            }
            break;
        case Combiner.NegativeProduct:
            for(let z=0;z<2;z++) {
                for (let i = 0; i < x.size(); i++) {
                    for (let j = 0; j < y.size(); j++) {
                        if(z==0) o.add(0);
                        else if (operationFn) {
                            o.set((((i*y.size())-(y.size()-1)+j)+o.size())%o.size(), operationFn(x.get(i)!, y.get(j)!));
                        }
                    }
                }
            }
            break;
          case Combiner.Convolution:
            for(let i=0;i<x.size();i++) o.add(0);
            for(let i=0; i<o.size(); i++) {
                for(let j=0; j<y.size(); j++) {
                    if(operationFn) {
                        let v = operationFn(x.get(i)!, y.get(j)!);
                        o.set((i+j) % o.size(), 
                        o.get((i+j) % o.size())! + v);
                    }
                }
            }
            break;
          case Combiner.Triangular:
            for (let i = 0; i < x.size(); i++) {
              for (let j = 0; j < y.size(); j++) {
                if (j<=i && operationFn) {
                  o.add(operationFn(x.get(i)!, y.get(j)!));
                }
              }
            }
            break;
          case Combiner.Reduce:
            for (let i = 0; i < x.size(); i++) {
              if (operationFn) {
                  o.add(y.toArray().reduce((a,b) => operationFn(a,b),x.get(i)!));
              }
            }
            break;
          case Combiner.MixedRadix:
            // This array will collect each combination (each row is an array of digits)
            const result: number[][] = [];
            
            // Initialize the current combination with zeros
            const current: number[] = new Array(x.size()).fill(0);
            
            while (true) {
              result.push([...current]);
              
              if (current.every((value, i) => Math.abs(value) === Math.abs(x.get(i)!) - 1)) {
                break;
              }
              
              for (let i = 0; i < x.size(); i++) {
                if(x.get(i) === 0) break;
                if (Math.abs(current[i]) < Math.abs(x.get(i)!) - 1) {
                  if(x.get(i)! < 0) current[i]--;
                  if(x.get(i)! > 0) current[i]++;
                  break;
                } else {
                  current[i] = 0;
                }
              }
            }
            
            if(operationFn) {
              const combined = result.map(row => 
                row.map((value, index) => operationFn(value, y.get(index%y.size())!)).reduce((a,b) => a+b,0)
              );
              for(let z of combined) o.add(z);
            }
            break;
        case Combiner.Bits:
            for(let i=0;i<x.size();i++) {
                let b = Numbers.toBinary(x.get(i)!,y.get(i%y.size())!);
                for(let j=0;j<b.length;j++) {
                    if (operationFn) {
                        o.add(operationFn(b[j], Math.pow(2, y.get(i%y.size())! < 0 ? j : b.length-1-j)));
                    }
                }
            }
            break;
        case Combiner.Trits:
            for(let i=0;i<x.size();i++) {
                let b = Numbers.toBalancedTernary(x.get(i)!,y.get(i%y.size())!);
                for(let j=0;j<b.length;j++) {
                    if (operationFn) {
                        o.add(operationFn(b[j], Math.pow(3, y.get(i)! < 0 ? j : b.length-1-j)));
                    }
                }
            }
            break;
        }
        return o;
      };
};