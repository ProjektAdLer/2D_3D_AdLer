import { LearningSpaceTemplateTypes } from "../Types/LearningSpaceTemplateTypes";
import ILearningSpaceTemplate from "./ILearningSpaceTemplate";
import { LearningSpaceTemplate_L as LearningSpaceTemplate_L } from "./LearningSpaceTemplate_L";

export default class LearningSpaceTemplateLookup {
  static getLearningSpaceTemplate(
    type: LearningSpaceTemplateTypes
  ): ILearningSpaceTemplate {
    switch (type) {
      case LearningSpaceTemplateTypes.L:
        return LearningSpaceTemplate_L;
      //TODO: Add other templates here
    }

    throw new Error(
      `LearningSpaceTemplatesLookup.getLearningSpaceTemplate: Learning space template for ${type} not found.`
    );
  }
}
