import ElementModalPresenter from "../../../../../../../src/Components/Core/Presentation/React/SpaceDisplay/ElementModal/ElementModalPresenter";
import ElementModalViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/ElementModal/ElementModalViewModel";
import ElementTO from "../../../../../Core/Application/DataTransferObjects/ElementTO";

describe("ElementModalPresenter", () => {
  let systemUnderTest: ElementModalPresenter;

  beforeEach(() => {
    systemUnderTest = new ElementModalPresenter(new ElementModalViewModel());
  });

  test("presentElementModal sets the values in its viewModel", () => {
    const elementTO: ElementTO = {
      id: 1,
      name: "Test",
      description: "Test",
      goals: "Test",
      type: "h5p",
      value: 1,
      parentSpaceID: 0,
      parentCourseID: 0,
      hasScored: false,
    };

    systemUnderTest.onElementLoaded(elementTO);

    expect(systemUnderTest["viewModel"].type.Value).toBe(elementTO.type);
    expect(systemUnderTest["viewModel"].isOpen.Value).toBe(true);
    expect(systemUnderTest["viewModel"].id.Value).toBe(elementTO.id);
  });
});
