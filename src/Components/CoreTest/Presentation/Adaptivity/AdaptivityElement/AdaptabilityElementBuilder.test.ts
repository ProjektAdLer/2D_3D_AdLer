import mock from "jest-mock-extended/lib/Mock";
import AdaptivityElementBuilder from "../../../../Core/Presentation/Adaptivity/AdaptivityElement/AdaptivityElementBuilder";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";

const worldPortMock = mock<ILearningWorldPort>();

describe("AdaptivityElementBuilder", () => {
  let systemUnderTest: AdaptivityElementBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).toConstantValue(worldPortMock);
  });

  beforeEach(() => {
    systemUnderTest = new AdaptivityElementBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildPresenter builds the presenter and registers it with the WorldPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(worldPortMock.registerAdapter).toHaveBeenCalledTimes(1);
    expect(worldPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});