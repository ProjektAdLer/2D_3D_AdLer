import LearningWorldDetailPresenter from "../../../../../Core/Presentation/React/LearningWorldMenu/LearningWorldDetail/LearningWorldDetailPresenter";
import LearningWorldDetailViewModel from "../../../../../Core/Presentation/React/LearningWorldMenu/LearningWorldDetail/LearningWorldDetailViewModel";
import LearningWorldTO from "../../../../../Core/Application/DataTransferObjects/LearningWorldTO";

describe("LearningWorldDetailPresenter", () => {
  let systemUnderTest: LearningWorldDetailPresenter;

  beforeEach(() => {
    systemUnderTest = new LearningWorldDetailPresenter(
      new LearningWorldDetailViewModel()
    );
  });

  test("onLearningWorldLoaded should set viewModel data", () => {
    systemUnderTest.onLearningWorldLoaded({
      name: "test",
      spaces: [{ id: 1, name: "test" }],
      goals: ["test"],
      description: "test",
    } as Partial<LearningWorldTO>);

    expect(systemUnderTest["viewModel"].spaces.Value).toEqual([
      {
        id: 1,
        name: "test",
      },
    ]);
    expect(systemUnderTest["viewModel"].name.Value).toEqual("test");
    expect(systemUnderTest["viewModel"].goals.Value).toEqual(["test"]);
    expect(systemUnderTest["viewModel"].description.Value).toEqual("test");
  });
});
