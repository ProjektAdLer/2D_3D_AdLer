import mock from "jest-mock-extended/lib/Mock";
import AdaptivityElementBuilder from "../../../../Core/Presentation/Adaptivity/AdaptivityElement/AdaptivityElementBuilder";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import PRESENTATION_TYPES from "../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import {
  History,
  LocationScope,
} from "../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/History";

const worldPortMock = mock<ILearningWorldPort>();

describe("AdaptivityElementBuilder", () => {
  let systemUnderTest: AdaptivityElementBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).toConstantValue(worldPortMock);
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IBottomTooltipPresenter
    ).toConstantValue(mock());
  });

  beforeEach(() => {
    systemUnderTest = new AdaptivityElementBuilder();
    jest
      .spyOn(History, "currentLocationScope")
      .mockReturnValue(LocationScope.spaceDisplay);
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.restoreAllMocks();
  });

  test("buildPresenter builds the presenter and registers it with the WorldPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(worldPortMock.registerAdapter).toHaveBeenCalledTimes(1);
    expect(worldPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"],
      LocationScope.spaceDisplay
    );
  });
});
