import { mock } from "jest-mock-extended";
import ILearningWorldPort from "../../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import MenuHeaderBarBuilder from "../../../../../Core/Presentation/React/GeneralComponents/MenuHeaderBar/MenuHeaderBarBuilder";

const worldPortMock = mock<ILearningWorldPort>();

describe("MenuHeaderBarBuilder", () => {
  let systemUnderTest: MenuHeaderBarBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).toConstantValue(worldPortMock);
  });

  beforeEach(() => {
    systemUnderTest = new MenuHeaderBarBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildPresenter registers the presenter with the world port", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(worldPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest.getPresenter()
    );
  });
});
