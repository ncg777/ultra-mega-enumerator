import { Enumeration } from './../interfaces/Enumeration';
import { Combination } from './../utils/Combination';
import { BitSet } from './../utils/BitSet';
import { CombinationEnumeration } from './CombinationEnumeration';

export class NBallsInKUrnsEnumeration implements Enumeration<number[]> {
  
  private ce: CombinationEnumeration;
  
  constructor(n: number, k: number) {
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
    const s: number[] = c.asSequence();
    s.unshift(-1);
    s.push(c.getN() + c.getK() - 2);
    
    const o: number[] = new Array(c.getK() + 1);
    
    for (let i = 1; i < s.length; i++) {
      o[i - 1] = s[i] - s[i - 1] - 1;
    }
    return o;
  }
}
