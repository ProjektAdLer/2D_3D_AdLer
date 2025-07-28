import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import DoorController from "../../../../Core/Presentation/Babylon/Door/DoorController";
import DoorViewModel from "../../../../Core/Presentation/Babylon/Door/DoorViewModel";
import IBottomTooltipPresenter from "../../../../Core/Presentation/React/LearningSpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import PRESENTATION_TYPES from "../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import IExitModalPresenter from "../../../../Core/Presentation/React/LearningSpaceDisplay/ExitModal/IExitModalPresenter";
import IGetLearningSpacePrecursorAndSuccessorUseCase from "../../../../Core/Application/UseCases/GetLearningSpacePrecursorAndSuccessor/IGetLearningSpacePrecursorAndSuccessorUseCase";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";

const bottomTooltipPresenterMock = mock<IBottomTooltipPresenter>();
const exitModalPresenterMock = mock<IExitModalPresenter>();
const getLearningSpacePrecursorAndSuccessorUseCaseMock =
  mock<IGetLearningSpacePrecursorAndSuccessorUseCase>();

describe("DoorController", () => {
  let viewModel: DoorViewModel;
  let systemUnderTest: DoorController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.unbindAll();
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IBottomTooltipPresenter,
    ).toConstantValue(bottomTooltipPresenterMock);
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IExitModalPresenter,
    ).toConstantValue(exitModalPresenterMock);
    CoreDIContainer.bind(
      USECASE_TYPES.IGetLearningSpacePrecursorAndSuccessorUseCase,
    ).toConstantValue(getLearningSpacePrecursorAndSuccessorUseCaseMock);
  });

  beforeEach(() => {
    viewModel = new DoorViewModel();
    systemUnderTest = new DoorController(viewModel);

    bottomTooltipPresenterMock.display.mockClear();
    bottomTooltipPresenterMock.hide.mockClear();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  //ANF-ID: [ELG0022]
  test("pointerOver calls BottomTooltipPresenter.displayExitQueryTooltip", () => {
    systemUnderTest.pointerOver();

    expect(bottomTooltipPresenterMock.display).toHaveBeenCalledTimes(1);
  });

  //ANF-ID: [ELG0022]
  test("pointerOut calls BottomTooltipPresenter.hide when hoverTooltipId is set", () => {
    systemUnderTest["hoverToolTipId"] = 1; // set tooltip id to non-default value

    systemUnderTest.pointerOut();

    expect(bottomTooltipPresenterMock.hide).toHaveBeenCalledTimes(1);
  });

  test("pointerOut resets hoverToolTipId to -1 when hoverTooltipId is set", () => {
    systemUnderTest["hoverToolTipId"] = 1; // set tooltip id to non-default value

    systemUnderTest.pointerOut();

    expect(systemUnderTest["hoverToolTipId"]).toBe(-1);
  });

  // ANF-ID: [EWE0032]
  test("picked calls getLearningSpacePrecursorAndSuccessorUseCase.execute when isInteractable is set to true", () => {
    systemUnderTest["viewModel"].isInteractable.Value = true;

    systemUnderTest.picked();

    expect(
      getLearningSpacePrecursorAndSuccessorUseCaseMock.execute,
    ).toHaveBeenCalledTimes(1);
  });

  // ANF-ID: [EWE0032]
  test("picked calls ExitModalPresenter.open when isInteractable is set to true", () => {
    systemUnderTest["viewModel"].isInteractable.Value = true;

    systemUnderTest.picked();

    expect(exitModalPresenterMock.open).toHaveBeenCalledTimes(1);
  });

  test("onAvatarInteractableChange calls BottomTooltipPresenter.display when isInteractable is set to true", () => {
    systemUnderTest["viewModel"].isInteractable.Value = false;

    systemUnderTest["onAvatarInteractableChange"](true);

    expect(bottomTooltipPresenterMock.display).toHaveBeenCalledTimes(1);
  });

  test("onAvatarInteractableChange calls BottomTooltipPresenter.hide when isInteractable is set to false and proximityTooltipId is set", () => {
    systemUnderTest["proximityToolTipId"] = 1; // set tooltip id to non-default value
    systemUnderTest["viewModel"].isInteractable.Value = false;

    systemUnderTest["onAvatarInteractableChange"](false);

    expect(bottomTooltipPresenterMock.hide).toHaveBeenCalledTimes(1);
  });

  test("onAvatarInteractableChange resets proximityTooltipId to -1 when isInteractable is set to false and proximityTooltipId is set", () => {
    systemUnderTest["proximityToolTipId"] = 1; // set tooltip id to non-default value
    systemUnderTest["viewModel"].isInteractable.Value = false;

    systemUnderTest["onAvatarInteractableChange"](false);

    expect(systemUnderTest["proximityToolTipId"]).toBe(-1);
  });

  test("onAvatarInteractableChange calls picked if its special focused", () => {
    systemUnderTest["viewModel"].isInteractable.Value = true;
    systemUnderTest["viewModel"].isSpecialFocused = true;

    const pickedSpy = jest.spyOn(systemUnderTest, "picked");

    systemUnderTest["onAvatarInteractableChange"](true);

    expect(pickedSpy).toHaveBeenCalledTimes(1);
  });

  test("accessibilityPicked calls onPicked", () => {
    //@ts-ignore
    const onPickedSpy = jest.spyOn(systemUnderTest, "onPicked");

    systemUnderTest.accessibilityPicked();

    expect(onPickedSpy).toHaveBeenCalledTimes(1);
  });
});
