import DetailSectionPresenter from "../../../../../Core/Presentation/React/SpaceMenu/DetailSection/DetailSectionPresenter";
import DetailSectionViewModel from "../../../../../Core/Presentation/React/SpaceMenu/DetailSection/DetailSectionViewModel";
import SpaceTO from "../../../../../Core/Application/DataTransferObjects/SpaceTO";

describe("DetailSectionPresenter", () => {
  let systemUnderTest: DetailSectionPresenter;

  beforeEach(() => {
    systemUnderTest = new DetailSectionPresenter(new DetailSectionViewModel());
  });

  test("should set view Model on World loaded", () => {
    systemUnderTest.onWorldLoaded({ spaces: [{ id: 1, name: "test" }] });
    expect(systemUnderTest["viewModel"].spaces.Value).toEqual([[1, "test"]]);
  });

  test("should set viewModel Data when score has changed", () => {
    const spaceTO: SpaceTO = {
      id: 42,
      description: "description",
      goals: "goals",
      requiredPoints: 42,
      requirements: [42, 20, 1],
      name: "Test Space",
      elements: [
        {
          id: 1,
          name: "Test Element 1",
          parentSpaceId: 42,
          type: "h5p",
          description: "Test Description 1",
          goals: "TestGoal",
          value: 1,
          hasScored: false,
          parentCourseId: 42,
        },
        {
          id: 2,
          name: "Test Element 2",
          parentSpaceId: 42,
          type: "text",
          description: "Test Description 1",
          goals: "TestGoal",
          value: 1,
          hasScored: false,
          parentCourseId: 42,
        },
      ],
    };

    systemUnderTest.onSpaceDataLoaded(spaceTO);

    systemUnderTest.onScoreChanged(42, 42, 42, 42);

    expect(systemUnderTest["viewModel"].spaceCompleted.Value).toEqual([
      [42, true],
    ]);
  });

  test("onSpaceLoaded sets data in the view model", () => {
    const spaceTO: SpaceTO = {
      id: 42,
      description: "description",
      goals: "goals",
      requiredPoints: 42,
      requirements: [42, 20, 1],
      name: "Test Space",
      elements: [
        {
          id: 1,
          name: "Test Element 1",
          parentSpaceId: 42,
          type: "h5p",
          description: "Test Description 1",
          goals: "TestGoal",
          value: 1,
          hasScored: false,
          parentCourseId: 42,
        },
        {
          id: 2,
          name: "Test Element 2",
          parentSpaceId: 42,
          type: "text",
          description: "Test Description 1",
          goals: "TestGoal",
          value: 1,
          hasScored: false,
          parentCourseId: 42,
        },
      ],
    };

    systemUnderTest.onSpaceDataLoaded(spaceTO);

    expect(systemUnderTest["viewModel"].name.Value).toEqual(spaceTO.name);
    expect(systemUnderTest["viewModel"].elements.Value).toEqual([
      ["h5p", "Test Element 1", false, 1],
      ["text", "Test Element 2", false, 1],
    ]);

    expect(systemUnderTest["viewModel"].requirements.Value).toEqual([
      42, 20, 1,
    ]);
  });
});
