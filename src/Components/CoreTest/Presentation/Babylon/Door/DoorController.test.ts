import { ActionEvent } from "@babylonjs/core";
import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import DoorController from "../../../../Core/Presentation/Babylon/Door/DoorController";
import DoorViewModel from "../../../../Core/Presentation/Babylon/Door/DoorViewModel";
import IBottomTooltipPresenter from "../../../../Core/Presentation/React/SpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import PRESENTATION_TYPES from "../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";

const bottomTooltipPresenterMock = mock<IBottomTooltipPresenter>();

describe("DoorController", () => {
  let viewModel: DoorViewModel;
  let systemUnderTest: DoorController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IBottomTooltipPresenter
    ).toConstantValue(bottomTooltipPresenterMock);
  });

  beforeEach(() => {
    viewModel = new DoorViewModel();
    systemUnderTest = new DoorController(viewModel);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("pointerOver calls BottomTooltipPresenter.displayExitQueryTooltip", () => {
    systemUnderTest.pointerOver();

    expect(
      bottomTooltipPresenterMock.displayExitQueryTooltip
    ).toHaveBeenCalledTimes(1);
  });

  test("pointerOut calls BottomTooltipPresenter.hide", () => {
    systemUnderTest.pointerOut();

    expect(bottomTooltipPresenterMock.hide).toHaveBeenCalledTimes(1);
  });

  test("clicked calls BottomTooltipPresenter.displayExitQueryTooltip when pointerType is touch", () => {
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
      bottomTooltipPresenterMock.displayExitQueryTooltip
    ).toHaveBeenCalledTimes(1);
  });
});
