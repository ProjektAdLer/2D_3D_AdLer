import { ActionEvent, Vector3 } from "@babylonjs/core";

export default interface ILearningElementPresenter {
  loadMeshAsync(url: string, meshName?: string): Promise<void>;
  registerAction(
    triggerOptions: any,
    callback: (evt?: ActionEvent) => void
  ): void;
  positionsMesh(position: Vector3, rotation: number): void;
}
