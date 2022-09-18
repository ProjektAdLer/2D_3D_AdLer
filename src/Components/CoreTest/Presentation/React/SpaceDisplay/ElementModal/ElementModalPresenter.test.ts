import ElementModalPresenter from "../../../../../../../src/Components/Core/Presentation/React/SpaceDisplay/ElementModal/ElementModalPresenter";
import { ElementTO } from "../../../../../Core/Ports/WorldPort/IWorldPort";
import ElementModalViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/ElementModal/ElementModalViewModel";

describe("ElementModalPresenter", () => {
  let systemUnderTest: ElementModalPresenter;

  beforeEach(() => {
    systemUnderTest = new ElementModalPresenter(new ElementModalViewModel());
  });

  test("presentElementModal sets the values in its viewModel", () => {
    const elementTO: ElementTO = {
      id: 1,
      name: "Test",
      elementData: {
        type: "h5p",
      },
    };

    systemUnderTest.presentElementModal(elementTO);

    expect(systemUnderTest["viewModel"].elementData.Value.type).toBe(
      elementTO.elementData.type
    );
    expect(systemUnderTest["viewModel"].isOpen.Value).toBe(true);
    expect(systemUnderTest["viewModel"].id.Value).toBe(elementTO.id);
  });
});
