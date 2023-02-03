import SpaceBuilder from "../../../../Core/Presentation/Babylon/Spaces/SpaceBuilder";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import IWorldPort from "../../../../Core/Ports/WorldPort/IWorldPort";
import { mock } from "jest-mock-extended";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";

jest.mock("@babylonjs/core");
const worldPortMock = mock<IWorldPort>();

describe("SpaceBuilder", () => {
  let systemUnderTest: SpaceBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IWorldPort>(PORT_TYPES.IWorldPort).toConstantValue(
      worldPortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = new SpaceBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildPresenter concludes the build step successfully and registers the presenter with the port", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();
    expect(worldPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
