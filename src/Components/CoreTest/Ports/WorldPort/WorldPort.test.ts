import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import WorldPort from "../../../Core/Ports/WorldPort/WorldPort";
import SpaceTO from "../../../Core/Application/DataTransferObjects/SpaceTO";
import WorldTO from "../../../Core/Application/DataTransferObjects/WorldTO";
import { mock } from "jest-mock-extended";
import IWorldAdapter from "../../../Core/Ports/WorldPort/IWorldAdapter";
import SpaceScoreTO from "../../../Core/Application/DataTransferObjects/SpaceScoreTO";

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

  test("onWorldLoaded calls a registered adapter", () => {
    const worldAdapterMock = mock<IWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);
    const mockedWorldTO = mock<WorldTO>();

    systemUnderTest.onWorldLoaded(mockedWorldTO);

    expect(worldAdapterMock.onWorldLoaded).toBeCalledWith(mockedWorldTO);
  });

  test("onSpaceLoaded calls a registered adapter", () => {
    const worldAdapterMock = mock<IWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);
    const mockedSpaceTO = mock<SpaceTO>();

    systemUnderTest.onSpaceLoaded(mockedSpaceTO);

    expect(worldAdapterMock.onSpaceLoaded).toBeCalledWith(mockedSpaceTO);
  });

  test("onSpaceScored calls a registered adapter", () => {
    const worldAdapterMock = mock<IWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);
    const mockedSpaceScoreTO = mock<SpaceScoreTO>();

    systemUnderTest.onSpaceScored(mockedSpaceScoreTO);

    expect(worldAdapterMock.onSpaceScored).toBeCalledWith(mockedSpaceScoreTO);
  });

  test.todo("add tests for adapters that don't implement all methods");
});
