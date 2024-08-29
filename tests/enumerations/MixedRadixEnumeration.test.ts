import { expect } from 'chai';
import { MixedRadixEnumeration } from './../../src/enumerations/MixedRadixEnumeration';

describe('MixedRadixEnumeration', () => {
  it('should throw an error when initialized with a non-positive base', () => {
    expect(() => new MixedRadixEnumeration([2, 0])).to.Throw(
      'MixedRadixEnumeration - non-positive base'
    );
    expect(() => new MixedRadixEnumeration([-1, 5])).to.Throw(
      'MixedRadixEnumeration - non-positive base'
    );
  });

  it('should initialize correctly with a valid base', () => {
    const enumeration = new MixedRadixEnumeration([2, 3]);
    expect(enumeration.hasMoreElements()).to.eq(true);
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
      expect(mre.nextElement()).to.deep.equal(expectedResults[i++]);
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
      expect(mre.nextElement()).to.deep.equal(expectedResults[i++]);
    }

    // Adjust expectedResults based on the calculation.
    expect(i).to.eq(expectedResults.length); // Check if it has correct length
  
  });

  it('should throw an error when trying to get next element without more elements', () => {
    const enumeration = new MixedRadixEnumeration([1]);
    enumeration.nextElement(); // Consume the only element.
    expect(() => enumeration.nextElement()).to.Throw('No such element');
  });
});
