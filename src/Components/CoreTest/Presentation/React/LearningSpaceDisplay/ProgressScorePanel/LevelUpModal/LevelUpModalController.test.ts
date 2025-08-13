import LevelUpModalController from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LevelUpModal/LevelUpModalController";
import LevelUpModalViewModel from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LevelUpModal/LevelUpModalViewModel";

describe("LevelUpModalController", () => {
  let systemUnderTest: LevelUpModalController;
  let viewModelMock: LevelUpModalViewModel;

  beforeEach(() => {
    viewModelMock = new LevelUpModalViewModel();
  });

  test("close sets isOpen in viewmodel to false", () => {
    viewModelMock.isOpen.Value = true;
    systemUnderTest = new LevelUpModalController(viewModelMock);
    systemUnderTest.close();
    expect(viewModelMock.isOpen.Value).toBeFalsy();
  });
});
