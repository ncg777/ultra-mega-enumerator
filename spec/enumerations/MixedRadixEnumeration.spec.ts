import { MixedRadixEnumeration } from '../../src/enumerations/MixedRadixEnumeration';

describe('MixedRadixEnumeration', () => {
  it('should throw an error when initialized with a non-positive base', () => {
    expect(() => new MixedRadixEnumeration([2, 0])).toThrow(
      'MixedRadixEnumeration - non-positive base'
    );
    expect(() => new MixedRadixEnumeration([-1, 5])).toThrow(
      'MixedRadixEnumeration - non-positive base'
    );
  });

  it('should initialize correctly with a valid base', () => {
    const enumeration = new MixedRadixEnumeration([2, 3]);
    expect(enumeration.hasMoreElements()).toEqual(true);
  });

  it('should enumerate through all combinations', () => {
    const mre = new MixedRadixEnumeration([2, 2]);
    const expectedResults = [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1]
    ];
    let i=0;

    while(mre.hasMoreElements()){
      expect(mre.nextElement()).toEqual(expectedResults[i++]);
    }    
  });

  it('should handle larger bases', () => {
    const mre = new MixedRadixEnumeration([2, 3, 4]);
    const expectedResults = [
        [0, 0, 0],
        [1, 0, 0],
        [0, 1, 0],
        [1, 1, 0],
        [0, 2, 0],
        [1, 2, 0],
        [0, 0, 1],
        [1, 0, 1],
        [0, 1, 1],
        [1, 1, 1],
        [0, 2, 1],
        [1, 2, 1],
        [0, 0, 2],
        [1, 0, 2],
        [0, 1, 2],
        [1, 1, 2],
        [0, 2, 2],
        [1, 2, 2],
        [0, 0, 3],
        [1, 0, 3],
        [0, 1, 3],
        [1, 1, 3],
        [0, 2, 3],
        [1, 2, 3]
    ];

    let i=0;

    while(mre.hasMoreElements()){
      expect(mre.nextElement()).toEqual(expectedResults[i++]);
    }

    // Adjust expectedResults based on the calculation.
    expect(i).toEqual(expectedResults.length);
  
  });

  it('should throw an error when trying to get next element without more elements', () => {
    const enumeration = new MixedRadixEnumeration([1]);
    enumeration.nextElement(); // Consume the only element.
    expect(() => enumeration.nextElement()).toThrow('No such element');
  });
});
