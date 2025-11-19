export default interface IWorldManagerModalController {
  onOpenFileDialog(): Promise<void>;
  onDeleteWorld(worldName: string): Promise<void>;
  onCloseModal(): void;
}
