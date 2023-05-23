import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import LearningWorldPort from "../../../../Core/Application/Ports/LearningWorldPort/LearningWorldPort";
import LearningSpaceTO from "../../../../Core/Application/DataTransferObjects/LearningSpaceTO";
import WorldTO from "../../../../Core/Application/DataTransferObjects/LearningWorldTO";
import { mock } from "jest-mock-extended";
import ILearningWorldAdapter from "../../../../Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import LearningSpaceScoreTO from "../../../../Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import LearningElementTO from "../../../../Core/Application/DataTransferObjects/LearningElementTO";
import UserLearningWorldsTO from "../../../../Core/Application/DataTransferObjects/UserLearningWorldsTO";
import LearningWorldScoreTO from "../../../../Core/Application/DataTransferObjects/LearningWorldScoreTO";
import LearningSpacePrecursorAndSuccessorTO from "../../../../Core/Application/DataTransferObjects/LearningSpacePrecursorAndSuccessorTO";

describe("LearningWorldPort", () => {
  let systemUnderTest: LearningWorldPort;

  beforeEach(() => {
    CoreDIContainer.snapshot();
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(LearningWorldPort);
  });

  afterEach(() => {
    CoreDIContainer.restore();
  });

  test("onUserLearningWorldsLoaded calls a registered adapter", () => {
    const worldAdapterMock = mock<ILearningWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);
    const mockedUserWorldsTO = mock<UserLearningWorldsTO>();

    systemUnderTest.onUserLearningWorldsLoaded(mockedUserWorldsTO);

    expect(worldAdapterMock.onUserLearningWorldsLoaded).toBeCalledWith(
      mockedUserWorldsTO
    );
  });

  test("onLearningWorldLoaded calls a registered adapter", () => {
    const worldAdapterMock = mock<ILearningWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);
    const mockedWorldTO = mock<WorldTO>();

    systemUnderTest.onLearningWorldLoaded(mockedWorldTO);

    expect(worldAdapterMock.onLearningWorldLoaded).toBeCalledWith(
      mockedWorldTO
    );
  });

  test("onLearningWorldScored calls a registered adapter", () => {
    const worldAdapterMock = mock<ILearningWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);
    const mockedWorldScoreTO = mock<LearningWorldScoreTO>();

    systemUnderTest.onLearningWorldScored(mockedWorldScoreTO);

    expect(worldAdapterMock.onLearningWorldScored).toBeCalledWith(
      mockedWorldScoreTO
    );
  });

  test("onLearningSpaceLoaded calls a registered adapter", () => {
    const worldAdapterMock = mock<ILearningWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);
    const mockedSpaceTO = mock<LearningSpaceTO>();

    systemUnderTest.onLearningSpaceLoaded(mockedSpaceTO);

    expect(worldAdapterMock.onLearningSpaceLoaded).toBeCalledWith(
      mockedSpaceTO
    );
  });

  test("onLearningSpaceScored calls a registered adapter", () => {
    const worldAdapterMock = mock<ILearningWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);
    const mockedSpaceScoreTO = mock<LearningSpaceScoreTO>();

    systemUnderTest.onLearningSpaceScored(mockedSpaceScoreTO);

    expect(worldAdapterMock.onLearningSpaceScored).toBeCalledWith(
      mockedSpaceScoreTO
    );
  });
  test("onLearningSpacePrecursorandSuccessorLoaded calls a registered adapter", () => {
    const worldAdapterMock = mock<ILearningWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);
    const mockedSpacePuSTO = mock<LearningSpacePrecursorAndSuccessorTO>();

    systemUnderTest.onLearningSpacePrecursorAndSuccessorLoaded(
      mockedSpacePuSTO
    );

    expect(
      worldAdapterMock.onLearningSpacePrecursorAndSuccessorLoaded
    ).toBeCalledWith(mockedSpacePuSTO);
  });

  test("onLearningElementLoaded calls a registered adapter", () => {
    const worldAdapterMock = mock<ILearningWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);
    const mockedElementTO = mock<LearningElementTO>();

    systemUnderTest.onLearningElementLoaded(mockedElementTO);

    expect(worldAdapterMock.onLearningElementLoaded).toBeCalledWith(
      mockedElementTO
    );
  });

  test("onLearningElementScored calls a registered adapter", () => {
    const worldAdapterMock = mock<ILearningWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);

    systemUnderTest.onLearningElementScored(true, 1);

    expect(worldAdapterMock.onLearningElementScored).toBeCalledWith(true, 1);
  });
});
