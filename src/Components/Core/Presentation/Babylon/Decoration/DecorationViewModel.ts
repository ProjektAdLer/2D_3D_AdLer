import { Mesh } from "@babylonjs/core";
import { LearningSpaceTemplateType } from "src/Components/Core/Domain/Types/LearningSpaceTemplateType";
import { ThemeType } from "src/Components/Core/Domain/Types/ThemeTypes";

export default class DecorationViewModel {
  public insideMeshes: Mesh[] = [];
  public outsideMeshes: Mesh[] = [];
  public learningSpaceTemplateType: LearningSpaceTemplateType;
  public theme: ThemeType;
}
