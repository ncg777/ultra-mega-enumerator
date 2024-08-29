import { Enumeration } from 'utils/Enumeration';

/**
 * Efficient Generation of Set Partitions Michael Orlov orlovm@cs.bgu.ac.il March 26, 2002
 * 
 * @author Nicolas Couture-Grenier
 * 
 */
export class FixedSetPartitionEnumeration extends Enumeration<number[]> {
  private kappa: number[];
  private M: number[];
  private n: number;
  private k: number;
  private hasNext: boolean = true;

  constructor(n: number, k: number) {
    super();
    this.n = n;
    this.k = k;
    this.kappa = new Array(n).fill(0);
    this.M = new Array(n).fill(0);

    const offset = n - k;
    for (let i = offset + 1; i < n; i++) {
      this.kappa[i] = i - offset;
      this.M[i] = i - offset;
    }
  }

  nextElement(): number[] {
    if (!this.hasNext) {
      throw new Error("No such element");
    }
    const o = [...this.kappa];

    this.hasNext = false;

    for (let i = this.n - 1; i > 0; --i) {
      if (this.kappa[i] < this.k - 1 && this.kappa[i] <= this.M[i - 1]) {
        this.kappa[i] = this.kappa[i] + 1;

        const new_max = Math.max(this.M[i], this.kappa[i]);
        this.M[i] = new_max;

        for (let j = i + 1; j <= this.n - (this.k - new_max); ++j) {
          this.kappa[j] = 0;
          this.M[j] = new_max;
        }

        for (let j = this.n - (this.k - new_max) + 1; j < this.n; ++j) {
          const new_max2 = this.k - (this.n - j);
          this.kappa[j] = new_max2;
          this.M[j] = new_max2;
        }

        this.hasNext = true;
        break;
      }
    }
    return o;
  }

  hasMoreElements(): boolean {
    return this.hasNext;
  }
}
