import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import LearningWorldMenuButtonBuilder from "../../../../../Core/Presentation/React/WelcomePage/LearningWorldMenuButton/LearningWorldMenuButtonBuilder";
import LearningWorldMenuButtonPresenter from "../../../../../Core/Presentation/React/WelcomePage/LearningWorldMenuButton/LearningWorldMenuButtonPresenter";
import ILMSPort from "../../../../../Core/Application/Ports/Interfaces/ILMSPort";

const lmsPortMock = mock<ILMSPort>();

describe("LearningWorldMenuButtonBuilder", () => {
  let systemUnderTest: LearningWorldMenuButtonBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.ILMSPort).toConstantValue(lmsPortMock);
  });

  beforeEach(() => {
    systemUnderTest = new LearningWorldMenuButtonBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildPresenter builds the presenter", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(
      LearningWorldMenuButtonPresenter
    );
  });
});
