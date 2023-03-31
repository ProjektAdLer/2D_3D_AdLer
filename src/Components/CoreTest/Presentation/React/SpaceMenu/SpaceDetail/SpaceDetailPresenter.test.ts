import SpaceDetailPresenter from "../../../../../Core/Presentation/React/SpaceMenu/SpaceDetail/SpaceDetailPresenter";
import SpaceDetailViewModel from "../../../../../Core/Presentation/React/SpaceMenu/SpaceDetail/SpaceDetailViewModel";
import LearningSpaceTO from "../../../../../Core/Application/DataTransferObjects/LearningSpaceTO";

describe("SpaceDetailPresenter", () => {
  let systemUnderTest: SpaceDetailPresenter;

  beforeEach(() => {
    systemUnderTest = new SpaceDetailPresenter(new SpaceDetailViewModel());
  });

  test("onWorldLoaded should set viewModel data", () => {
    systemUnderTest.onWorldLoaded({
      spaces: [{ id: 1, name: "test" }],
    });

    expect(systemUnderTest["viewModel"].spaces.Value).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: 1, name: "test" })])
    );
  });

  test("onWorldLoaded should set isCompleted of a space to false, if currentScore is lower than requiredScore", () => {
    systemUnderTest.onWorldLoaded({
      spaces: [{ id: 1, name: "test", currentScore: 0, requiredScore: 42 }],
    });

    expect(systemUnderTest["viewModel"].spaces.Value).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1, name: "test", isCompleted: false }),
      ])
    );
  });

  test("onWorldLoaded should set isCompleted of a space to true, if currentScore is higher/equal than requiredScore", () => {
    systemUnderTest.onWorldLoaded({
      spaces: [{ id: 1, name: "test", currentScore: 42, requiredScore: 42 }],
    });

    expect(systemUnderTest["viewModel"].spaces.Value).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1, name: "test", isCompleted: true }),
      ])
    );
  });

  test.skip("onSpaceLoaded sets data in the view model", () => {
    const spaceTO: LearningSpaceTO = {
      id: 42,
      description: "description",
      goals: ["goals"],
      requiredScore: 42,
      currentScore: 0,
      maxScore: 42,
      requirements: "42, 20, 1",
      name: "Test Space",
      elements: [
        {
          id: 1,
          name: "Test Element 1",
          parentSpaceID: 42,
          type: "h5p",
          description: "Test Description 1",
          goals: ["TestGoal"],
          value: 1,
          hasScored: false,
          parentWorldID: 42,
        },
        {
          id: 2,
          name: "Test Element 2",
          parentSpaceID: 42,
          type: "text",
          description: "Test Description 1",
          goals: ["TestGoal"],
          value: 1,
          hasScored: false,
          parentWorldID: 42,
        },
      ],
    };

    systemUnderTest.onSpaceLoaded(spaceTO);

    expect(systemUnderTest["viewModel"].name.Value).toEqual(spaceTO.name);
    expect(systemUnderTest["viewModel"].description.Value).toEqual(
      spaceTO.description
    );
    expect(systemUnderTest["viewModel"].goals.Value).toEqual(spaceTO.goals);
    expect(systemUnderTest["viewModel"].requiredPoints.Value).toEqual(
      spaceTO.requiredScore
    );
    expect(systemUnderTest["viewModel"].elements.Value).toEqual([
      ["h5p", "Test Element 1", false, 1],
      ["text", "Test Element 2", false, 1],
    ]);
    expect(systemUnderTest["viewModel"].requirements.Value).toEqual(
      "42, 20, 1"
    );
  });
});
