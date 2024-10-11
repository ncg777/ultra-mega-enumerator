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
});
