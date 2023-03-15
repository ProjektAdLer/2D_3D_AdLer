import { mock } from "jest-mock-extended";
import IWorldPort from "../../../../../Core/Application/Ports/Interfaces/IWorldPort";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import MenuHeaderBarBuilder from "../../../../../Core/Presentation/React/GeneralComponents/MenuHeaderBar/MenuHeaderBarBuilder";

const worldPortMock = mock<IWorldPort>();

describe("MenuHeaderBarBuilder", () => {
  let systemUnderTest: MenuHeaderBarBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IWorldPort>(PORT_TYPES.IWorldPort).toConstantValue(
      worldPortMock
    );
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
