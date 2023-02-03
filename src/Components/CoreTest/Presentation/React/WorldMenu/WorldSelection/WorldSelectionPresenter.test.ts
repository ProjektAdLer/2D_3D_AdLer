import WorldTO from "../../../../../Core/Application/DataTransferObjects/WorldTO";
import WorldSelectionPresenter from "../../../../../Core/Presentation/React/WorldMenu/WorldSelection/WorldSelectionPresenter";
import WorldSelectionViewModel from "../../../../../Core/Presentation/React/WorldMenu/WorldSelection/WorldSelectionViewModel";

describe("WorldSelectionPresenter", () => {
  let systemUnderTest: WorldSelectionPresenter;

  beforeEach(() => {
    systemUnderTest = new WorldSelectionPresenter(
      new WorldSelectionViewModel()
    );
  });
});
