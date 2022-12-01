import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import WorldPort from "../../../Core/Ports/WorldPort/WorldPort";
import ElementTO from "../../../Core/Application/DataTransferObjects/ElementTO";
import SpaceTO from "../../../Core/Application/DataTransferObjects/SpaceTO";
import WorldTO from "../../../Core/Application/DataTransferObjects/WorldTO";
import { mock } from "jest-mock-extended";
import IWorldAdapter from "../../../Core/Ports/WorldPort/IWorldAdapter";

describe("WorldPort", () => {
  let systemUnderTest: WorldPort;

  beforeEach(() => {
    CoreDIContainer.snapshot();
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(WorldPort);
  });

  afterEach(() => {
    CoreDIContainer.restore();
  });

  // this needs to be reworked, when more than one space is supported
  test("presentWorld calls a registered adapter", () => {
    // setup TOs
    const elementTO: ElementTO = {
      id: 1,
      name: "test",
      value: 0,
      parentSpaceId: 0,
      description: "test",
      goals: "test",
      type: "h5p",
      parentCourseId: 0,
    };
    const spaceTO: SpaceTO = {
      id: 1,
      elements: [elementTO],
      name: "test",
      description: "test",
      goals: "test",
      requirements: [],
      requiredPoints: 0,
    };
    const worldTO: WorldTO = {
      description: "test",
      goals: "test",
      spaces: [spaceTO],
      worldName: "test",
      worldGoal: "test",
    };

    const worldAdapterMock = mock<IWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);

    systemUnderTest.onWorldLoaded(worldTO);

    expect(worldAdapterMock.onWorldLoaded).toBeCalledWith(worldTO);
  });
});
