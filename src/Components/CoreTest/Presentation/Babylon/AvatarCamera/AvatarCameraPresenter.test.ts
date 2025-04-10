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
    jest.useFakeTimers();
    systemUnderTest.onStoryElementCutSceneTriggered(StoryElementType.None);
    jest.advanceTimersByTime(25);

    expect(camera.detachControl).toHaveBeenCalledTimes(1);
  });

  //ANF-ID: [EWE0043]
  test("onStoryElementCutSceneFinished enables camera controls if a story element cutscene is finished", () => {
    jest.useFakeTimers();
    systemUnderTest.onStoryElementCutSceneFinished();
    jest.advanceTimersByTime(25);

    expect(camera.attachControl).toHaveBeenCalledTimes(1);
  });
});
