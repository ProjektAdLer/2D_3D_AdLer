import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import LearningWorldPort from "../../../../Core/Application/Ports/LearningWorldPort/LearningWorldPort";
import LearningSpaceTO from "../../../../Core/Application/DataTransferObjects/LearningSpaceTO";
import WorldTO from "../../../../Core/Application/DataTransferObjects/LearningWorldTO";
import { mock } from "jest-mock-extended";
import ILearningWorldAdapter from "../../../../Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import LearningSpaceScoreTO from "../../../../Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import LearningElementTO from "../../../../Core/Application/DataTransferObjects/LearningElementTO";
import UserInitialLearningWorldsInfoTO from "../../../../Core/Application/DataTransferObjects/UserInitialLearningWorldsInfoTO";
import LearningWorldScoreTO from "../../../../Core/Application/DataTransferObjects/LearningWorldScoreTO";
import LearningSpacePrecursorAndSuccessorTO from "../../../../Core/Application/DataTransferObjects/LearningSpacePrecursorAndSuccessorTO";
import AdaptivityElementProgressTO from "../../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementProgressTO";
import AdaptivityElementProgressUpdateTO from "../../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementProgressUpdateTO";
import AdaptivityElementHintTO from "../../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementHintTO";
import UserLearningWorldsInfoTO from "../../../../Core/Application/DataTransferObjects/UserLearningWorldsInfoTO";
import StoryElementTO from "../../../../Core/Application/DataTransferObjects/StoryElementTO";
import { StoryElementType } from "../../../../Core/Domain/Types/StoryElementType";
import AdaptivityElementQuestionPresentationUpdateTO from "../../../../Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementQuestionPresentationUpdateTO";
import NarrativeFrameworkTO from "../../../../Core/Application/DataTransferObjects/NarrativeFrameworkTO";

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

  test("onUserInitialLearningWorldsInfoLoaded calls a registered adapter", () => {
    const worldAdapterMock = mock<ILearningWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);
    const mockedUserWorldsTO = mock<UserInitialLearningWorldsInfoTO>();

    systemUnderTest.onUserInitialLearningWorldsInfoLoaded(mockedUserWorldsTO);

    expect(
      worldAdapterMock.onUserInitialLearningWorldsInfoLoaded,
    ).toBeCalledWith(mockedUserWorldsTO);
  });

  test("onUserLearningWorldsInfoLoaded calls a registered adapter", () => {
    const worldAdapterMock = mock<ILearningWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);
    const mockedUserWorldsTO = mock<UserLearningWorldsInfoTO>();

    systemUnderTest.onUserLearningWorldsInfoLoaded(mockedUserWorldsTO);

    expect(worldAdapterMock.onUserLearningWorldsInfoLoaded).toBeCalledWith(
      mockedUserWorldsTO,
    );
  });

  test("onLearningWorldLoaded calls a registered adapter", () => {
    const worldAdapterMock = mock<ILearningWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);
    const mockedWorldTO = mock<WorldTO>();

    systemUnderTest.onLearningWorldLoaded(mockedWorldTO);

    expect(worldAdapterMock.onLearningWorldLoaded).toBeCalledWith(
      mockedWorldTO,
    );
  });

  test("onLearningWorldScored calls a registered adapter", () => {
    const worldAdapterMock = mock<ILearningWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);
    const mockedWorldScoreTO = mock<LearningWorldScoreTO>();

    systemUnderTest.onLearningWorldScored(mockedWorldScoreTO);

    expect(worldAdapterMock.onLearningWorldScored).toBeCalledWith(
      mockedWorldScoreTO,
    );
  });

  test("onLearningWorldEntityLoaded calls a registered adapter", () => {
    const worldAdapterMock = mock<ILearningWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);
    const mockedWorldTO = mock<WorldTO>();

    systemUnderTest.onLearningWorldEntityLoaded(mockedWorldTO);

    expect(worldAdapterMock.onLearningWorldEntityLoaded).toBeCalledWith(
      mockedWorldTO,
    );
  });

  test("onLearningSpaceLoaded calls a registered adapter", () => {
    const worldAdapterMock = mock<ILearningWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);
    const mockedSpaceTO = mock<LearningSpaceTO>();

    systemUnderTest.onLearningSpaceLoaded(mockedSpaceTO);

    expect(worldAdapterMock.onLearningSpaceLoaded).toBeCalledWith(
      mockedSpaceTO,
    );
  });

  test("onLearningSpaceScored calls a registered adapter", () => {
    const worldAdapterMock = mock<ILearningWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);
    const mockedSpaceScoreTO = mock<LearningSpaceScoreTO>();

    systemUnderTest.onLearningSpaceScored(mockedSpaceScoreTO);

    expect(worldAdapterMock.onLearningSpaceScored).toBeCalledWith(
      mockedSpaceScoreTO,
    );
  });
  test("onLearningSpacePrecursorandSuccessorLoaded calls a registered adapter", () => {
    const worldAdapterMock = mock<ILearningWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);
    const mockedSpacePuSTO = mock<LearningSpacePrecursorAndSuccessorTO>();

    systemUnderTest.onLearningSpacePrecursorAndSuccessorLoaded(
      mockedSpacePuSTO,
    );

    expect(
      worldAdapterMock.onLearningSpacePrecursorAndSuccessorLoaded,
    ).toBeCalledWith(mockedSpacePuSTO);
  });

  test("onLearningElementLoaded calls a registered adapter", () => {
    const worldAdapterMock = mock<ILearningWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);
    const mockedElementTO = mock<LearningElementTO>();

    systemUnderTest.onLearningElementLoaded(mockedElementTO);

    expect(worldAdapterMock.onLearningElementLoaded).toBeCalledWith(
      mockedElementTO,
    );
  });

  test("onLearningElementScored calls a registered adapter", () => {
    const worldAdapterMock = mock<ILearningWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);

    systemUnderTest.onLearningElementScored(true, 1);

    expect(worldAdapterMock.onLearningElementScored).toBeCalledWith(true, 1);
  });

  test("onLearningELementHighlighted calls a registered adapter", () => {
    const worldAdapterMock = mock<ILearningWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);

    systemUnderTest.onLearningElementHighlighted(1);

    expect(worldAdapterMock.onLearningElementHighlighted).toBeCalledWith(1);
  });

  test("onAdaptivityElementLoaded calls a registered adapter", () => {
    const worldAdapterMock = mock<ILearningWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);
    const mockAdaptivityElementProgressTO = mock<AdaptivityElementProgressTO>();

    systemUnderTest.onAdaptivityElementLoaded(mockAdaptivityElementProgressTO);

    expect(worldAdapterMock.onAdaptivityElementLoaded).toBeCalledWith(
      mockAdaptivityElementProgressTO,
    );
  });

  test("onAdaptivityElementSubmitted calls a registered adapter", () => {
    const worldAdapterMock = mock<ILearningWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);
    const mockAdaptivityElementProgressUpdateTO =
      mock<AdaptivityElementProgressUpdateTO>();

    systemUnderTest.onAdaptivityElementAnswerEvaluated(
      mockAdaptivityElementProgressUpdateTO,
    );

    expect(worldAdapterMock.onAdaptivityElementAnswerEvaluated).toBeCalledWith(
      mockAdaptivityElementProgressUpdateTO,
    );
  });

  test("onAdaptivityElementUserHintInformed calls a registered adapter", () => {
    const worldAdapterMock = mock<ILearningWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);
    const mockAdaptivityElementHintTO = mock<AdaptivityElementHintTO>();

    systemUnderTest.onAdaptivityElementUserHintInformed(
      mockAdaptivityElementHintTO,
    );

    expect(worldAdapterMock.onAdaptivityElementUserHintInformed).toBeCalledWith(
      mockAdaptivityElementHintTO,
    );
  });

  test("onAdaptivityElementQuestionAnsweredCorrectly calls a registered adapter", () => {
    const worldAdapterMock = mock<ILearningWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);
    const mockAdaptivityElementQuestionPresentationUpdateTO =
      mock<AdaptivityElementQuestionPresentationUpdateTO>();

    systemUnderTest.onAdaptivityElementQuestionAnsweredCorrectly(
      mockAdaptivityElementQuestionPresentationUpdateTO,
    );

    expect(
      worldAdapterMock.onAdaptivityElementQuestionAnsweredCorrectly,
    ).toBeCalledWith(mockAdaptivityElementQuestionPresentationUpdateTO);
  });

  test("onStoryElementLoaded calls a registered adapter", () => {
    const worldAdapterMock = mock<ILearningWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);
    const mockStoryElementTO = mock<StoryElementTO>();

    systemUnderTest.onStoryElementLoaded(mockStoryElementTO);

    expect(worldAdapterMock.onStoryElementLoaded).toBeCalledWith(
      mockStoryElementTO,
    );
  });

  test("onStoryElementCutSceneTriggered calls a registered adapter", () => {
    const worldAdapterMock = mock<ILearningWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);

    systemUnderTest.onStoryElementCutSceneTriggered(StoryElementType.Intro);

    expect(worldAdapterMock.onStoryElementCutSceneTriggered).toBeCalledWith(1);
    expect(
      worldAdapterMock.onStoryElementCutSceneTriggered,
    ).toHaveBeenCalledWith(StoryElementType.Intro);
  });

  test("onStoryElementCutSceneFinished calls a registered adapter", () => {
    const worldAdapterMock = mock<ILearningWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);

    systemUnderTest.onStoryElementCutSceneFinished(StoryElementType.Intro);

    expect(worldAdapterMock.onStoryElementCutSceneFinished).toBeCalledWith(
      StoryElementType.Intro,
    );
  });

  test("onNarrativeFrameworkInfoLoadedOrUpdated calls a registered adapter", () => {
    const worldAdapterMock = mock<ILearningWorldAdapter>();
    systemUnderTest.registerAdapter(worldAdapterMock);

    let testTO = new NarrativeFrameworkTO();
    systemUnderTest.onNarrativeFrameworkInfoLoadedOrUpdated(testTO);

    expect(
      worldAdapterMock.onNarrativeFrameworkInfoLoadedOrUpdated,
    ).toBeCalled();
  });

  test("name returns LEARNING-WORLD-PORT", () => {
    expect(systemUnderTest.name()).toBe("LEARNINGWORLD-PORT");
  });
});
