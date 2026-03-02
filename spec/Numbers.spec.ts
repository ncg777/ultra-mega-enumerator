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
});
