import UserWorldsTO from "../../../../../Core/Application/DataTransferObjects/UserWorldsTO";
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
  test("onUserWorldsLoaded should set the correct values in the vm", () => {
    const userWorlds: UserWorldsTO = {
      userToken: "TestUserToken",
      worldInfo: [
        { worldID: 1, worldName: "Test World 1" },
        { worldID: 2, worldName: "Test World 2" },
      ],
    };
    systemUnderTest.onUserWorldsLoaded(userWorlds);
    expect(systemUnderTest["viewModel"].userWorlds.Value).toEqual([
      { id: 1, name: "Test World 1", isCompleted: false },
      { id: 2, name: "Test World 2", isCompleted: false },
    ]);
  });
});
