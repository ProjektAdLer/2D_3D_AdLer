import { mock, mockDeep } from "jest-mock-extended";
import StoryNPCController from "../../../../Core/Presentation/Babylon/StoryNPC/StoryNPCController";
import StoryNPCViewModel, {
  StoryNPCState,
} from "../../../../Core/Presentation/Babylon/StoryNPC/StoryNPCViewModel";
import CharacterNavigator from "../../../../Core/Presentation/Babylon/CharacterNavigator/CharacterNavigator";
import { Mesh, Vector3 } from "@babylonjs/core";
import INavigation from "../../../../Core/Presentation/Babylon/Navigation/INavigation";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import PRESENTATION_TYPES from "../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import IStoryElementPresenter from "../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/IStoryElementPresenter";
import { StoryElementType } from "../../../../Core/Domain/Types/StoryElementType";
import IBottomTooltipPresenter from "../../../../Core/Presentation/React/LearningSpaceDisplay/BottomTooltip/IBottomTooltipPresenter";

const characterNavigatorMock = mock<CharacterNavigator>();
const navigationMock = mockDeep<INavigation>();
const storyElementPresenterMock = mockDeep<IStoryElementPresenter>();
const bottomTooltipPresenterMock = mock<IBottomTooltipPresenter>();

describe("StoryNPCController", () => {
  let systemUnderTest: StoryNPCController;
  let viewModel: StoryNPCViewModel;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(CORE_TYPES.INavigation).toConstantValue(
      navigationMock,
    );
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IStoryElementPresenter,
    ).toConstantValue(storyElementPresenterMock);
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IBottomTooltipPresenter,
    ).toConstantValue(bottomTooltipPresenterMock);
  });

  beforeEach(() => {
    viewModel = new StoryNPCViewModel();
    viewModel.characterNavigator = characterNavigatorMock;
    systemUnderTest = new StoryNPCController(viewModel);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  //ANF-ID: [ELG0023]
  test("pointerOver calls BottomTooltipPresenter.displayExitQueryTooltip", () => {
    systemUnderTest.pointerOver();

    expect(bottomTooltipPresenterMock.display).toHaveBeenCalledTimes(1);
  });

  test("pointerOver scales up iconMeshes", () => {
    const mockedMesh = mockDeep<Mesh>();
    // @ts-ignore
    mockedMesh.scaling = Vector3.One();
    viewModel.iconMeshes = [mockedMesh];

    systemUnderTest.pointerOver();

    expect(mockedMesh.scaling).toStrictEqual(
      new Vector3(
        viewModel.iconScaleUpOnHover,
        viewModel.iconScaleUpOnHover,
        viewModel.iconScaleUpOnHover,
      ),
    );
  });

  //ANF-ID: [ELG0023]
  test("pointerOut calls hideBottomTooltip on tooltip presenter", () => {
    systemUnderTest["hoverToolTipId"] = 1; // set tooltip id to non-default value
    const mockedMesh = mockDeep<Mesh>();
    viewModel.iconMeshes = [mockedMesh];

    systemUnderTest.pointerOut();

    expect(bottomTooltipPresenterMock.hide).toHaveBeenCalledTimes(1);
  });

  test("pointerOut scales down iconMeshes", () => {
    const mockedMesh = mockDeep<Mesh>();
    viewModel.iconMeshes = [mockedMesh];
    systemUnderTest["hoverToolTipId"] = 1; // set tooltip id to non-default value

    systemUnderTest.pointerOut();

    expect(mockedMesh.scaling).toStrictEqual(Vector3.One());
  });

  test("pointerOut resets hoverToolTipId to -1 when hoverTooltipId is set", () => {
    systemUnderTest["hoverToolTipId"] = 1; // set tooltip id to non-default value
    const mockedMesh = mockDeep<Mesh>();
    viewModel.iconMeshes = [mockedMesh];

    systemUnderTest.pointerOut();

    expect(systemUnderTest["hoverToolTipId"]).toBe(-1);
  });

  // ANF-ID: [EWE0039]
  test("picked calls open on the storyElementPresenter when isInteractable is true", () => {
    viewModel.isInteractable.Value = true;
    viewModel.storyType = StoryElementType.Intro;

    systemUnderTest.picked();

    expect(storyElementPresenterMock.open).toBeCalledTimes(1);
  });

  // ANF-ID: [EWE0039]
  test("picked doesn't call open on the storyElementPresenter when isInteractable is false", () => {
    viewModel.isInteractable.Value = false;

    systemUnderTest.picked();

    expect(storyElementPresenterMock.open).not.toBeCalled();
  });

  test("picked sets state in viewmodel to Stop", () => {
    viewModel.isInteractable.Value = true;
    viewModel.state.Value = StoryNPCState.RandomMovement;

    systemUnderTest.picked();

    expect(viewModel.state.Value).toBe(StoryNPCState.Stop);
  });

  test("onAvatarInteractableChange calls displayTooltip when isInteractable is true", () => {
    viewModel.isInteractable.Value = true; // should automatically call onAvatarInteractableChange

    expect(bottomTooltipPresenterMock.display).toHaveBeenCalledTimes(1);
  });

  test("onAvatarInteractableChange calls hide on bottomTooltipPresenter when isInteractable is false", () => {
    systemUnderTest["proximityToolTipId"] = 42; // set tooltip id to non-default value

    viewModel.isInteractable.Value = true; // set to true to call display
    viewModel.isInteractable.Value = false; // should automatically call onAvatarInteractableChange

    expect(bottomTooltipPresenterMock.hide).toHaveBeenCalledTimes(1);
    expect(bottomTooltipPresenterMock.hide).toHaveBeenCalledWith(42);
  });

  test("accessibilityPicked calls onPicked", () => {
    //@ts-ignore
    const onPickedSpy = jest.spyOn(systemUnderTest, "onPicked");

    systemUnderTest.accessibilityPicked();

    expect(onPickedSpy).toHaveBeenCalledTimes(1);
  });
});
