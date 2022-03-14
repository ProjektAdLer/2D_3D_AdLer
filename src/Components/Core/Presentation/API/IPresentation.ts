import IBusinessLogic from "./IBusinessLogic";

export default interface IPresentation {
  setupBabylon(canvas: HTMLCanvasElement): Promise<void>;

  readonly BusinessLogic: IBusinessLogic;
}
