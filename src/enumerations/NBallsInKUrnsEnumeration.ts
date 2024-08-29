import { Enumeration } from 'utils/Enumeration';
import { Combination } from 'objects/Combination';
import { BitSet } from '../objects/BitSet';
import { CombinationEnumeration } from './CombinationEnumeration';

export class NBallsInKUrnsEnumeration extends Enumeration<number[]> {
  
  private ce: CombinationEnumeration;
  
  constructor(n: number, k: number) {
    super();
    this.ce = new CombinationEnumeration(n + k - 1, k - 1);
  }
  
  hasMoreElements(): boolean {
    return this.ce.hasMoreElements();
  }

  nextElement(): number[] {
    if (!this.hasMoreElements()) {
      throw new Error("No such element");
    }
    return this.convertCombination(this.ce.nextElement());
  }
  
  private convertCombination(c: Combination): number[] {
    const s: number[] = c.getCombinationAsSequence();
    s.unshift(-1);
    s.push(c.size() + c.cardinality() - 2);
    
    const o: number[] = new Array(c.cardinality() + 1);
    
    for (let i = 1; i < s.length; i++) {
      o[i - 1] = s[i] - s[i - 1] - 1;
    }
    return o;
  }
}
