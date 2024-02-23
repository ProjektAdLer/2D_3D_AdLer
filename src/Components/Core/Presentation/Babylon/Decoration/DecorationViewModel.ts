import { Mesh } from "@babylonjs/core";
import { LearningSpaceTemplateType } from "src/Components/Core/Domain/Types/LearningSpaceTemplateType";
import { LearningSpaceThemeType } from "src/Components/Core/Domain/Types/LearningSpaceThemeTypes";
import Observable from "src/Lib/Observable";

export default class DecorationViewModel {
  public meshes: Observable<Mesh[]> = new Observable<Mesh[]>([]);
  public learningSpaceTemplateType: Observable<LearningSpaceTemplateType> =
    new Observable<LearningSpaceTemplateType>();
  public theme: LearningSpaceThemeType;
}
