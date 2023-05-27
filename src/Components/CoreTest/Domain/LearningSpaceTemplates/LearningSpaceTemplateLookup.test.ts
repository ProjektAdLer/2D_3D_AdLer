import { LearningSpaceTemplate_L } from "../../../Core/Domain/LearningSpaceTemplates/LearningSpaceTemplate_L";
import { LearningSpaceTemplate_R6 } from "../../../Core/Domain/LearningSpaceTemplates/LearningSpaceTemplate_R6";
import { LearningSpaceTemplate_R8 } from "../../../Core/Domain/LearningSpaceTemplates/LearningSpaceTemplate_R8";
import LearningSpaceLookup from "../../../Core/Domain/LearningSpaceTemplates/LearningSpaceTemplatesLookup";
import { LearningSpaceTemplateType } from "../../../Core/Domain/Types/LearningSpaceTemplateType";

describe("LearningSpaceTemplateLookup", () => {
  test("getLearningSpaceTemplate return correct template for L", () => {
    const result = LearningSpaceLookup.getLearningSpaceTemplate(
      LearningSpaceTemplateType.L
    );
    expect(result).toMatchObject(LearningSpaceTemplate_L);
  });
  test("getLearningSpaceTemplate return correct template for R6", () => {
    const result = LearningSpaceLookup.getLearningSpaceTemplate(
      LearningSpaceTemplateType.R6
    );
    expect(result).toMatchObject(LearningSpaceTemplate_R6);
  });
  test("getLearningSpaceTemplate return correct template for R8", () => {
    const result = LearningSpaceLookup.getLearningSpaceTemplate(
      LearningSpaceTemplateType.R8
    );
    expect(result).toMatchObject(LearningSpaceTemplate_R8);
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
