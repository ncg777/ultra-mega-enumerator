export class Numbers {
  static divides(k: number, n: number): boolean {
      return n % k === 0;
  }

  static factors(n: number): Set<number> {
      if (n < 1) throw new Error("factors:: invalid n");
      const factorsSet = new Set<number>();
      factorsSet.add(1);
      factorsSet.add(n);
      const u = Math.floor(Math.sqrt(n));
      for (let i = 2; i <= u; i++) {
          if (this.divides(i, n)) {
              factorsSet.add(i);
              factorsSet.add(n / i);
          }
      }
      return factorsSet;
  }

  static isPowerOfTwo(n: number): boolean {
      return Math.round(Math.pow(2.0, Math.round(Math.log(n) / Math.log(2.0)))) === n;
  }

  static minDistMod12(a: number, b: number): number {
      let d1 = a - b;
      if (d1 < 0) d1 += 12;
      let d2 = b - a;
      if (d2 < 0) d2 += 12;
      return Math.min(d1, d2);
  }

  static correctMod(a: number, b: number): number {
      if (b < 0) throw new Error("Number.CorrectMod: invalid parameters.");
      if (a >= 0) return a % b;
    
      let a0 = a;
      while (a0 < 0) a0 += b;
      return a0 % b;
  }

  static prime(n0: number): boolean {
      const n = Math.abs(n0);
      if (n < 2) {
          return false;
      }
      const s = Math.floor(Math.sqrt(n));
      for (let i = 2; i <= s; i++) {
          if (n % i === 0) {
              return false;
          }
      }
      return true;
  }

  static primeFactorization(n0: number): [number[], number[]] {
      const tm: Map<number, number> = new Map<number, number>();
      let t = Math.abs(n0);
      if (t < 2) {
          throw new Error("primeFactorization: |n| < 2");
      }
      let p = 2;

      while (t !== 1) {
          if (t % p === 0) {
              if (!tm.has(p)) {
                  tm.set(p, 0);
              }
              tm.set(p, tm.get(p)! + 1);
              t = Math.floor(t / p);
          } else {
              do {
                  p++;
              } while (!this.prime(p));
          }
      }

      const keys = Array.from(tm.keys());
      const values = Array.from(tm.values());
      return [keys, values];
  }

  static totient(n: number): number {
      const [primes, counts] = this.primeFactorization(n);
      let d = n;
      const k = primes.length;

      for (let i = 0; i < k; i++) {
          d *= (1 - (1 / primes[i]));
      }

      return Math.round(d);
  }

  static gcd(a0: number, b0: number): number {
      let a = a0;
      let b = b0;
      let t = 0;
      while (b !== 0) {
          t = b;
          b = a % b;
          a = t;
      }
      return a;
  }

  static lcm(a: number, b: number): number {
      return (a * b) / this.gcd(a, b);
  }

  static catalan(n: number): number {
    if (n < 0) {
        throw new Error("n must be non-negative.");
    }

    let result = 1;

    for (let i = 0; i < n; i++) {
        // Calculate the next value in the sequence
        const next = (result * 2 * (2 * i + 1)) / (i + 2);

        // Check for overflow
        if (next > Number.MAX_SAFE_INTEGER) {
            throw new Error("Overflow detected.");
        }

        result = next;
    }

    return result;
  }

  static bell(n: number): number {
      const bellTriangle: number[][] = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));
    
      // Initialize the first row
      bellTriangle[0][0] = 1;

      // Build the Bell triangle
      for (let i = 1; i <= n; i++) {
          // Start the row with the rightmost element from the previous row
          bellTriangle[i][0] = bellTriangle[i - 1][i - 1];

          // Calculate the rest of the row
          for (let j = 1; j <= i; j++) {
            bellTriangle[i][j] = bellTriangle[i][j - 1] + bellTriangle[i - 1][j - 1];
          }
      }

      // The Bell number is the leftmost element of the last row
      return bellTriangle[n][0];
  }

  static binomial(n: number, k: number): number {
    if (n < 0) {
        throw new Error("n must be non-negative.");
    }
    if (k < 0) {
        throw new Error("k must be non-negative.");
    }
    if (k > n) {
        throw new Error("k cannot be greater than n.");
    }

    if (k > n - k) {
        k = n - k;
    }

    let result = 1;

    for (let i = 0; i < k; i++) {
        // Calculate the next value
        const next = (result * (n - i)) / (i + 1);

        // Check for overflow
        if (next > Number.MAX_SAFE_INTEGER) {
            throw new Error("Overflow detected.");
        }

        result = next;
    }

    return result;
  }

  static multinomial(n: number[]): number {
      if (n === null) {
          throw new Error("Input cannot be null");
      }

      let sum = 0;
      for (let value of n) {
          if (value < 0) {
              throw new Error("All elements must be non-negative");
          }
          sum += value;
      }

      let nf = this.factorial(sum);
      for (let value of n) {
          nf = nf / this.factorial(value);
      }

      return nf;
  }

  static factorial(n: number): number {
      if (n < 0) {
          throw new Error("Invalid input: n cannot be negative.");
      }
      let o = 1;
      for (let i = 2; i <= n; i++) {
          o *= i;
      }
      return o;
  }

  static triangularNumber(n: number): number {
      return this.binomial(n + 1, 2);
  }

  static reverseTriangularNumber(n: number): number {
      return Math.floor((Math.sqrt(1 + 8 * n) - 1) / 2);
  }
}


