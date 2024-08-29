import { Enumeration } from './../utils/Enumeration';

/**
 * Enumerates all values of the mixed radix base given as a parameter.
 * 
 * @link http://en.wikipedia.org/wiki/Mixed_radix
 */
export class MixedRadixEnumeration extends Enumeration<number[]> {
  private base: number[] = [];
  private current: number[] | null=null;
  private isLast: boolean = false;
  private currentIndex:number = -1;
  private total:number = -1;

  constructor(base: number[]) {
    super();
    this.base = [...base].map((b => Math.round(b)));

    for (let i = 0; i < base.length; i++) {
      if (base[i] < 1) {
        throw new Error("MixedRadixEnumeration - non-positive base");
      }
    }
    this.total = 1;
    for(const b of base) {this.total*=b;}
    this.total = Math.round(this.total);
    this.current = null;  
  }

  hasMoreElements(): boolean {
    return this.currentIndex < this.total-1;
  }

  nextElement(): number[] {
    if (!this.hasMoreElements()) {
      throw new Error("No such element");
    }

    let result: number[] = [];
    if (this.currentIndex == -1) {
      for (let i = 0; i < this.base.length; i++) {
        result.push(0);
      }
    } else {
      result = [...this.current!];
      for (let i = 0; i < this.base.length; i++) {
        if (result[i] < (this.base[i] - 1)) {
          result[i]++;
          break;
        } else {
          result[i] = 0;
        }
      }
    }
    this.current = [...result];
    this.currentIndex++;
    console.log(result);
    return result;
  }
}
