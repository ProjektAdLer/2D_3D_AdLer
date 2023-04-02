import LearningSpaceTO from "../../../../../Core/Application/DataTransferObjects/LearningSpaceTO";
import LearningWorldTO from "../../../../../Core/Application/DataTransferObjects/LearningWorldTO";
import LearningWorldCompletionModalPresenter from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningWorldCompletionModal/LearningWorldCompletionModalPresenter";
import LearningWorldCompletionModalViewModel from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningWorldCompletionModal/LearningWorldCompletionModalViewModel";
describe("LearningWorldCompletionModalPresenter", () => {
  let systemUnderTest: LearningWorldCompletionModalPresenter;

  let vm = new LearningWorldCompletionModalViewModel();

  beforeEach(() => {
    vm = new LearningWorldCompletionModalViewModel();
    systemUnderTest = new LearningWorldCompletionModalPresenter(vm);
  });

  test("onLearningWorldLoaded should set showModal true, if each spaces currentScore is equal/greater to its requiredScore", () => {
    const worldTO = {
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
});
