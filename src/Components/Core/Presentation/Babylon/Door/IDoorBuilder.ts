import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import { Vector3 } from "@babylonjs/core";
import IAsyncPresentationBuilder from "../../PresentationBuilder/IAsyncPresentationBuilder";
import { ThemeType } from "src/Components/Core/Domain/Types/ThemeTypes";

export default interface IDoorBuilder extends IAsyncPresentationBuilder {
  position: Vector3;
  rotation: number;
  theme: ThemeType;
  spaceID: ComponentID;
  isExit: boolean;
  isOpen: boolean;
}
