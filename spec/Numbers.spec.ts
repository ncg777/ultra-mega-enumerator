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
});
