import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ILMSPort from "../../../../../Core/Application/Ports/Interfaces/ILMSPort";
import WelcomePageButtonBuilder from "../../../../../Core/Presentation/React/WelcomePage/WelcomePageButton/WelcomePageButtonBuilder";
import WelcomePageButtonPresenter from "../../../../../Core/Presentation/React/WelcomePage/WelcomePageButton/WelcomePageButtonPresenter";

const lmsPortMock = mock<ILMSPort>();

describe("WelcomePageButtonBuilder", () => {
  let systemUnderTest: WelcomePageButtonBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.ILMSPort).toConstantValue(lmsPortMock);
  });

  beforeEach(() => {
    systemUnderTest = new WelcomePageButtonBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildPresenter builds the presenter", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(
      WelcomePageButtonPresenter,
    );
  });
});
