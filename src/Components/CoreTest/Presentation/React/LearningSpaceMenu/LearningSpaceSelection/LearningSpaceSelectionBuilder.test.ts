import { mock } from "jest-mock-extended";
import ILearningWorldPort from "../../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import LearningSpaceSelectionBuilder from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceSelection/LearningSpaceSelectionBuilder";

const worldPortMock = mock<ILearningWorldPort>();

describe("LearningSpaceSelectionBuilder", () => {
  let systemUnderTest: LearningSpaceSelectionBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = new LearningSpaceSelectionBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildPresenter registers presenter with LearningWorldPort", () => {
    // build view model first
    systemUnderTest.buildViewModel();

    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(worldPortMock.registerAdapter).toBeCalledTimes(1);
    expect(worldPortMock.registerAdapter).toBeCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
