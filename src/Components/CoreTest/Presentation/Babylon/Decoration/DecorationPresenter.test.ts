import { Vector3 } from "@babylonjs/core";
import DecorationPresenter from "../../../../Core/Presentation/Babylon/Decoration/DecorationPresenter";
import DecorationViewModel from "../../../../Core/Presentation/Babylon/Decoration/DecorationViewModel";
import LearningSpaceScoreTO from "../../../../Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import { LearningSpaceTemplateType } from "../../../../Core/Domain/Types/LearningSpaceTemplateType";

describe("DecorationPresenter", () => {
  let systemUnderTest: DecorationPresenter;
  let viewModel: DecorationViewModel;

  beforeEach(() => {
    systemUnderTest = new DecorationPresenter(new DecorationViewModel());
  });

  test("constructor throws error if undefined is passed as view model", () => {
    expect(() => {
      //@ts-ignore
      new DecorationPresenter(undefined);
    }).toThrowError();
  });

  test("presentDecoration sets learningSpaceType in view model", () => {
    const learningSpaceTemplateType = LearningSpaceTemplateType.R6;
    systemUnderTest.presentDecoration(learningSpaceTemplateType);
    expect(
      systemUnderTest["viewModel"].learningSpaceTemplateType.Value
    ).toEqual(LearningSpaceTemplateType.R6);
  });
});
