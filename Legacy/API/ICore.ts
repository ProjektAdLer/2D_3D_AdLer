export default interface ICore {
  setupBabylon(canvas: HTMLCanvasElement): Promise<void>;
  setupReact(): void;
}
