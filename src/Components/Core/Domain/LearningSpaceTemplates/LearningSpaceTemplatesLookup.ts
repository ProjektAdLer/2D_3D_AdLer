import { LearningSpaceTemplateType } from "../Types/LearningSpaceTemplateType";
import ILearningSpaceTemplate from "./ILearningSpaceTemplate";
import { LearningSpaceTemplate_L as LearningSpaceTemplate_L } from "./LearningSpaceTemplate_L";
import { LearningSpaceTemplate_R8 as LearningSpaceTemplate_R8 } from "./LearningSpaceTemplate_R8";
import { LearningSpaceTemplate_R6 as LearningSpaceTemplate_R6 } from "./LearningSpaceTemplate_R6";

export default class LearningSpaceTemplateLookup {
  static getLearningSpaceTemplate(
    type: LearningSpaceTemplateType
  ): ILearningSpaceTemplate {
    switch (type) {
      case LearningSpaceTemplateType.L:
        return LearningSpaceTemplate_L;
      case LearningSpaceTemplateType.R8:
        return LearningSpaceTemplate_R8;
      case LearningSpaceTemplateType.R6:
        return LearningSpaceTemplate_R6;
      //TODO: Add other templates here
    }

    throw new Error(
      `LearningSpaceTemplatesLookup.getLearningSpaceTemplate: Learning space template for ${type} not found.`
    );
  }
}
