import SpaceBuilder from "../../../../Core/Presentation/Babylon/Spaces/SpaceBuilder";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import { mock } from "jest-mock-extended";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IWorldPort from "../../../../Core/Application/Ports/Interfaces/IWorldPort";

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
