import { mock } from "jest-mock-extended";
import SpaceCompletionModalBuilder from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceCompletionModal/SpaceCompletionModalBuilder";
import ISpacePort from "../../../../../Core/Ports/SpacePort/ISpacePort";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import exp from "constants";

const spacePortMock = mock<ISpacePort>();

describe("SpaceCompletionModalBuilder", () => {
  let systemUnderTest: SpaceCompletionModalBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<ISpacePort>(PORT_TYPES.ISpacePort).toConstantValue(
      spacePortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = new SpaceCompletionModalBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildPresenter should register the presenter with the SpacePort", () => {
    systemUnderTest.buildViewModel();

    systemUnderTest.buildPresenter();

    expect(spacePortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest.getPresenter()
    );
  });
});
