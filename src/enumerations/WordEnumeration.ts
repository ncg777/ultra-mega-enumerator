import { AbstractEnumeration } from './AbstractEnumeration';
import { MixedRadixEnumeration } from './MixedRadixEnumeration';

export class WordEnumeration extends AbstractEnumeration<number[]> {
  private mre: MixedRadixEnumeration;

  constructor(length: number, size: number) {
    super()
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
