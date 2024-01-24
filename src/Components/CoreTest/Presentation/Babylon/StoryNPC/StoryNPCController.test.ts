import { mock, mockDeep } from "jest-mock-extended";
import StoryNPCController from "../../../../Core/Presentation/Babylon/StoryNPC/StoryNPCController";
import StoryNPCViewModel from "../../../../Core/Presentation/Babylon/StoryNPC/StoryNPCViewModel";
import CharacterNavigator from "../../../../Core/Presentation/Babylon/CharacterNavigator/CharacterNavigator";
import { NullEngine, Scene, TransformNode, Vector3 } from "@babylonjs/core";
import INavigation from "../../../../Core/Presentation/Babylon/Navigation/INavigation";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import PRESENTATION_TYPES from "../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import IStoryElementPresenter from "../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/IStoryElementPresenter";
import { StoryElementType } from "../../../../Core/Domain/Types/StoryElementType";

const characterNavigatorMock = mock<CharacterNavigator>();
const navigationMock = mockDeep<INavigation>();
const storyElementPresenterMock = mockDeep<IStoryElementPresenter>();

describe("StoryNPCController", () => {
  let systemUnderTest: StoryNPCController;
  let viewModel: StoryNPCViewModel;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(CORE_TYPES.INavigation).toConstantValue(
      navigationMock
    );
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IStoryElementPresenter
    ).toConstantValue(storyElementPresenterMock);
  });

  beforeEach(() => {
    viewModel = new StoryNPCViewModel();
    viewModel.characterNavigator = characterNavigatorMock;
    systemUnderTest = new StoryNPCController(viewModel);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("picked calls open on the storyElementPresenter when isInteractable is true", () => {
    viewModel.isInteractable.Value = true;
    viewModel.storyType = StoryElementType.Intro;

    systemUnderTest.picked();

    expect(storyElementPresenterMock.open).toBeCalledTimes(1);
  });

  test("picked doesn't call open on the storyElementPresenter when isInteractable is false", () => {
    viewModel.isInteractable.Value = false;

    systemUnderTest.picked();

    expect(storyElementPresenterMock.open).not.toBeCalled();
  });

  test("setRandomTarget calls startMovement on the characterNavigator with a target", () => {
    navigationMock.Plugin.getRandomPointAround.mockReturnValue(
      new Vector3(2, 0, 2)
    );
    viewModel.parentNode = new TransformNode(
      "mockParentNode",
      new Scene(new NullEngine())
    );
    viewModel.parentNode.position = new Vector3(0, 0, 0);

    systemUnderTest.setRandomMovementTarget();

    expect(characterNavigatorMock.startMovement).toBeCalledTimes(1);
    expect(characterNavigatorMock.startMovement).toBeCalledWith(
      expect.any(Vector3),
      systemUnderTest["startIdleTimeout"]
    );
  });

  test("startIdleTimeout calls setRandomTarget after the idleTime", () => {
    navigationMock.Plugin.getRandomPointAround.mockReturnValue(
      new Vector3(2, 0, 2)
    );
    viewModel.parentNode = new TransformNode(
      "mockParentNode",
      new Scene(new NullEngine())
    );
    viewModel.parentNode.position = new Vector3(0, 0, 0);

    jest.useFakeTimers();
    const setRandomMovementTargetMock = jest.spyOn(
      systemUnderTest,
      "setRandomMovementTarget"
    );

    systemUnderTest["startIdleTimeout"]();

    expect(setRandomMovementTargetMock).not.toBeCalled();

    jest.advanceTimersByTime(viewModel.idleTime);

    expect(setRandomMovementTargetMock).toBeCalledTimes(1);
  });
});
