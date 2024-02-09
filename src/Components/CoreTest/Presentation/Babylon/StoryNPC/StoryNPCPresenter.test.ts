import { NullEngine, Scene, TransformNode, Vector3 } from "@babylonjs/core";
import StoryNPCPresenter from "../../../../Core/Presentation/Babylon/StoryNPC/StoryNPCPresenter";
import StoryNPCViewModel, {
  StoryNPCState,
} from "../../../../Core/Presentation/Babylon/StoryNPC/StoryNPCViewModel";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import { mockDeep } from "jest-mock-extended";
import IStoryElementPresenter from "../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/IStoryElementPresenter";

const storyElementPresenterMock = mockDeep<IStoryElementPresenter>();

describe("StoryNPCPresenter", () => {
  let systemUnderTest: StoryNPCPresenter;
  let viewModel: StoryNPCViewModel;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IStoryElementPresenter
    ).toConstantValue(storyElementPresenterMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

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

  test("onStoryElementCutSceneFinished sets state to RandomMovement when currently CutScene is set", () => {
    viewModel.state.Value = StoryNPCState.CutScene;
    systemUnderTest.onStoryElementCutSceneFinished();

    expect(viewModel.state.Value).toBe(StoryNPCState.RandomMovement);
  });
});
