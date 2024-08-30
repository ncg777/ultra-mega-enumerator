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
});
