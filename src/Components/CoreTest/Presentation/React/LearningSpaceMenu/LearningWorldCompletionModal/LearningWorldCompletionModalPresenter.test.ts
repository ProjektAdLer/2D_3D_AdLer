import LearningSpaceTO from "../../../../../Core/Application/DataTransferObjects/LearningSpaceTO";
import { mock } from "jest-mock-extended";
import LearningWorldTO from "../../../../../Core/Application/DataTransferObjects/LearningWorldTO";
import LearningWorldCompletionModalPresenter from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningWorldCompletionModal/LearningWorldCompletionModalPresenter";
import LearningWorldCompletionModalViewModel from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningWorldCompletionModal/LearningWorldCompletionModalViewModel";
import ISetWorldCompletionModalToShownUseCase from "../../../../../Core/Application/UseCases/SetWorldCompletionModalToShown/ISetWorldCompletionModalToShownUseCase";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";

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

  test("onLearningWorldScored should set canShowModal true, if currentScore is equal/greater to requiredScore", () => {
    const worldScoreTO = {
      worldID: 1,
      currentScore: 1,
      requiredScore: 1,
    };

    systemUnderTest.onLearningWorldScored(worldScoreTO);

    expect(vm.canShowModal).toEqual(true);
  });

  test("onLearningWorldScored should not set canShowModal true, if currentScore is less than requiredScore", () => {
    const worldScoreTO = {
      worldID: 1,
      currentScore: 1,
      requiredScore: 2,
    };

    systemUnderTest.onLearningWorldScored(worldScoreTO);

    expect(vm.canShowModal).toEqual(false);
  });

  test("openModal should set showModal true, if canShowModal is true", () => {
    vm.canShowModal = true;
    vm.showModal.Value = false;

    systemUnderTest.openModal();

    expect(vm.showModal.Value).toEqual(true);
  });

  test("openModal should not set showModal true, if canShowModal is false", () => {
    vm.canShowModal = false;
    vm.showModal.Value = false;

    systemUnderTest.openModal();

    expect(vm.showModal.Value).toEqual(false);
  });
});
