import { Mesh } from "@babylonjs/core";
import { LearningSpaceThemeType } from "src/Components/Core/Domain/Types/LearningSpaceThemeTypes";
import Observable from "src/Lib/Observable";

export default class AmbienceViewModel {
  theme: LearningSpaceThemeType;
  public meshes: Observable<Mesh[]> = new Observable<Mesh[]>([]);
}
