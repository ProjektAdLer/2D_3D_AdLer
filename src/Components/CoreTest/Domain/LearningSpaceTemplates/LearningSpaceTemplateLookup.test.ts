import { LearningSpaceTemplate_L } from "../../../Core/Domain/LearningSpaceTemplates/LearningSpaceTemplate_L";
import LearningSpaceLookup from "../../../Core/Domain/LearningSpaceTemplates/LearningSpaceTemplatesLookup";
import { LearningSpaceTemplateTypes } from "../../../Core/Domain/Types/LearningSpaceTemplateTypes";

describe("LearningSpaceTemplateLookup", () => {
  test("getLearningSpaceTemplate return correct template for L", () => {
    const result = LearningSpaceLookup.getLearningSpaceTemplate(
      LearningSpaceTemplateTypes.L
    );
    expect(result).toMatchObject(LearningSpaceTemplate_L);
  });

  test("getLearningSpaceTemplate throws error for unknown template", () => {
    // only throws error if the param is forcibly cast to the enum type
    expect(() => {
      LearningSpaceLookup.getLearningSpaceTemplate(
        "UnknownTemplate" as LearningSpaceTemplateTypes
      );
    }).toThrowError(
      "LearningSpaceTemplatesLookup.getLearningSpaceTemplate: Learning space template for UnknownTemplate not found."
    );
  });
});
