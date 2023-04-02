import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import BottomTooltipBuilder from "../../../../../Core/Presentation/React/LearningSpaceDisplay/BottomTooltip/BottomTooltipBuilder";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import { mock } from "jest-mock-extended";
import IBottomTooltipPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/BottomTooltip/IBottomTooltipPresenter";

describe("BottomTooltipBuilder", () => {
  let systemUnderTest: BottomTooltipBuilder;

  beforeEach(() => {
    systemUnderTest = new BottomTooltipBuilder();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("buildPresenter registers presenter with the CoreDIContainer", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(
      CoreDIContainer.isBound(PRESENTATION_TYPES.IBottomTooltipPresenter)
    ).toBe(true);
    expect(
      CoreDIContainer.get(PRESENTATION_TYPES.IBottomTooltipPresenter)
    ).toBe(systemUnderTest.getPresenter()!);
  });

  test("buildPresenter unbinds the presenter if it is already bound", () => {
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IBottomTooltipPresenter
    ).toConstantValue(mock<IBottomTooltipPresenter>);

    const unbindSpy = jest.spyOn(CoreDIContainer, "unbind");

    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(unbindSpy).toHaveBeenCalledTimes(1);
  });
});
