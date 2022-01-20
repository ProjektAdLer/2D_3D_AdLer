import { Color3 } from '@babylonjs/core';

export class SBWViewModel {
  private correctColor = new Color3(0, 1, 0);
  private wrongColor = new Color3(1, 0, 0);

  public getCorrectColor(): Color3 {
    return this.correctColor;
  }

  public getWrongColor(): Color3 {
    return this.wrongColor;
  }
}
