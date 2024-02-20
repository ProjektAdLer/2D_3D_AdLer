import { LearningSpaceTemplateType } from "../Types/LearningSpaceTemplateType";
import ILearningSpaceTemplate from "./ILearningSpaceTemplate";
import { LearningSpaceTemplate_L } from "./LearningSpaceTemplate_L";
import { LearningSpaceTemplate_T } from "./LearningSpaceTemplate_T";
import { LearningSpaceTemplate_R8 } from "./LearningSpaceTemplate_R8";
import { LearningSpaceTemplate_R6 } from "./LearningSpaceTemplate_R6";
import { LearningSpaceTemplate_D } from "./LearningSpaceTemplate_D";

export default class LearningSpaceTemplateLookup {
  static getLearningSpaceTemplate(
    type: LearningSpaceTemplateType
  ): ILearningSpaceTemplate {
    switch (type) {
      case LearningSpaceTemplateType.L:
        return LearningSpaceTemplate_L;
      case LearningSpaceTemplateType.T:
        return LearningSpaceTemplate_T;
      case LearningSpaceTemplateType.R8:
        return LearningSpaceTemplate_R8;
      case LearningSpaceTemplateType.R6:
        return LearningSpaceTemplate_R6;
      case LearningSpaceTemplateType.D:
        return LearningSpaceTemplate_D;
      //TODO: Add other templates here
    }

    throw new Error(
      `LearningSpaceTemplatesLookup.getLearningSpaceTemplate: Learning space template for ${type} not found.`
    );
  }
}
