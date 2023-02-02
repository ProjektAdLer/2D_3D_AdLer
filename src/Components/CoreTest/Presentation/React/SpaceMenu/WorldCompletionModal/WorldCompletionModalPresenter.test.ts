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

  test("onWorldLoaded should set showModal true, if each spaces currentScore is equal/greater to its requiredScore", () => {
    const worldTO = {
      spaces: [
        {
          id: 1,
          currentScore: 1,
          requiredScore: 1,
        } as SpaceTO,
        {
          id: 2,
          currentScore: 2,
          requiredScore: 1,
        } as SpaceTO,
      ],
    } as WorldTO;

    systemUnderTest.onWorldLoaded(worldTO);

    expect(vm.showModal.Value).toEqual(true);
  });

  test("onWorldLoaded should set showModal false, if one of the spaces currentScore is less than its requiredScore", () => {
    const worldTO = {
      spaces: [
        {
          id: 1,
          currentScore: 1,
          requiredScore: 1,
        } as SpaceTO,
        {
          id: 2,
          currentScore: 1,
          requiredScore: 2,
        } as SpaceTO,
      ],
    } as WorldTO;

    systemUnderTest.onWorldLoaded(worldTO);

    expect(vm.showModal.Value).toEqual(false);
  });
});
