import { IPresentationLogic } from './../../../../template/PresentationLogic/API/IPresentationLogic';
export class SBWPresenter {
  private _presentationLogic: IPresentationLogic;

  constructor(presentationLogic: IPresentationLogic) {
    this._presentationLogic = presentationLogic;
  }
  public checkInput(inputToCheck: boolean): void {
      this._presentationLogic.
  }
}
