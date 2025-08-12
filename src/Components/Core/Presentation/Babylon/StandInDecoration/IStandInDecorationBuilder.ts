import { Vector3 } from "@babylonjs/core";
import IAsyncPresentationBuilder from "../../PresentationBuilder/IAsyncPresentationBuilder";
import { ThemeType } from "src/Components/Core/Domain/Types/ThemeTypes";
export default interface IStandInDecorationBuilder
  extends IAsyncPresentationBuilder {
  position: Vector3;
  rotation: number;
  spaceName: string;
  slotNumber: number;
  theme: ThemeType;
}
