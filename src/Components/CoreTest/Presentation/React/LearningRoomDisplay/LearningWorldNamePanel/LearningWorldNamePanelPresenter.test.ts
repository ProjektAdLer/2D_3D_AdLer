import type ILearningWorldNamePanelPresenter from "../../../../../../../src/Components/Core/Presentation/React/LearningRoomDisplay/LearningWorldNamePanel/ILearningWorldNamePanelPresenter";
import LearningWorldNamePanelViewModel from "../../../../../../../src/Components/Core/Presentation/React/LearningRoomDisplay/LearningWorldNamePanel/LearningWorldNamePanelViewModel";
import LearningWorldNamePanelPresenter from "../../../../../../../src/Components/Core/Presentation/React/LearningRoomDisplay/LearningWorldNamePanel/LearningWorldNamePanelPresenter";
describe("LearningWorldNamePanel", () => {
  let systemUnderTest: ILearningWorldNamePanelPresenter;
  let vm: LearningWorldNamePanelViewModel;

  beforeEach(() => {
    vm = new LearningWorldNamePanelViewModel();
    systemUnderTest = new LearningWorldNamePanelPresenter(vm);
  });

  test("should set the name of the world in the vm ", () => {
    systemUnderTest.displayWorldName("Test World");
    expect(vm.worldName.Value).toBe("Test World");
  });
});
