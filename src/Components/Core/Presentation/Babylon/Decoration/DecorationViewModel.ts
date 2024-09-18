import { Mesh } from "@babylonjs/core";
import { LearningSpaceTemplateType } from "src/Components/Core/Domain/Types/LearningSpaceTemplateType";
import { LearningSpaceThemeType } from "src/Components/Core/Domain/Types/LearningSpaceThemeTypes";

export default class DecorationViewModel {
  public insideMeshes: Mesh[] = [];
  public outsideMeshes: Mesh[] = [];
  public learningSpaceTemplateType: LearningSpaceTemplateType;
  public theme: LearningSpaceThemeType;
}
