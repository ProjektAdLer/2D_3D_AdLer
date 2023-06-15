import { Vector3 } from "@babylonjs/core";

export default interface IStandInDecorationPresenter {
  presentStandInDecoration(
    position: [Vector3, number],
    spaceName: string,
    slotNumber: number
  ): void;
}
