import { Enumeration } from '../interfaces/Enumeration';

/**
 * Enumerates all values of the mixed radix base given as a parameter.
 * 
 * @link http://en.wikipedia.org/wiki/Mixed_radix
 */
export class MixedRadixEnumeration implements Enumeration<number[]> {
  private base: number[] = [];
  private current: number[] | null=null;
  private isLast: boolean = false;

  constructor(base0: number[]) {
    this.init(base0);
  }

  private init(base: number[]): void {
    if (base == null) {
      throw new Error("MixedRadixEnumeration - null base array");
    }
    this.base = [...base];

    for (let i = 0; i < base.length; i++) {
      if (base[i] < 1) {
        throw new Error("MixedRadixEnumeration - non-positive base");
      }
    }
    this.current = null;
  }

  hasMoreElements(): boolean {
    if (this.current == null) {
      return true;
    }
    if (this.isLast) {
      return false;
    }

    let hasMore = false;
    for (let i = 0; i < this.base.length; i++) {
      if (this.current[i] < (this.base[i] - 1)) {
        hasMore = true;
        break;
      }
    }
    if (!hasMore) {
      this.isLast = true;
    }
    return hasMore;
  }

  nextElement(): number[] {
    if (!this.hasMoreElements()) {
      throw new Error("No such element");
    }

    const result: number[] = new Array(this.base.length);
    if (this.current == null) {
      for (let i = 0; i < this.base.length; i++) {
        result[i] = 0;
      }
    } else {
      result.splice(0, this.base.length, ...this.current);
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

    return result;
  }

  static mapIndexToCoordinates(index: number, base: number[]): number[] {
    const coords: number[] = new Array(base.length);
    let t = index;

    for (let k = base.length - 1; k >= 0; k--) {
      const b = base[k];
      coords[k] = t % b;
      t = Math.floor(t / b);
    }
    return coords;
  }
}
