import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import { Vector3 } from "@babylonjs/core";
import IAsyncPresentationBuilder from "../../PresentationBuilder/IAsyncPresentationBuilder";
import { LearningSpaceThemeType } from "src/Components/Core/Domain/Types/LearningSpaceThemeTypes";

export default interface IDoorBuilder extends IAsyncPresentationBuilder {
  position: Vector3;
  rotation: number;
  theme: LearningSpaceThemeType;
  spaceID: ComponentID;
  isExit: boolean;
  isOpen: boolean;
}
