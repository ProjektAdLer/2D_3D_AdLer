import { ActionEvent } from "@babylonjs/core";

export default interface ILearningElementPresenter {
  loadMeshAsync(url: string, meshName?: string): Promise<void>;
  registerAction(
    triggerOptions: any,
    callback: (evt?: ActionEvent) => void
  ): void;
}
