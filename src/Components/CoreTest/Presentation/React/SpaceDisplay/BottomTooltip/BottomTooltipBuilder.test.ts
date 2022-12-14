import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IUIPort from "../../../../../Core/Ports/UIPort/IUIPort";
import BottomTooltipBuilder from "../../../../../Core/Presentation/React/SpaceDisplay/BottomTooltip/BottomTooltipBuilder";
import BottomTooltipPresenter from "../../../../../Core/Presentation/React/SpaceDisplay/BottomTooltip/BottomTooltipPresenter";
import BottomTooltipViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/BottomTooltip/BottomTooltipViewModel";
import IViewModelControllerProvider from "../../../../../Core/Presentation/ViewModelProvider/IViewModelControllerProvider";

const viewModelControllerProviderMock = mock<IViewModelControllerProvider>();
const UIPortMock = mock<IUIPort>();

describe("BottomTooltipBuilder", () => {
  let systemUnderTest: BottomTooltipBuilder;
  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.IUIPort).toConstantValue(UIPortMock);
    CoreDIContainer.rebind(
      CORE_TYPES.IViewModelControllerProvider
    ).toConstantValue(viewModelControllerProviderMock);
  });
  beforeEach(() => {
    systemUnderTest = new BottomTooltipBuilder();
  });
  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildPresenter builds the presenter", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(BottomTooltipPresenter);
    expect(UIPortMock.registerBottomTooltipPresenter).toHaveBeenCalledTimes(1);
    expect(UIPortMock.registerBottomTooltipPresenter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
