import { Vector3 } from "@babylonjs/core";
import StandInDecorationViewModel from "./StandInDecorationViewModel";
import IStandInDecorationPresenter from "./IStandInDecorationPresenter";

export default class StandInDecorationPresenter
  implements IStandInDecorationPresenter
{
  constructor(private viewModel: StandInDecorationViewModel) {
    if (!this.viewModel) {
      throw new Error("ViewModel was passed as undefined");
    }
  }

  presentStandInDecoration(
    position: [Vector3, number],
    spaceName: string,
    slotNumber: number
  ): void {
    this.viewModel.position.Value = position[0];
    this.viewModel.rotation.Value = position[1];
    this.viewModel.spaceName.Value = spaceName;
    this.viewModel.slotNumber.Value = slotNumber;
  }
}
