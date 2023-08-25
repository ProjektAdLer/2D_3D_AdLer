export default class SeededRNG {
  private hash: number;
  private randFunction: () => number;

  constructor(seed: string) {
    this.hash = this.createSeedHash(seed);
    // pad seed with Phi, Pi and E
    this.seededRandom = this.sfc32(
      0x9e3779b9,
      0x243f6a88,
      0xb7e15162,
      this.hash
    );
  }

  public seededRandom(): number {
    // call the seeded random function in a class method to make the behaviour mockable
    return this.randFunction();
  }

  private createSeedHash(seed: string) {
    let hash = 0;

    if (seed.length === 0) return hash;

    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }

    return hash;
  }

  // seeded pseudorandom number generator function from:
  // https://github.com/bryc/code/blob/master/jshash/PRNGs.md#sfc32
  private sfc32(a: number, b: number, c: number, d: number) {
    return () => {
      a |= 0;
      b |= 0;
      c |= 0;
      d |= 0;
      let t = (((a + b) | 0) + d) | 0;
      d = (d + 1) | 0;
      a = b ^ (b >>> 9);
      b = (c + (c << 3)) | 0;
      c = (c << 21) | (c >>> 11);
      c = (c + t) | 0;
      return (t >>> 0) / 4294967296;
    };
  }
}
