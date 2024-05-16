import { StoryElementType } from "../../../../Core/Domain/Types/StoryElementType";
import AvatarCameraPresenter from "../../../../Core/Presentation/Babylon/AvatarCamera/AvatarCameraPresenter";
import AvatarCameraViewModel from "../../../../Core/Presentation/Babylon/AvatarCamera/AvatarCameraViewModel";
import { ArcRotateCamera } from "@babylonjs/core";
import { mockDeep } from "jest-mock-extended";

describe("AvatarCameraPresenter", () => {
  let systemUnderTest: AvatarCameraPresenter;
  let viewModel: AvatarCameraViewModel;
  const camera = mockDeep<ArcRotateCamera>();

  beforeEach(() => {
    viewModel = new AvatarCameraViewModel();
    viewModel.camera.Value = camera;
    systemUnderTest = new AvatarCameraPresenter(viewModel);
  });

  //ANF-ID: [EWE0036, EWE0042]
  test("onStoryElementCutSceneTriggered disables camera controls if a story element intro or outro cutscene is triggered", () => {
    systemUnderTest.onStoryElementCutSceneTriggered(StoryElementType.None);

    expect(camera.detachControl).toHaveBeenCalledTimes(1);
  });

  //ANF-ID: [EWE0043]
  test("onStoryElementCutSceneFinished enables camera controls if a story element cutscene is finished", () => {
    systemUnderTest.onStoryElementCutSceneFinished();

    expect(camera.attachControl).toHaveBeenCalledTimes(1);
  });
});
