import WorldSelectionController from "../../../../../Core/Presentation/React/WorldMenu/WorldSelection/WorldSelectionController";
import WorldSelectionViewModel from "../../../../../Core/Presentation/React/WorldMenu/WorldSelection/WorldSelectionViewModel";

jest.mock("src/Lib/Logger");

const viewModel = new WorldSelectionViewModel();

describe("WorldSelectionController", () => {
  let systemUnderTest: WorldSelectionController;

  beforeEach(() => {
    systemUnderTest = new WorldSelectionController(viewModel);
  });

  test("onWorldRowClicked sets the correct selectedRowID in the viewmodel", () => {
    systemUnderTest.onWorldRowClicked(420);

    expect(viewModel.selectedRowID.Value).toBe(420);
  });
});
