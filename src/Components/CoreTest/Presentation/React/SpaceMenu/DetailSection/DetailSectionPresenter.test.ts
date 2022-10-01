import DetailSectionPresenter from "../../../../../Core/Presentation/React/SpaceMenu/DetailSection/DetailSectionPresenter";
import DetailSectionViewModel from "../../../../../Core/Presentation/React/SpaceMenu/DetailSection/DetailSectionViewModel";
import SpaceTO from "../../../../../Core/Application/DataTransferObjects/SpaceTO";

describe("DetailSectionPresenter", () => {
  let systemUnderTest: DetailSectionPresenter;

  beforeEach(() => {
    systemUnderTest = new DetailSectionPresenter(new DetailSectionViewModel());
  });

  test("onSpaceLoaded sets data in the view model", () => {
    const spaceTO: SpaceTO = {
      id: 42,
      name: "Test Space",
      elements: [
        {
          id: 1,
          name: "Test Element 1",

          type: "h5p",
          description: "Test Description 1",
          goals: "TestGoal",
          value: 1,
        },
        {
          id: 2,
          name: "Test Element 2",
          type: "text",
          description: "Test Description 1",
          goals: "TestGoal",
          value: 1,
        },
      ],
    };

    systemUnderTest.onSpaceDataLoaded(spaceTO);

    expect(systemUnderTest["viewModel"].name.Value).toEqual(spaceTO.name);
    expect(systemUnderTest["viewModel"].elements.Value).toEqual([
      ["h5p", "Test Element 1"],
      ["text", "Test Element 2"],
    ]);
  });
});
