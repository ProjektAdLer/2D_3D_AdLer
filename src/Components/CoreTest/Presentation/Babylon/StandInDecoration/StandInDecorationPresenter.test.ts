import { Vector3 } from "@babylonjs/core";
import StandInDecorationPresenter from "../../../../Core/Presentation/Babylon/StandInDecoration/StandInDecorationPresenter";
import StandInDecorationViewModel from "../../../../Core/Presentation/Babylon/StandInDecoration/StandInDecorationViewModel";
import LearningSpaceScoreTO from "../../../../Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import { LearningSpaceTemplateType } from "../../../../Core/Domain/Types/LearningSpaceTemplateType";

describe("StandInDecorationPresenter", () => {
  let systemUnderTest: StandInDecorationPresenter;
  let viewModel: StandInDecorationViewModel;

  beforeEach(() => {
    systemUnderTest = new StandInDecorationPresenter(
      new StandInDecorationViewModel()
    );
  });

  test("constructor throws error if undefined is passed as view model", () => {
    expect(() => {
      //@ts-ignore
      new StandInDecorationPresenter(undefined);
    }).toThrowError();
  });

  test("presentStandInDecoration sets values in view model", () => {
    systemUnderTest.presentStandInDecoration(
      [new Vector3(1, 2, 3), 4],
      "TestSpace",
      5
    );
    expect(systemUnderTest["viewModel"].position.Value).toEqual(
      new Vector3(1, 2, 3)
    );
    expect(systemUnderTest["viewModel"].rotation.Value).toEqual(4);
    expect(systemUnderTest["viewModel"].spaceName.Value).toEqual("TestSpace");
    expect(systemUnderTest["viewModel"].slotNumber.Value).toEqual(5);
  });
});
