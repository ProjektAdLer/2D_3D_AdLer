import { Vector3 } from "@babylonjs/core";
import IAsyncPresentationBuilder from "../../PresentationBuilder/IAsyncPresentationBuilder";
import { ThemeType } from "src/Components/Core/Domain/Types/ThemeTypes";

export default interface IWindowBuilder extends IAsyncPresentationBuilder {
  position: Vector3;
  rotation: number;
  theme: ThemeType;
}
