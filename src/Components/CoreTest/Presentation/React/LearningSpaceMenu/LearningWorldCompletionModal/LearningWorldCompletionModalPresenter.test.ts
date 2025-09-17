import { validateasuuidValidate } from "uuid";
import LearningSpaceTO from "../../../../../Core/Application/DataTransferObjects/LearningSpaceTO";
import { mock } from "jest-mock-extended";
import LearningWorldTO from "../../../../../Core/Application/DataTransferObjects/LearningWorldTO";
import LearningWorldCompletionModalPresenter from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningWorldCompletionModal/LearningWorldCompletionModalPresenter";
import LearningWorldCompletionModalViewModel from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningWorldCompletionModal/LearningWorldCompletionModalViewModel";
import ISetWorldCompletionModalToShownUseCase from "../../../../../Core/Application/UseCases/SetWorldCompletionModalToShown/ISetWorldCompletionModalToShownUseCase";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import { StoryElementType } from "../../../../../Core/Domain/Types/StoryElementType";

const setWorldCompletionModalToShownMock =
  mock<ISetWorldCompletionModalToShownUseCase>();

describe("LearningWorldCompletionModalPresenter", () => {
  let systemUnderTest: LearningWorldCompletionModalPresenter;

  let vm = new LearningWorldCompletionModalViewModel();

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(
      USECASE_TYPES.ISetWorldCompletionModalToShownUseCase,
    ).toConstantValue(setWorldCompletionModalToShownMock);
  });
  beforeEach(() => {
    vm = new LearningWorldCompletionModalViewModel();
    systemUnderTest = new LearningWorldCompletionModalPresenter(vm);
    setWorldCompletionModalToShownMock.execute.mockClear();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("onLearningWorldLoaded should set showModal true, if each spaces currentScore is equal/greater to its requiredScore", () => {
    const worldTO = {
      completionModalShown: false,
      spaces: [
        {
          id: 1,
          currentScore: 1,
          requiredScore: 1,
        } as LearningSpaceTO,
        {
          id: 2,
          currentScore: 2,
          requiredScore: 1,
        } as LearningSpaceTO,
      ],
    } as LearningWorldTO;

    systemUnderTest.onLearningWorldLoaded(worldTO);

    expect(vm.showModal.Value).toEqual(true);
  });

  test("onLearningWorldLoaded should set showModal false, if one of the spaces currentScore is less than its requiredScore", () => {
    const worldTO = {
      completionModalShown: false,
      spaces: [
        {
          id: 1,
          currentScore: 1,
          requiredScore: 1,
        } as LearningSpaceTO,
        {
          id: 2,
          currentScore: 1,
          requiredScore: 2,
        } as LearningSpaceTO,
      ],
    } as LearningWorldTO;

    systemUnderTest.onLearningWorldLoaded(worldTO);

    expect(vm.showModal.Value).toEqual(false);
  });
  test("onLearningWorldLoaded should not set anything, if completionmodalshown is true", () => {
    vm.showModal.Value = false;
    const worldTO = {
      completionModalShown: true,
      spaces: [
        {
          id: 1,
          currentScore: 1,
          requiredScore: 1,
        } as LearningSpaceTO,
        {
          id: 2,
          currentScore: 2,
          requiredScore: 2,
        } as LearningSpaceTO,
      ],
    } as LearningWorldTO;

    systemUnderTest.onLearningWorldLoaded(worldTO);

    expect(vm.showModal.Value).toEqual(false);
  });

  test("onLearningWorldScored should set showModal true, if currentScore is equal/greater to requiredScore and wasClosedOnce is false", () => {
    const worldScoreTO = {
      worldID: 1,
      currentScore: 1,
      requiredScore: 1,
    };
    vm.wasClosedOnce = false;
    vm.showModal.Value = false;

    systemUnderTest.onLearningWorldScored(worldScoreTO);

    expect(vm.showModal.Value).toEqual(true);
  });

  test("onLearningWorldScored should not set canShowModal true, if currentScore is less than requiredScore, even if wasClosed is false", () => {
    const worldScoreTO = {
      worldID: 1,
      currentScore: 1,
      requiredScore: 2,
    };
    vm.wasClosedOnce = false;
    vm.showModal.Value = false;

    systemUnderTest.onLearningWorldScored(worldScoreTO);

    expect(vm.showModal.Value).toEqual(false);
  });

  test("onLearningWorldEntityLoaded should set showModal true, if each spaces currentScore is equal/greater to its requiredScore and WorldCompletionModalShown from world is falso", () => {
    const worldTO = {
      completionModalShown: false,
      spaces: [
        {
          id: 1,
          currentScore: 1,
          requiredScore: 1,
        } as LearningSpaceTO,
        {
          id: 2,
          currentScore: 2,
          requiredScore: 1,
        } as LearningSpaceTO,
      ],
    } as LearningWorldTO;
    vm.showModal.Value = false;

    systemUnderTest.onLearningWorldEntityLoaded(worldTO);

    expect(vm.showModal.Value).toEqual(true);
  });

  test("onLearningWorldEntityLoaded should not set showModal to true, if one of the spaces currentScore is less than its requiredScore", () => {
    const worldTO = {
      completionModalShown: false,
      spaces: [
        {
          id: 1,
          currentScore: 1,
          requiredScore: 1,
        } as LearningSpaceTO,
        {
          id: 2,
          currentScore: 1,
          requiredScore: 2,
        } as LearningSpaceTO,
      ],
    } as LearningWorldTO;
    vm.showModal.Value = false;

    systemUnderTest.onLearningWorldEntityLoaded(worldTO);

    expect(vm.showModal.Value).toEqual(false);
  });

  test("onLearningWorldEntityLoaded should set wasClosedOnce to true, if WorldCompletionModalShown from world is true", () => {
    const worldTO = {
      completionModalShown: true,
      spaces: [
        {
          id: 1,
          currentScore: 1,
          requiredScore: 1,
        } as LearningSpaceTO,
      ],
    } as LearningWorldTO;
    vm.showModal.Value = false;
    vm.wasClosedOnce = false;

    systemUnderTest.onLearningWorldEntityLoaded(worldTO);

    expect(vm.wasClosedOnce).toEqual(true);
  });

  test("openModal should set showModal true", () => {
    vm.showModal.Value = false;

    systemUnderTest.openModal();

    expect(vm.showModal.Value).toEqual(true);
  });

  test("onStoryElementCutSceneTriggered sets isOtherModalOpen to true, if storytype is outro", () => {
    vm.isOtherModalOpen.Value = false;
    systemUnderTest.onStoryElementCutSceneTriggered(StoryElementType.Outro);
    expect(vm.isOtherModalOpen.Value).toEqual(true);
  });

  test("onStoryElementCutSceneFinished sets isOtherModalOpen to false, if storytype is outro", () => {
    vm.isOtherModalOpen.Value = true;
    systemUnderTest.onStoryElementCutSceneFinished(StoryElementType.Outro);
    expect(vm.isOtherModalOpen.Value).toEqual(false);
  });

  test("onModalVisibility sets isOtherModalOpen to corresponding value", () => {
    vm.isOtherModalOpen.Value = false;
    systemUnderTest.onModalVisibility(true);
    expect(vm.isOtherModalOpen.Value).toEqual(true);
    vm.isOtherModalOpen.Value = true;
    systemUnderTest.onModalVisibility(false);
    expect(vm.isOtherModalOpen.Value).toEqual(false);
  });
});
