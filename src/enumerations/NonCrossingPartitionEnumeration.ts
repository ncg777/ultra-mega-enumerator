import { Enumeration } from './../utils/Enumeration';
import { DyckWordEnumeration } from './DyckWordEnumeration';

export class NonCrossingPartitionEnumeration extends Enumeration<number[]> {
  private readonly dwe: DyckWordEnumeration;

  public constructor(n: number) {
    super();
    this.dwe = new DyckWordEnumeration(n);
  }

  public hasMoreElements(): boolean {
    return this.dwe.hasMoreElements();
  }

  public nextElement(): number[] {
    if (!this.hasMoreElements()) {
      throw new Error("No such element");
    }
    return this.dyckToPartition(this.dwe.nextElement());
  }

  private dyckToPartition(s: string): number[] {
    const n = s.length / 2;

    const stack: number[] = [];
    const matchingClose: Map<number, number> = new Map();
    const closeLabel: Map<number, number> = new Map();
    let rising = true;
    let k = 0;

    for (let i = 0; i < 2 * n; i++) {
      if (s.charAt(i) === '(') {
        stack.push(i);
        rising = true;
      } else {
        const match = stack.pop()!;
        matchingClose.set(match, i);
        if (rising) {
          rising = false;
          k++;
        }
        closeLabel.set(i, k - 1);
      }
    }

    const o: number[] = new Array(n);
    let j = 0;

    for (let i = 0; i < 2 * n; i++) {
      if (s.charAt(i) === '(') {
        o[j++] = closeLabel.get(matchingClose.get(i)!)!;
      }
    }
    return o;
  }
}
