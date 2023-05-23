import { LearningSpaceTemplate_L } from "../../../Core/Domain/LearningSpaceTemplates/LearningSpaceTemplate_L";
import LearningSpaceLookup from "../../../Core/Domain/LearningSpaceTemplates/LearningSpaceTemplatesLookup";
import { LearningSpaceTemplateType } from "../../../Core/Domain/Types/LearningSpaceTemplateType";

describe("LearningSpaceTemplateLookup", () => {
  test("getLearningSpaceTemplate return correct template for L", () => {
    const result = LearningSpaceLookup.getLearningSpaceTemplate(
      LearningSpaceTemplateType.L
    );
    expect(result).toMatchObject(LearningSpaceTemplate_L);
  });

  test("getLearningSpaceTemplate throws error for unknown template", () => {
    // only throws error if the param is forcibly cast to the enum type
    expect(() => {
      LearningSpaceLookup.getLearningSpaceTemplate(
        "UnknownTemplate" as LearningSpaceTemplateType
      );
    }).toThrowError(
      "LearningSpaceTemplatesLookup.getLearningSpaceTemplate: Learning space template for UnknownTemplate not found."
    );
  });
});
