import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import { Vector3 } from "@babylonjs/core";
import IAsyncPresentationBuilder from "../../PresentationBuilder/IAsyncPresentationBuilder";

export default interface IDoorBuilder extends IAsyncPresentationBuilder {
  position: Vector3;
  rotation: number;
  spaceID: ComponentID;
  isExit: boolean;
}
