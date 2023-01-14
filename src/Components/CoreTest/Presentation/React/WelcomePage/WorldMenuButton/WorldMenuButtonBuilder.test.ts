import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ILMSPort from "../../../../../Core/Ports/LMSPort/ILMSPort";
import IViewModelControllerProvider from "../../../../../Core/Presentation/ViewModelProvider/IViewModelControllerProvider";
import WorldMenuButtonBuilder from "../../../../../Core/Presentation/React/WelcomePage/WorldMenuButton/WorldMenuButtonBuilder";
import WorldMenuButtonPresenter from "../../../../../Core/Presentation/React/WelcomePage/WorldMenuButton/WorldMenuButtonPresenter";

const viewModelControllerProviderMock = mock<IViewModelControllerProvider>();
const lmsPortMock = mock<ILMSPort>();

describe("WorldMenuButtonBuilder", () => {
  let systemUnderTest: WorldMenuButtonBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.ILMSPort).toConstantValue(lmsPortMock);
    CoreDIContainer.rebind(
      CORE_TYPES.IViewModelControllerProvider
    ).toConstantValue(viewModelControllerProviderMock);
  });

  beforeEach(() => {
    systemUnderTest = new WorldMenuButtonBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildPresenter builds the presenter", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(
      WorldMenuButtonPresenter
    );
  });
});
