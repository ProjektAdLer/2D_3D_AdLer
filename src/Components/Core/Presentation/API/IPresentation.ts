import IBusinessLogic from "./IBusinessLogic";

export default interface IPresentation {
  setupBabylon(canvas: HTMLCanvasElement): Promise<void>;

  setupReact(): void;

  readonly BusinessLogic: IBusinessLogic;
}
