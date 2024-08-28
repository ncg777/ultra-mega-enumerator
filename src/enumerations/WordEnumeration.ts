import { Enumeration } from '../interfaces/Enumeration';
import { MixedRadixEnumeration } from './MixedRadixEnumeration';

export class WordEnumeration implements Enumeration<number[]> {
  private mre: MixedRadixEnumeration;

  constructor(length: number, size: number) {
    const base: number[] = new Array(length).fill(size);
    this.mre = new MixedRadixEnumeration(base);
  }

  hasMoreElements(): boolean {
    return this.mre.hasMoreElements();
  }

  nextElement(): number[] {
    return this.mre.nextElement();
  }
}
