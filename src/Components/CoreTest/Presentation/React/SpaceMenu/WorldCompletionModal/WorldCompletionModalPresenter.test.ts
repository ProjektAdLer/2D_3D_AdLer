import SpaceTO from "../../../../../Core/Application/DataTransferObjects/SpaceTO";
import WorldTO from "../../../../../Core/Application/DataTransferObjects/WorldTO";
import WorldCompletionModalPresenter from "../../../../../Core/Presentation/React/SpaceMenu/WorldCompletionModal/WorldCompletionModalPresenter";
import WorldCompletionModalViewModel from "../../../../../Core/Presentation/React/SpaceMenu/WorldCompletionModal/WorldCompletionModalViewModel";
describe("WorldCompletionModalPresenter", () => {
  let systemUnderTest: WorldCompletionModalPresenter;

  let vm = new WorldCompletionModalViewModel();

  beforeEach(() => {
    vm = new WorldCompletionModalViewModel();
    systemUnderTest = new WorldCompletionModalPresenter(vm);
  });

  test("should set vm data on world loaded", () => {
    const worldTO = {
      spaces: [
        {
          id: 1,
          name: "Test Space 1",
          elements: [],
          description: "Test Space 1 Description",
          goals: "Test Space 1 Goals",
          requiredPoints: 0,
          requirements: [],
        } as SpaceTO,
      ],
    } as WorldTO;

    systemUnderTest.onWorldLoaded(worldTO);

    expect(vm.spaceIDs.Value).toEqual([1]);
  });

  test("should do nothing on Space Data Loaded", () => {
    const vmBefore = vm;
    systemUnderTest.onSpaceDataLoaded(1);
    expect(vm).toEqual(vmBefore);
  });

  test("should set the score accordingly on score changed", () => {
    const worldTO = {
      spaces: [
        {
          id: 42,
          name: "Test Space 1",
          elements: [],
          description: "Test Space 1 Description",
          goals: "Test Space 1 Goals",
          requiredPoints: 0,
          requirements: [],
        } as SpaceTO,
      ],
    } as WorldTO;

    systemUnderTest.onWorldLoaded(worldTO);

    systemUnderTest.onScoreChanged(42, 42, 42, 42);
    systemUnderTest.onScoreChanged(42, 42, 42, 43);

    expect(vm.spacesCompleted.Value).toEqual([
      [42, true],
      [43, true],
    ]);
  });
});
