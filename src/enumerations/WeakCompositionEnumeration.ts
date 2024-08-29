import { AbstractEnumeration } from './AbstractEnumeration';
import { Combination } from 'objects/Combination';
import { CombinationEnumeration } from './CombinationEnumeration';

export class WeakCompositionEnumeration extends AbstractEnumeration<number[]> {
  
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
    const o:number[] = [];
    let cnt:number = 0;
    for(let j=0;j<c.size();j++) {
      if(c.get(j)) { // is a bar
        o.push(cnt);
        cnt=0;
      } else { // is a star
        cnt++;
      }
    }
    o.push(cnt);
    
    return o;

  }
}
