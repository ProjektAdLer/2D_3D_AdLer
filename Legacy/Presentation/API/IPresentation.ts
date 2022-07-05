export default interface IPresentation {
  setupBabylon(canvas: HTMLCanvasElement): Promise<void>;

  setupReact(): void;
}
