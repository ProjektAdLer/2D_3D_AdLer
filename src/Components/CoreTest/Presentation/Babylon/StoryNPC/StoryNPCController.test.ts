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
import Observable from "../../../../../Lib/Observable";

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
    viewModel.isInCutScene = new Observable<boolean>(false, false);
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
});
