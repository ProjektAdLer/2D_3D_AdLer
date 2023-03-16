import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import WorldMenuButtonBuilder from "../../../../../Core/Presentation/React/WelcomePage/WorldMenuButton/WorldMenuButtonBuilder";
import WorldMenuButtonPresenter from "../../../../../Core/Presentation/React/WelcomePage/WorldMenuButton/WorldMenuButtonPresenter";
import ILMSPort from "../../../../../Core/Application/Ports/Interfaces/ILMSPort";

const lmsPortMock = mock<ILMSPort>();

describe("WorldMenuButtonBuilder", () => {
  let systemUnderTest: WorldMenuButtonBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.ILMSPort).toConstantValue(lmsPortMock);
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
