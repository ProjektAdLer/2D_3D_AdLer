import { ActionEvent } from "@babylonjs/core";
import { mock } from "jest-mock-extended";
import ILoadElementUseCase from "../../../../Core/Application/UseCases/ElementStarted/ILoadElementUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import ElementController from "../../../../Core/Presentation/Babylon/Elements/ElementController";
import ElementViewModel from "../../../../Core/Presentation/Babylon/Elements/ElementViewModel";
import IBottomTooltipPresenter from "../../../../Core/Presentation/React/SpaceDisplay/BottomTooltip/IBottomTooltipPresenter";

const elementStartedUseCaseMock = mock<ILoadElementUseCase>();
const bottomTooltipPresenterMock = mock<IBottomTooltipPresenter>();

describe("ElementController", () => {
  let viewModel: ElementViewModel;
  let systemUnderTest: ElementController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(USECASE_TYPES.ILoadElementUseCase).toConstantValue(
      elementStartedUseCaseMock
    );
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IBottomTooltipPresenter
    ).toConstantValue(bottomTooltipPresenterMock);
  });

  beforeEach(() => {
    viewModel = new ElementViewModel();
    systemUnderTest = new ElementController(viewModel);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("pointerOver calls IUIPort.displayElementSummaryTooltip", () => {
    systemUnderTest.pointerOver();

    expect(
      bottomTooltipPresenterMock.displayElementSummaryTooltip
    ).toHaveBeenCalledTimes(1);
  });

  test("pointerOut calls IUIPort.hideBottomTooltip", () => {
    systemUnderTest.pointerOut();

    expect(bottomTooltipPresenterMock.hide).toHaveBeenCalledTimes(1);
  });

  test("clicked calls IElementStartedUseCase.executeAsync when pointerType is mouse", () => {
    viewModel.id = 42;
    const mockedEvent: ActionEvent = {
      sourceEvent: {
        pointerType: "mouse",
      },
      source: undefined,
      pointerX: 0,
      pointerY: 0,
      meshUnderPointer: null,
    };

    systemUnderTest.clicked(mockedEvent);

    expect(elementStartedUseCaseMock.executeAsync).toHaveBeenCalledTimes(1);
    expect(elementStartedUseCaseMock.executeAsync).toHaveBeenCalledWith(42);
  });

  test("clicked calls IUIPort.displayElementSummaryTooltip when pointerType is touch", () => {
    const mockedEvent: ActionEvent = {
      sourceEvent: {
        pointerType: "touch",
      },
      source: undefined,
      pointerX: 0,
      pointerY: 0,
      meshUnderPointer: null,
    };

    systemUnderTest.clicked(mockedEvent);

    expect(
      bottomTooltipPresenterMock.displayElementSummaryTooltip
    ).toHaveBeenCalledTimes(1);
  });
});
