import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import WorldPort from "../../../Core/Ports/WorldPort/WorldPort";
import SpaceTO from "../../../Core/Application/DataTransferObjects/SpaceTO";
import WorldTO from "../../../Core/Application/DataTransferObjects/WorldTO";
import { mock } from "jest-mock-extended";
import IWorldAdapter from "../../../Core/Ports/WorldPort/IWorldAdapter";
import SpaceScoreTO from "../../../Core/Application/DataTransferObjects/SpaceScoreTO";
import ElementTO from "../../../Core/Application/DataTransferObjects/ElementTO";
import UserWorldsTO from "../../../Core/Application/DataTransferObjects/UserWorldsTO";
import WorldScoreTO from "../../../Core/Application/DataTransferObjects/WorldScoreTO";

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

  test("onUserWorldsLoaded calls a registered adapter", () => {
    const worldAdapterMock = mock<IWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);
    const mockedUserWorldsTO = mock<UserWorldsTO>();

    systemUnderTest.onUserWorldsLoaded(mockedUserWorldsTO);

    expect(worldAdapterMock.onUserWorldsLoaded).toBeCalledWith(
      mockedUserWorldsTO
    );
  });

  test("onWorldLoaded calls a registered adapter", () => {
    const worldAdapterMock = mock<IWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);
    const mockedWorldTO = mock<WorldTO>();

    systemUnderTest.onWorldLoaded(mockedWorldTO);

    expect(worldAdapterMock.onWorldLoaded).toBeCalledWith(mockedWorldTO);
  });

  test("onWorldScored calls a registered adapter", () => {
    const worldAdapterMock = mock<IWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);
    const mockedWorldScoreTO = mock<WorldScoreTO>();

    systemUnderTest.onWorldScored(mockedWorldScoreTO);

    expect(worldAdapterMock.onWorldScored).toBeCalledWith(mockedWorldScoreTO);
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

  test("onElementLoaded calls a registered adapter", () => {
    const worldAdapterMock = mock<IWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);
    const mockedElementTO = mock<ElementTO>();

    systemUnderTest.onElementLoaded(mockedElementTO);

    expect(worldAdapterMock.onElementLoaded).toBeCalledWith(mockedElementTO);
  });

  test("onElementScored calls a registered adapter", () => {
    const worldAdapterMock = mock<IWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);

    systemUnderTest.onElementScored(true, 1);

    expect(worldAdapterMock.onElementScored).toBeCalledWith(true, 1);
  });
});
