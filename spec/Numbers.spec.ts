import { Numbers } from './../src/Numbers';

describe('Numbers Class Tests', () => {
  
  test('Catalan Numbers', () => {
    const expectedCatalanValues = [1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862, 16796];
    
    for (let i = 0; i < expectedCatalanValues.length; i++) {
      expect(Numbers.catalan(i)).toBe(expectedCatalanValues[i]);
    }
  });

  test('Bell Numbers', () => {
    const expectedBellValues = [1, 1, 2, 5, 15, 52, 203, 877, 4140, 21147, 115975];
    
    for (let i = 0; i < expectedBellValues.length; i++) {
      expect(Numbers.bell(i)).toBe(expectedBellValues[i]);
    }
  });

  describe('Binomial coefficients', () => {
    
    test('valid inputs', () => {
        expect(Numbers.binomial(0, 0)).toBe(1); // Base case
        expect(Numbers.binomial(5, 0)).toBe(1);
        expect(Numbers.binomial(5, 1)).toBe(5);
        expect(Numbers.binomial(5, 2)).toBe(10);
        expect(Numbers.binomial(10, 5)).toBe(252);

        // Symmetry property: binomial(n, k) === binomial(n, n - k)
        expect(Numbers.binomial(10, 3)).toBe(Numbers.binomial(10, 7));
        expect(Numbers.binomial(20, 6)).toBe(Numbers.binomial(20, 14));
    });

    test('negative n throws error', () => {
        expect(() => {
            Numbers.binomial(-1, 1);
        }).toThrow("n must be non-negative.");
    });

    test('negative k throws error', () => {
        expect(() => {
            Numbers.binomial(5, -1);
        }).toThrow("k must be non-negative.");
    });

    test('k greater than n throws error', () => {
        expect(() => {
            Numbers.binomial(5, 6);
        }).toThrow("k cannot be greater than n.");
    });

    test('overflow throws error', () => {
        expect(() => {
            Numbers.binomial(100, 50); // This should cause overflow
        }).toThrow("Overflow detected.");
    });
  });
  describe('Numbers Class Tests', () => {
    describe('Balanced Ternary Conversion', () => {
      test('toBalancedTernary converts correctly', () => {
        expect(Numbers.toBalancedTernary(0, 3)).toEqual([0, 0, 0]);
        expect(Numbers.toBalancedTernary(1, 1)).toEqual([1]);
        expect(Numbers.toBalancedTernary(1, -3)).toEqual([1, 0, 0]);
        expect(Numbers.toBalancedTernary(5, 3)).toEqual([1,-1, -1]);
        expect(Numbers.toBalancedTernary(5, -3)).toEqual([-1, -1, 1]);
      });
  
      test('fromBalancedTernary converts correctly', () => {
        expect(Numbers.fromBalancedTernary([1, 0, 1])).toBe(10);
        expect(Numbers.fromBalancedTernary([0, 1, 1])).toBe(4);
        expect(Numbers.fromBalancedTernary([0, 0, 0])).toBe(0);
        expect(Numbers.fromBalancedTernary([0, -1, -1])).toBe(-4);
        expect(Numbers.fromBalancedTernary([1, 0])).toBe(3);
        expect(Numbers.fromBalancedTernary([0, 1, 0, 1, 0])).toBe(30);
      });
    });
  
    describe('Binary Conversion', () => {
      test('toBinary converts correctly', () => {
        expect(Numbers.toBinary(10, 4)).toEqual([1, 0, 1, 0]);
        expect(Numbers.toBinary(5, 5)).toEqual([0, 0, 1, 0, 1]);
        expect(Numbers.toBinary(-5, 5)).toEqual([0, 0, -1, 0, -1]);
        expect(Numbers.toBinary(0, 3)).toEqual([0, 0, 0]);
        expect(Numbers.toBinary(0, 1)).toEqual([0]);
        expect(Numbers.toBinary(-1, 1)).toEqual([-1]);
      });
  
      test('fromBinary converts correctly', () => {
        expect(Numbers.fromBinary([0, 1, 0, 1])).toBe(5); // binary 0101
        expect(Numbers.fromBinary([1, 0, 1, 0])).toBe(10); // binary 1010
        expect(Numbers.fromBinary([0, 0, 0, 0])).toBe(0); // binary 0000
      });
    });
  });
  describe('Unary Tritwise Operations', () => {
    test('tritBuf identity', () => {
      expect(Numbers.tritBuf(-1)).toBe(-1);
      expect(Numbers.tritBuf(0)).toBe(0);
      expect(Numbers.tritBuf(1)).toBe(1);
    });

    test('tritNot negation', () => {
      expect(Numbers.tritNot(-1)).toBe(1);
      expect(Numbers.tritNot(0)).toBe(0);
      expect(Numbers.tritNot(1)).toBe(-1);
    });

    test('tritNot on multi-trit number', () => {
      // 5 in balanced ternary (3 digits): [1, -1, -1]
      // NOT applied: [-1, 1, 1] = -9+3+1 = -5
      expect(Numbers.tritNot(5)).toBe(-5);
    });

    test('tritAbs on single trits', () => {
      expect(Numbers.tritAbs(-1)).toBe(1);
      expect(Numbers.tritAbs(0)).toBe(0);
      expect(Numbers.tritAbs(1)).toBe(1);
    });

    test('tritAbs on multi-trit number', () => {
      // -5 in balanced ternary: [-1, 1, 1]
      // ABS: [1, 1, 1] = 9+3+1 = 13
      expect(Numbers.tritAbs(-5)).toBe(13);
    });

    test('tritInc on single trits', () => {
      expect(Numbers.tritInc(-1)).toBe(0);
      expect(Numbers.tritInc(0)).toBe(1);
      expect(Numbers.tritInc(1)).toBe(1);
    });

    test('tritDec on single trits', () => {
      expect(Numbers.tritDec(-1)).toBe(-1);
      expect(Numbers.tritDec(0)).toBe(-1);
      expect(Numbers.tritDec(1)).toBe(0);
    });

    test('tritIsp identifies positive trits', () => {
      expect(Numbers.tritIsp(-1)).toBe(-1);
      expect(Numbers.tritIsp(0)).toBe(-1);
      expect(Numbers.tritIsp(1)).toBe(1);
    });

    test('tritIsz identifies zero trits', () => {
      expect(Numbers.tritIsz(-1)).toBe(-1);
      expect(Numbers.tritIsz(0)).toBe(1);
      expect(Numbers.tritIsz(1)).toBe(-1);
    });

    test('tritIsn identifies negative trits', () => {
      expect(Numbers.tritIsn(-1)).toBe(1);
      expect(Numbers.tritIsn(0)).toBe(-1);
      expect(Numbers.tritIsn(1)).toBe(-1);
    });

    test('tritClu clamp up', () => {
      expect(Numbers.tritClu(-1)).toBe(0);
      expect(Numbers.tritClu(0)).toBe(0);
      expect(Numbers.tritClu(1)).toBe(1);
    });

    test('tritCld clamp down', () => {
      expect(Numbers.tritCld(-1)).toBe(-1);
      expect(Numbers.tritCld(0)).toBe(0);
      expect(Numbers.tritCld(1)).toBe(0);
    });

    test('tritRtu rotate up', () => {
      expect(Numbers.tritRtu(-1)).toBe(0);
      expect(Numbers.tritRtu(0)).toBe(1);
      expect(Numbers.tritRtu(1)).toBe(-1);
    });

    test('tritRtd rotate down', () => {
      expect(Numbers.tritRtd(-1)).toBe(1);
      expect(Numbers.tritRtd(0)).toBe(-1);
      expect(Numbers.tritRtd(1)).toBe(0);
    });

    test('tritPnot positive not', () => {
      expect(Numbers.tritPnot(-1)).toBe(1);
      expect(Numbers.tritPnot(0)).toBe(1);
      expect(Numbers.tritPnot(1)).toBe(-1);
    });

    test('tritNnot negative not', () => {
      expect(Numbers.tritNnot(-1)).toBe(1);
      expect(Numbers.tritNnot(0)).toBe(-1);
      expect(Numbers.tritNnot(1)).toBe(-1);
    });
  });
  describe('Permutation Numbering', () => {
    test('base case: [0] -> 0', () => {
      expect(Numbers.getPermutationNumber([0])).toBe(0);
    });

    test('known small exact cases', () => {
      expect(Numbers.getPermutationNumber([1, 0])).toBe(1);
      expect(Numbers.getPermutationNumber([0, 1])).toBe(-1);
      expect(Numbers.getPermutationNumber([1, 2, 0])).toBe(3);
      expect(Numbers.getPermutationNumber([2, 1, 0])).toBe(5);
      expect(Numbers.getPermutationNumber([0, 2, 1])).toBe(-3);
      expect(Numbers.getPermutationNumber([0, 1, 2])).toBe(-5);
      expect(Numbers.getPermutationNumber([3, 2, 1, 0])).toBe(23);
      expect(Numbers.getPermutationNumber([0, 1, 2, 3])).toBe(-23);
    });

    test('round-trip: getPermutationNumber(getPermutation(n)) === n', () => {
      const testValues = [0, 1, -1, 3, -3, 5, -5, 23, -23];
      for (const n of testValues) {
        const perm = Numbers.getPermutation(n);
        expect(Numbers.getPermutationNumber(perm)).toBe(n);
      }
    });

    test('round-trip: getPermutation(getPermutationNumber(p)) deep-equals p', () => {
      const perms = [
        [0],
        [1, 0],
        [0, 1],
        [1, 2, 0],
        [2, 1, 0],
        [0, 2, 1],
        [0, 1, 2],
        [3, 2, 1, 0],
        [0, 1, 2, 3],
      ];
      for (const p of perms) {
        const n = Numbers.getPermutationNumber(p);
        expect(Numbers.getPermutation(n)).toEqual(p);
      }
    });

    test('throws on null input', () => {
      expect(() => Numbers.getPermutationNumber(null as unknown as number[])).toThrow(
        'getPermutationNumber: input cannot be null or undefined'
      );
    });

    test('throws on undefined input', () => {
      expect(() => Numbers.getPermutationNumber(undefined as unknown as number[])).toThrow(
        'getPermutationNumber: input cannot be null or undefined'
      );
    });

    test('throws on empty array', () => {
      expect(() => Numbers.getPermutationNumber([])).toThrow(
        'getPermutationNumber: permutation cannot be empty'
      );
    });

    test('throws on non-integer elements', () => {
      expect(() => Numbers.getPermutationNumber([0.5, 1])).toThrow(
        'getPermutationNumber: element 0.5 is not an integer'
      );
    });

    test('throws on duplicate elements', () => {
      expect(() => Numbers.getPermutationNumber([0, 0])).toThrow(
        'getPermutationNumber: duplicate element 0'
      );
    });

    test('throws on values out of range (too large)', () => {
      expect(() => Numbers.getPermutationNumber([0, 2])).toThrow(
        'getPermutationNumber: element 2 is out of range'
      );
    });

    test('throws on values out of range (negative)', () => {
      expect(() => Numbers.getPermutationNumber([-1, 0, 1])).toThrow(
        'getPermutationNumber: element -1 is out of range'
      );
    });

    test('throws on missing values in [0..m-1]', () => {
      expect(() => Numbers.getPermutationNumber([1, 2])).toThrow(
        'getPermutationNumber: element 2 is out of range'
      );
    });
  });

  describe('getPermutationOrbitNumbers', () => {
    test('identity permutation returns single-element orbit', () => {
      const id = [0];
      expect(Numbers.getPermutationOrbitNumbers(id)).toEqual([Numbers.getPermutationNumber(id)]);
    });

    test('identity permutation of size 3 returns single-element orbit', () => {
      const id = [0, 1, 2];
      expect(Numbers.getPermutationOrbitNumbers(id)).toEqual([Numbers.getPermutationNumber(id)]);
    });

    test('transposition [1,0] has orbit of length 2', () => {
      const p = [1, 0];
      const orbit = Numbers.getPermutationOrbitNumbers(p);
      expect(orbit.length).toBe(2);
      expect(orbit[0]).toBe(Numbers.getPermutationNumber([1, 0]));
      expect(orbit[orbit.length - 1]).toBe(Numbers.getPermutationNumber([0, 1]));
    });

    test('3-cycle [1,2,0] has orbit of length 3', () => {
      const p = [1, 2, 0];
      const orbit = Numbers.getPermutationOrbitNumbers(p);
      expect(orbit.length).toBe(3);
      expect(orbit[0]).toBe(Numbers.getPermutationNumber([1, 2, 0]));
      expect(orbit[orbit.length - 1]).toBe(Numbers.getPermutationNumber([0, 1, 2]));
    });

    test('first output equals rank of input permutation', () => {
      const p = [2, 0, 1];
      const orbit = Numbers.getPermutationOrbitNumbers(p);
      expect(orbit[0]).toBe(Numbers.getPermutationNumber(p));
    });

    test('last output is always rank of identity', () => {
      for (const p of [[1, 0], [1, 2, 0], [2, 0, 1], [3, 2, 1, 0]]) {
        const orbit = Numbers.getPermutationOrbitNumbers(p);
        const id = Array.from({ length: p.length }, (_, i) => i);
        expect(orbit[orbit.length - 1]).toBe(Numbers.getPermutationNumber(id));
      }
    });

    test('rank/unrank consistency: getPermutation(r) matches orbit element', () => {
      const p = [1, 2, 0];
      const expectedPerms = [[1, 2, 0], [2, 0, 1], [0, 1, 2]];
      const orbit = Numbers.getPermutationOrbitNumbers(p);
      for (let i = 0; i < orbit.length; i++) {
        expect(Numbers.getPermutation(orbit[i])).toEqual(expectedPerms[i]);
      }
    });

    test('orbit of [3,2,1,0] has length 2 (self-inverse)', () => {
      const p = [3, 2, 1, 0];
      const orbit = Numbers.getPermutationOrbitNumbers(p);
      expect(orbit.length).toBe(2);
      expect(orbit[0]).toBe(Numbers.getPermutationNumber([3, 2, 1, 0]));
      expect(orbit[1]).toBe(Numbers.getPermutationNumber([0, 1, 2, 3]));
    });

    test('throws on duplicate elements', () => {
      expect(() => Numbers.getPermutationOrbitNumbers([0, 0])).toThrow(
        'getPermutationNumber: duplicate element 0'
      );
    });

    test('throws on out-of-range entries (too large)', () => {
      expect(() => Numbers.getPermutationOrbitNumbers([0, 2])).toThrow(
        'getPermutationNumber: element 2 is out of range'
      );
    });

    test('throws on negative values', () => {
      expect(() => Numbers.getPermutationOrbitNumbers([-1, 0, 1])).toThrow(
        'getPermutationNumber: element -1 is out of range'
      );
    });

    test('throws on non-integer elements', () => {
      expect(() => Numbers.getPermutationOrbitNumbers([0.5, 1])).toThrow(
        'getPermutationNumber: element 0.5 is not an integer'
      );
    });

    test('throws on null input', () => {
      expect(() => Numbers.getPermutationOrbitNumbers(null as unknown as number[])).toThrow(
        'getPermutationNumber: input cannot be null or undefined'
      );
    });

    test('throws on empty array', () => {
      expect(() => Numbers.getPermutationOrbitNumbers([])).toThrow(
        'getPermutationNumber: permutation cannot be empty'
      );
    });
  });

  describe('Bit Permutations', () => {
    test('permuteBits is deterministic', () => {
      const values = [0, 1, -1, 40, -40, 12345, -12345];
      const seeds = [0, 1, 2, 11, 42, 123456789];

      for (const a of values) {
        for (const b of seeds) {
          expect(Numbers.permuteBits(a, b)).toBe(Numbers.permuteBits(a, b));
        }
      }
    });

    test('permuteBits uses getPermutation directly', () => {
      const a = 12345;
      const b = 42;
      const perm = Numbers.getPermutation(b);

      const bitCount = Math.floor(Math.log2(Math.abs(a))) + 1;
      const ndigits = Math.max(perm.length, bitCount);
      const bits = Numbers.toBinary(a, ndigits);

      // The least-significant `perm.length` bits are permuted; higher bits stay.
      const expectedBits = [...bits];
      for (let i = 0; i < perm.length; i++) {
        expectedBits[ndigits - 1 - perm[i]] = bits[ndigits - 1 - i];
      }
      const expected = Numbers.fromBinary(expectedBits);

      expect(Numbers.permuteBits(a, b)).toBe(expected);
    });

    test('permuteBits preserves the high bits outside the permuted range', () => {
      const a = 12345;
      const b = 2; // small permutation -> only the low bits are permuted
      const perm = Numbers.getPermutation(b);

      const bitCount = Math.floor(Math.log2(Math.abs(a))) + 1;
      const ndigits = Math.max(perm.length, bitCount);
      const bits = Numbers.toBinary(a, ndigits);
      const resultBits = Numbers.toBinary(Numbers.permuteBits(a, b), ndigits);

      // High bits are the leading (big-endian) positions.
      for (let i = 0; i < ndigits - perm.length; i++) {
        expect(resultBits[i]).toBe(bits[i]);
      }
    });

    test('permuteBits orbits back to the original value', () => {
      const cases = [
        { a: 10, b: 4 },
        { a: 10, b: 5 },
        { a: 10, b: 7 },
        { a: 42, b: 4 },
        { a: 255, b: 3 },
        { a: 1000, b: 11 },
        { a: -10, b: 4 },
        { a: -42, b: 7 },
      ];

      for (const { a, b } of cases) {
        let current = Numbers.permuteBits(a, b);
        let steps = 1;
        const maxSteps = 10000;
        while (current !== a && steps < maxSteps) {
          current = Numbers.permuteBits(current, b);
          steps++;
        }
        expect(current).toBe(a);
      }
    });

    test('permuteBits with identity permutation returns the input', () => {
      // getPermutation(0) === [0], a single-element identity permutation.
      const values = [0, 1, -1, 7, -7, 12345, -12345];
      for (const a of values) {
        expect(Numbers.permuteBits(a, 0)).toBe(a);
      }
    });
  });

  describe('Trit Permutations', () => {
    test('permuteTrits is deterministic', () => {
      const values = [0, 1, -1, 40, -40, 12345, -12345];
      const seeds = [0, 1, 2, 11, 42, 123456789];

      for (const a of values) {
        for (const b of seeds) {
          expect(Numbers.permuteTrits(a, b)).toBe(Numbers.permuteTrits(a, b));
        }
      }
    });

    test('permuteTrits uses getPermutation directly', () => {
      const a = 12345;
      const b = 42;
      const perm = Numbers.getPermutation(b);

      const tritCount = Math.ceil(Math.log(2 * Math.abs(a) + 1) / Math.log(3));
      const ndigits = Math.max(perm.length, tritCount);
      const trits = Numbers.toBalancedTernary(a, ndigits);

      // The least-significant `perm.length` trits are permuted; higher trits stay.
      const expectedTrits = [...trits];
      for (let i = 0; i < perm.length; i++) {
        expectedTrits[ndigits - 1 - perm[i]] = trits[ndigits - 1 - i];
      }
      const expected = Numbers.fromBalancedTernary(expectedTrits);

      expect(Numbers.permuteTrits(a, b)).toBe(expected);
    });

    test('permuteTrits preserves the high trits outside the permuted range', () => {
      const a = 12345;
      const b = 2; // small permutation -> only the low trits are permuted
      const perm = Numbers.getPermutation(b);

      const tritCount = Math.ceil(Math.log(2 * Math.abs(a) + 1) / Math.log(3));
      const ndigits = Math.max(perm.length, tritCount);
      const trits = Numbers.toBalancedTernary(a, ndigits);
      const resultTrits = Numbers.toBalancedTernary(Numbers.permuteTrits(a, b), ndigits);

      // High trits are the leading (big-endian) positions.
      for (let i = 0; i < ndigits - perm.length; i++) {
        expect(resultTrits[i]).toBe(trits[i]);
      }
    });

    test('permuteTrits orbits back to the original value', () => {
      const cases = [
        { a: 10, b: 4 },
        { a: 10, b: 5 },
        { a: 10, b: 7 },
        { a: 42, b: 4 },
        { a: 242, b: 3 },
        { a: 1000, b: 11 },
        { a: -10, b: 4 },
        { a: -42, b: 7 },
      ];

      for (const { a, b } of cases) {
        let current = Numbers.permuteTrits(a, b);
        let steps = 1;
        const maxSteps = 10000;
        while (current !== a && steps < maxSteps) {
          current = Numbers.permuteTrits(current, b);
          steps++;
        }
        expect(current).toBe(a);
      }
    });

    test('permuteTrits orbits back for a broad sweep of values', () => {
      // Exercises both fully-permuted values (tritCount <= perm.length) and
      // values with preserved high trits (tritCount > perm.length).
      const seeds = [3, 4, 5, 6, 7, 11, 23, 42];
      const maxSteps = 10000;

      for (const b of seeds) {
        for (let a = -200; a <= 200; a++) {
          let current = Numbers.permuteTrits(a, b);
          let steps = 1;
          while (current !== a && steps < maxSteps) {
            current = Numbers.permuteTrits(current, b);
            steps++;
          }
          expect(current).toBe(a);
        }
      }
    });

    test('permuteTrits with identity permutation returns the input', () => {
      // getPermutation(0) === [0], a single-element identity permutation.
      const values = [0, 1, -1, 7, -7, 12345, -12345];
      for (const a of values) {
        expect(Numbers.permuteTrits(a, 0)).toBe(a);
      }
    });
  });
});
