import { LearningSpaceTemplateType } from "../Types/LearningSpaceTemplateType";
import ILearningSpaceTemplate from "./ILearningSpaceTemplate";
import { LearningSpaceTemplate_L as LearningSpaceTemplate_L } from "./LearningSpaceTemplate_L";

export default class LearningSpaceTemplateLookup {
  static getLearningSpaceTemplate(
    type: LearningSpaceTemplateType
  ): ILearningSpaceTemplate {
    switch (type) {
      case LearningSpaceTemplateType.L:
        return LearningSpaceTemplate_L;
      //TODO: Add other templates here
    }

    throw new Error(
      `LearningSpaceTemplatesLookup.getLearningSpaceTemplate: Learning space template for ${type} not found.`
    );
  }
}
