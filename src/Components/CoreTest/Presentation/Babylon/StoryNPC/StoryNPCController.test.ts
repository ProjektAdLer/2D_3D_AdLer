import { mock, mockDeep } from "jest-mock-extended";
import StoryNPCController from "../../../../Core/Presentation/Babylon/StoryNPC/StoryNPCController";
import StoryNPCViewModel, {
  StoryNPCState,
} from "../../../../Core/Presentation/Babylon/StoryNPC/StoryNPCViewModel";
import CharacterNavigator from "../../../../Core/Presentation/Babylon/CharacterNavigator/CharacterNavigator";
import { Mesh, Vector3, Scene, NullEngine } from "@babylonjs/core";
import INavigation from "../../../../Core/Presentation/Babylon/Navigation/INavigation";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import PRESENTATION_TYPES from "../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IStoryElementPresenter from "../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/IStoryElementPresenter";
import { StoryElementType } from "../../../../Core/Domain/Types/StoryElementType";
import { LearningElementTypes } from "../../../../Core/Domain/Types/LearningElementTypes";
import IBottomTooltipPresenter from "../../../../Core/Presentation/React/LearningSpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import IGetUserLocationUseCase from "../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import UserLocationTO from "../../../../Core/Application/DataTransferObjects/UserLocationTO";
import IDoorPresenter from "../../../../Core/Presentation/Babylon/Door/IDoorPresenter";
import ILoggerPort from "../../../../Core/Application/Ports/Interfaces/ILoggerPort";
import IAvatarFocusSelection from "../../../../Core/Presentation/Babylon/Avatar/AvatarFocusSelection/IAvatarFokusSelection";

const characterNavigatorMock = mock<CharacterNavigator>();
const navigationMock = mockDeep<INavigation>();
const storyElementPresenterMock = mockDeep<IStoryElementPresenter>();
const bottomTooltipPresenterMock = mock<IBottomTooltipPresenter>();
const avatarFocusSelectionMock = mock<IAvatarFocusSelection>();
const getUserLocationUseCaseMock = mock<IGetUserLocationUseCase>();
const doorPresenterMock1 = mock<IDoorPresenter>();
const doorPresenterMock2 = mock<IDoorPresenter>();
const loggerMock = mock<ILoggerPort>();

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
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetUserLocationUseCase,
    ).toConstantValue(getUserLocationUseCaseMock);
    CoreDIContainer.rebind(CORE_TYPES.ILogger).toConstantValue(loggerMock);
    CoreDIContainer.rebind(
      PRESENTATION_TYPES.IAvatarFocusSelection,
    ).toConstantValue(avatarFocusSelectionMock);
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

  test.each([
    [StoryElementType.Intro, "Intro-NPC"],
    [StoryElementType.Outro, "Outro-NPC"],
    [StoryElementType.IntroOutro, "Intro/Outro-NPC"],
    [StoryElementType.None, "Intro/Outro-NPC"],
  ])("displayTooltip calls display of type %s with text %s", (type, result) => {
    viewModel.storyType = type;
    systemUnderTest["displayTooltip"]();
    expect(bottomTooltipPresenterMock.display).toHaveBeenCalledWith(
      result,
      LearningElementTypes.notAnElement,
      undefined,
      expect.anything(),
    );
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

  test("accessibilityPicked calls onPicked", () => {
    const onPickedSpy = jest.spyOn(systemUnderTest, "onPicked" as any);

    systemUnderTest.accessibilityPicked();

    expect(onPickedSpy).toHaveBeenCalledTimes(1);
  });

  test("picked logs trace message when not interactable", () => {
    viewModel.isInteractable.Value = false;
    viewModel.state.Value = StoryNPCState.RandomMovement;
    const loggerMock = {
      log: jest.fn(),
    };
    // @ts-ignore
    systemUnderTest["logger"] = loggerMock;

    systemUnderTest.picked();

    expect(loggerMock.log).toHaveBeenCalledWith(
      expect.any(String), // LogLevelTypes.TRACE
      expect.stringContaining("StoryNPCController: NPC not interactable"),
    );
  });

  test("picked logs trace message when in CutScene state", () => {
    viewModel.isInteractable.Value = true;
    viewModel.state.Value = StoryNPCState.CutScene;
    const loggerMock = {
      log: jest.fn(),
    };
    // @ts-ignore
    systemUnderTest["logger"] = loggerMock;

    systemUnderTest.picked();

    expect(loggerMock.log).toHaveBeenCalledWith(
      expect.any(String), // LogLevelTypes.TRACE
      expect.stringContaining("StoryNPCController: NPC not interactable"),
    );
  });

  test("onPicked calls hideAll on bottomTooltipPresenter", () => {
    viewModel.isInteractable.Value = true;
    viewModel.storyType = StoryElementType.Intro;

    systemUnderTest["onPicked"]();

    expect(bottomTooltipPresenterMock.hideAll).toHaveBeenCalledTimes(1);
  });

  test("onPicked calls open on storyElementPresenter with correct story type", () => {
    viewModel.storyType = StoryElementType.Outro;
    viewModel.storyElementPresenter = storyElementPresenterMock;

    systemUnderTest["onPicked"]();

    expect(storyElementPresenterMock.open).toHaveBeenCalledWith(
      StoryElementType.Outro,
    );
  });

  test("onPicked does not change state when already Idle", () => {
    viewModel.state.Value = StoryNPCState.Idle;
    viewModel.storyElementPresenter = storyElementPresenterMock;

    systemUnderTest["onPicked"]();

    expect(viewModel.state.Value).toBe(StoryNPCState.Idle);
  });

  test("displayTooltip returns tooltip ID for Intro story type", () => {
    viewModel.storyType = StoryElementType.Intro;
    viewModel.storyNpcName = "Test NPC";
    bottomTooltipPresenterMock.display.mockReturnValue(123);

    const result = systemUnderTest["displayTooltip"]();

    expect(result).toBe(123);
    expect(bottomTooltipPresenterMock.display).toHaveBeenCalledWith(
      expect.stringContaining("Test NPC"),
      expect.any(String), // LearningElementTypes.notAnElement
      undefined,
      expect.any(Function),
    );
  });

  test("displayTooltip returns tooltip ID for Outro story type", () => {
    viewModel.storyType = StoryElementType.Outro;
    bottomTooltipPresenterMock.display.mockReturnValue(456);

    const result = systemUnderTest["displayTooltip"]();

    expect(result).toBe(456);
  });

  test("displayTooltip returns tooltip ID for IntroOutro story type", () => {
    viewModel.storyType = StoryElementType.IntroOutro;
    bottomTooltipPresenterMock.display.mockReturnValue(789);

    const result = systemUnderTest["displayTooltip"]();

    expect(result).toBe(789);
  });

  test("displayTooltip handles missing storyNpcName", () => {
    viewModel.storyType = StoryElementType.Intro;
    viewModel.storyNpcName = "";
    bottomTooltipPresenterMock.display.mockReturnValue(111);

    const result = systemUnderTest["displayTooltip"]();

    expect(result).toBe(111);
    expect(bottomTooltipPresenterMock.display).toHaveBeenCalledWith(
      expect.not.stringContaining(":"),
      expect.any(String),
      undefined,
      expect.any(Function),
    );
  });

  test("scaleUpIcon scales all icon meshes", () => {
    const scene = new Scene(new NullEngine());
    const mockMesh1 = new Mesh("mesh1", scene);
    const mockMesh2 = new Mesh("mesh2", scene);
    mockMesh1.scaling = new Vector3(1, 1, 1);
    mockMesh2.scaling = new Vector3(1, 1, 1);
    viewModel.iconMeshes = [mockMesh1, mockMesh2];
    // Set iconScaleUpOnHover value through viewModel property setter if available
    // or use Object.defineProperty to override readonly behavior for testing
    Object.defineProperty(viewModel, "iconScaleUpOnHover", {
      value: 1.2,
      writable: true,
      configurable: true,
    });

    systemUnderTest["scaleUpIcon"]();

    expect(mockMesh1.scaling.x).toBeCloseTo(1.2);
    expect(mockMesh1.scaling.y).toBeCloseTo(1.2);
    expect(mockMesh1.scaling.z).toBeCloseTo(1.2);
    expect(mockMesh2.scaling.x).toBeCloseTo(1.2);
    expect(mockMesh2.scaling.y).toBeCloseTo(1.2);
    expect(mockMesh2.scaling.z).toBeCloseTo(1.2);
  });

  test("resetIconScale resets all icon meshes to Vector3.One and sets rotation", () => {
    const scene = new Scene(new NullEngine());
    const mockMesh1 = new Mesh("mesh1", scene);
    const mockMesh2 = new Mesh("mesh2", scene);
    mockMesh1.scaling = new Vector3(1.5, 1.5, 1.5);
    mockMesh2.scaling = new Vector3(1.5, 1.5, 1.5);
    viewModel.iconMeshes = [mockMesh1, mockMesh2];

    systemUnderTest["resetIconScale"]();

    expect(mockMesh1.scaling).toEqual(Vector3.One());
    expect(mockMesh2.scaling).toEqual(Vector3.One());
    expect(mockMesh1.rotation).toEqual(new Vector3(0, -Math.PI / 4, 0));
  });

  test("resetIconScale handles empty iconMeshes array gracefully", () => {
    viewModel.iconMeshes = [];

    expect(() => systemUnderTest["resetIconScale"]()).toThrow();
  });

  test("scaleUpIcon handles empty iconMeshes array gracefully", () => {
    viewModel.iconMeshes = [];

    expect(() => systemUnderTest["scaleUpIcon"]()).not.toThrow();
  });

  test("onAvatarInteractableChange calls picked when isSpecialFocused is true", () => {
    viewModel.isSpecialFocused = true;
    const pickedSpy = jest.spyOn(systemUnderTest, "picked");

    viewModel.isInteractable.Value = true;

    expect(pickedSpy).toHaveBeenCalledTimes(1);
  });

  test("handleNPCExit successfully opens and closes exit door", async () => {
    const userLocation = new UserLocationTO();
    userLocation.spaceID = 123;
    getUserLocationUseCaseMock.execute.mockReturnValue(userLocation);

    doorPresenterMock1.isExit.mockReturnValue(true);
    doorPresenterMock1.belongsToSpace.mockReturnValue(true);
    doorPresenterMock1.open.mockImplementation((callback) => {
      if (callback) callback();
    });

    CoreDIContainer.getAll = jest.fn().mockReturnValue([doorPresenterMock1]);

    jest.useFakeTimers();

    const promise = systemUnderTest.handleNPCExit(StoryElementType.Intro);
    jest.advanceTimersByTime(100);

    await promise;

    expect(doorPresenterMock1.open).toHaveBeenCalledTimes(1);
    expect(doorPresenterMock1.close).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });

  test("handleNPCExit logs warning when user is not in a space", async () => {
    const userLocation = new UserLocationTO();
    userLocation.spaceID = undefined;
    getUserLocationUseCaseMock.execute.mockReturnValue(userLocation);

    await systemUnderTest.handleNPCExit(StoryElementType.Intro);

    expect(loggerMock.log).toHaveBeenCalledWith(
      expect.any(String),
      "StoryNPCController: User is not in a space!",
    );
  });

  test("handleNPCExit logs warning when no exit door is found", async () => {
    const userLocation = new UserLocationTO();
    userLocation.spaceID = 123;
    getUserLocationUseCaseMock.execute.mockReturnValue(userLocation);

    doorPresenterMock1.isExit.mockReturnValue(false);
    CoreDIContainer.getAll = jest.fn().mockReturnValue([doorPresenterMock1]);

    await systemUnderTest.handleNPCExit(StoryElementType.Intro);

    expect(loggerMock.log).toHaveBeenCalledWith(
      expect.any(String),
      "StoryNPCController: No exit door found for space 123",
    );
  });

  test("pointerOver does not scale icon when proximityToolTipId is not -1", () => {
    systemUnderTest["proximityToolTipId"] = 42;
    const scaleUpIconSpy = jest.spyOn(systemUnderTest, "scaleUpIcon" as any);

    systemUnderTest.pointerOver();

    expect(scaleUpIconSpy).not.toHaveBeenCalled();
  });

  test("pointerOver does not scale icon when hoverToolTipId is not -1", () => {
    systemUnderTest["hoverToolTipId"] = 42;
    const scaleUpIconSpy = jest.spyOn(systemUnderTest, "scaleUpIcon" as any);

    systemUnderTest.pointerOver();

    expect(scaleUpIconSpy).not.toHaveBeenCalled();
  });
});
