import { AbstractEnumeration } from './AbstractEnumeration';
import { Combination } from './../objects/Combination'

export class CombinationEnumeration extends AbstractEnumeration<Combination> {
  private current: Combination | null;

  constructor(n: number, k: number) {
    super();
    this.current = CombinationEnumeration.first(n, k);
  }

  private static first(n: number, k: number): Combination|null {
    if(k>n || n <0 || k<0){return null;}
    const combination = new Combination(n);
    for (let i = 0; i < k; i++) {
      combination.set(i, true);
    }
    return combination;
  }

  private static next(c: Combination): Combination | null {
    const n = c.size();

    let newCombination: Combination | null = null;

    let j = -1;
    for (let i = 0; i < n - 1; i++) {
      if (c.get(i) && !c.get(i + 1)) {
        j = i;
        break;
      }
    }
    if (j !== -1) {
      newCombination = new Combination(c.size());
      for (let i = 0; i < n; i++) {
        newCombination.set(i, c.get(i));
      }
      newCombination.set(j, false);
      newCombination.set(j + 1, true);
      let s = -1;
      for (let i = 0; i < j; i++) {
        if (!newCombination.get(i)) {
          s = i;
          break;
        }
      }

      for (let i = j; i >= 0; i--) {
        if (newCombination.get(i) && s !== -1 && s < i) {
          newCombination.set(i, false);
          newCombination.set(s, true);
          while (s < j && newCombination.get(s)) {
            s++;
          }
        }
      }
    }
    return newCombination;
  }

  hasMoreElements(): boolean {
    return this.current !== null;
  }

  nextElement(): Combination {
    if (this.current === null) {
      throw new Error("No such element");
    }
    
    const currentValue = this.current;
    this.current = CombinationEnumeration.next(currentValue);
    return currentValue;
  }
}
