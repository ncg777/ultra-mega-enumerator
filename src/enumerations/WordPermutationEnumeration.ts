import { Enumeration } from 'utils/Enumeration';
import { Combination } from 'objects/Combination'; // Assuming the Combination class is defined in Combination.ts
import { MixedRadixEnumeration } from './MixedRadixEnumeration'; // Assuming the MixedRadixEnumeration class is defined in MixedRadixEnumeration.ts';

export class WordPermutationEnumeration extends Enumeration<number[]> {
  private nonzeroIndices: number[];
  private combis: Combination[][];
  private it: MixedRadixEnumeration;
  private n: number;

  /**
   * For example, to enumerate the permutations of MISSISSIPPI, 
   * 
   * rk would be {1,4,4,2} because it has 1 M, 4 Is, 4 Ss, and 2 Ps.
   * 
   * In the enumerated arrays, the 0s represent the M, the 1s the I,
   * the 2s the S and the 3 the Ps.
   * 
   * @param rk Integer[]
   */
  constructor(rk: number[]) {
    super();
    if (rk == null) {
      throw new Error("null array");
    }

    const k = rk.length;
    this.n = 0;
    this.nonzeroIndices = [];

    for (let i = 0; i < k; i++) {
      if (rk[i] < 0) {
        throw new Error("null or negative element");
      }
      this.n += rk[i];
      if (rk[i] !== 0) {
        this.nonzeroIndices.push(i);
      }
    }

    let c = 0;
    const nzsz = this.nonzeroIndices.length;
    this.combis = new Array(nzsz);

    const sizes: number[] = new Array(nzsz);
    for (let i = 0; i < nzsz; i++) {
      const nz = this.nonzeroIndices[i];
      c += rk[nz];
      this.combis[i] = Combination.generateAll(c, rk[nz]);
      sizes[i] = this.combis[i].length;
    }
    this.it = new MixedRadixEnumeration(sizes);
  }

  hasMoreElements(): boolean {
    return this.it.hasMoreElements();
  }

  nextElement(): number[] {
    if (!this.hasMoreElements()) {
      throw new Error("No such element");
    }
    
    const mr = this.it.nextElement();
    const pos: number[] = Array.from({ length: this.n }, (_, i) => i);
    const x: number[] = new Array(this.n).fill(0);

    for (let i = mr.length - 1; i >= 0; i--) {
      const p = this.combis[i][mr[i]];
      for (let j = p.size() - 1; j >= 0; j--) {
        if (p.get(j)) {
          x[pos[j]] = this.nonzeroIndices[i];
          pos.splice(j, 1); // Remove the position at index j
        }
      }
    }
    return x;
  }
}
