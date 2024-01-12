import { NullEngine, Scene, TransformNode, Vector3 } from "@babylonjs/core";
import StoryNPCPresenter from "../../../../Core/Presentation/Babylon/StoryNPC/StoryNPCPresenter";
import StoryNPCViewModel from "../../../../Core/Presentation/Babylon/StoryNPC/StoryNPCViewModel";

describe("StoryNPCPresenter", () => {
  let systemUnderTest: StoryNPCPresenter;
  let viewModel: StoryNPCViewModel;

  beforeEach(() => {
    viewModel = new StoryNPCViewModel();
    systemUnderTest = new StoryNPCPresenter(viewModel);
  });

  test("onAvatarPositionChanged sets isInteractable to true when the avatar is in the interaction radius", () => {
    viewModel.parentNode = new TransformNode(
      "mockParentNode",
      new Scene(new NullEngine())
    );
    viewModel.parentNode.position = new Vector3(0, 0, 0);
    viewModel.isInteractable.Value = false;
    systemUnderTest.onAvatarPositionChanged(new Vector3(0, 0, 0), 1);

    expect(viewModel.isInteractable.Value).toBe(true);
  });

  test("onAvatarPositionChanged sets isInteractable to false when the avatar is outside the interaction radius", () => {
    viewModel.parentNode = new TransformNode(
      "mockParentNode",
      new Scene(new NullEngine())
    );
    viewModel.parentNode.position = new Vector3(0, 0, 0);
    viewModel.isInteractable.Value = true;
    systemUnderTest.onAvatarPositionChanged(new Vector3(0, 0, 2), 1);

    expect(viewModel.isInteractable.Value).toBe(false);
  });

  test("onStoryElementLoaded sets isIntro to false when the introTexts are undefined", () => {
    viewModel.isIntro = true;
    systemUnderTest.onStoryElementLoaded({ introTexts: undefined } as any);

    expect(viewModel.isIntro).toBe(false);
  });

  test("onStoryElementLoaded sets isIntro to false when the introTexts are empty", () => {
    viewModel.isIntro = true;
    systemUnderTest.onStoryElementLoaded({ introTexts: [] } as any);

    expect(viewModel.isIntro).toBe(false);
  });

  test("onStoryElementLoaded sets isIntro to true when the introTexts are not empty", () => {
    viewModel.isIntro = false;
    systemUnderTest.onStoryElementLoaded({ introTexts: ["test"] } as any);

    expect(viewModel.isIntro).toBe(true);
  });

  test("onStoryElementLoaded sets isOutro to false when the outroTexts are undefined", () => {
    viewModel.isOutro = true;
    systemUnderTest.onStoryElementLoaded({ outroTexts: undefined } as any);

    expect(viewModel.isOutro).toBe(false);
  });

  test("onStoryElementLoaded sets isOutro to false when the outroTexts are empty", () => {
    viewModel.isOutro = true;
    systemUnderTest.onStoryElementLoaded({ outroTexts: [] } as any);

    expect(viewModel.isOutro).toBe(false);
  });

  test("onStoryElementLoaded sets isOutro to true when the outroTexts are not empty", () => {
    viewModel.isOutro = false;
    systemUnderTest.onStoryElementLoaded({ outroTexts: ["test"] } as any);

    expect(viewModel.isOutro).toBe(true);
  });
});
