import LearningSpaceTO from "../../../../../Core/Application/DataTransferObjects/LearningSpaceTO";
import LearningWorldTO from "../../../../../Core/Application/DataTransferObjects/LearningWorldTO";
import SideBarPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/SideBar/SideBarPresenter";
import SideBarViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/SideBar/SideBarViewModel";
import { StoryElementType } from "../../../../../Core/Domain/Types/StoryElementType";
import StoryElementTO from "../../../../../Core/Application/DataTransferObjects/StoryElementTO";
import LearningSpaceScoreTO from "../../../../../Core/Application/DataTransferObjects/LearningSpaceScoreTO";

describe("SideBarPresenter", () => {
  let systemUnderTest: SideBarPresenter;

  let vm = new SideBarViewModel();
  beforeEach(() => {
    vm = new SideBarViewModel();
    systemUnderTest = new SideBarPresenter(vm);
  });
  test("onLearningWorldLoaded sets allowWorldCompletionModalButtonClick", () => {
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
          requiredScore: 1,
        } as LearningSpaceTO,
      ],
    } as LearningWorldTO;
    systemUnderTest.onLearningWorldLoaded(worldTO);
    expect(vm.allowWorldCompletionModalButtonClick).toBe(true);
  });
  test("OnLearningWorldScored sets allowWorldCompletionModalButtonClick", () => {
    const worldScoreTo = {
      worldID: 1,
      currentScore: 1,
      requiredScore: 1,
    };
    systemUnderTest.onLearningWorldScored(worldScoreTo);
    expect(vm.allowWorldCompletionModalButtonClick).toBe(true);
  });

  test("onNarrativeFrameworkInfoLoadedOrUpdated sets allowNarrativeFrameworkIntroButtonClick", () => {
    systemUnderTest.onNarrativeFrameworkInfoLoadedOrUpdated({});
    expect(vm.allowNarrativeFrameworkIntroButtonClick).toBe(true);
  });

  describe("Story Button Tests", () => {
    beforeEach(() => {
      vm = new SideBarViewModel();
      systemUnderTest = new SideBarPresenter(vm);
    });

    test("onLearningSpaceLoaded resets story button states initially", () => {
      const spaceTOWithoutStory = {
        id: 1,
        currentScore: 0,
        requiredScore: 1,
        storyElements: [],
      } as LearningSpaceTO;

      systemUnderTest.onLearningSpaceLoaded(spaceTOWithoutStory);

      expect(vm.hasIntroStory).toBe(false);
      expect(vm.hasOutroStory).toBe(false);
      expect(vm.allowIntroStoryButtonClick).toBe(false);
      expect(vm.allowOutroStoryButtonClick).toBe(false);
    });

    test("onLearningSpaceLoaded sets intro story flags when intro story element exists", () => {
      const storyElementTO = {
        storyType: StoryElementType.Intro,
      } as StoryElementTO;

      const spaceTOWithIntroStory = {
        id: 1,
        currentScore: 0,
        requiredScore: 1,
        storyElements: [storyElementTO],
      } as LearningSpaceTO;

      systemUnderTest.onLearningSpaceLoaded(spaceTOWithIntroStory);

      expect(vm.hasIntroStory).toBe(true);
      expect(vm.allowIntroStoryButtonClick).toBe(true);
      expect(vm.hasOutroStory).toBe(false);
      expect(vm.allowOutroStoryButtonClick).toBe(false);
    });

    test("onLearningSpaceLoaded sets outro story flags when outro story element exists and space is completed", () => {
      const storyElementTO = {
        storyType: StoryElementType.Outro,
      } as StoryElementTO;

      const spaceTOWithOutroStory = {
        id: 1,
        currentScore: 10,
        requiredScore: 10,
        storyElements: [storyElementTO],
      } as LearningSpaceTO;

      systemUnderTest.onLearningSpaceLoaded(spaceTOWithOutroStory);

      expect(vm.hasOutroStory).toBe(true);
      expect(vm.allowOutroStoryButtonClick).toBe(true);
      expect(vm.hasIntroStory).toBe(false);
      expect(vm.allowIntroStoryButtonClick).toBe(false);
    });

    test("onLearningSpaceLoaded sets outro story flags but disallows clicking when space is not completed", () => {
      const storyElementTO = {
        storyType: StoryElementType.Outro,
      } as StoryElementTO;

      const spaceTOWithOutroStory = {
        id: 1,
        currentScore: 5,
        requiredScore: 10,
        storyElements: [storyElementTO],
      } as LearningSpaceTO;

      systemUnderTest.onLearningSpaceLoaded(spaceTOWithOutroStory);

      expect(vm.hasOutroStory).toBe(true);
      expect(vm.allowOutroStoryButtonClick).toBe(false);
      expect(vm.hasIntroStory).toBe(false);
      expect(vm.allowIntroStoryButtonClick).toBe(false);
    });

    test("onLearningSpaceLoaded handles both intro and outro story elements", () => {
      const introStoryElement = {
        storyType: StoryElementType.Intro,
      } as StoryElementTO;

      const outroStoryElement = {
        storyType: StoryElementType.Outro,
      } as StoryElementTO;

      const spaceTOWithBothStories = {
        id: 1,
        currentScore: 10,
        requiredScore: 10,
        storyElements: [introStoryElement, outroStoryElement],
      } as LearningSpaceTO;

      systemUnderTest.onLearningSpaceLoaded(spaceTOWithBothStories);

      expect(vm.hasIntroStory).toBe(true);
      expect(vm.allowIntroStoryButtonClick).toBe(true);
      expect(vm.hasOutroStory).toBe(true);
      expect(vm.allowOutroStoryButtonClick).toBe(true);
    });

    test("onLearningSpaceLoaded handles IntroOutro story type with bitwise flags", () => {
      const introOutroStoryElement = {
        storyType: StoryElementType.Intro | StoryElementType.Outro,
      } as StoryElementTO;

      const spaceTOWithIntroOutroStory = {
        id: 1,
        currentScore: 10,
        requiredScore: 10,
        storyElements: [introOutroStoryElement],
      } as LearningSpaceTO;

      systemUnderTest.onLearningSpaceLoaded(spaceTOWithIntroOutroStory);

      expect(vm.hasIntroStory).toBe(true);
      expect(vm.allowIntroStoryButtonClick).toBe(true);
      expect(vm.hasOutroStory).toBe(true);
      expect(vm.allowOutroStoryButtonClick).toBe(true);
    });

    test("onLearningSpaceLoaded handles undefined story elements gracefully", () => {
      const spaceTOWithoutStoryElements = {
        id: 1,
        currentScore: 10,
        requiredScore: 10,
        storyElements: undefined,
      } as LearningSpaceTO;

      systemUnderTest.onLearningSpaceLoaded(spaceTOWithoutStoryElements);

      expect(vm.hasIntroStory).toBe(false);
      expect(vm.hasOutroStory).toBe(false);
      expect(vm.allowIntroStoryButtonClick).toBe(false);
      expect(vm.allowOutroStoryButtonClick).toBe(false);
    });

    test("onLearningSpaceLoaded handles empty story elements array", () => {
      const spaceTOWithEmptyStoryElements = {
        id: 1,
        currentScore: 10,
        requiredScore: 10,
        storyElements: [],
      } as LearningSpaceTO;

      systemUnderTest.onLearningSpaceLoaded(spaceTOWithEmptyStoryElements);

      expect(vm.hasIntroStory).toBe(false);
      expect(vm.hasOutroStory).toBe(false);
      expect(vm.allowIntroStoryButtonClick).toBe(false);
      expect(vm.allowOutroStoryButtonClick).toBe(false);
    });

    test("onLearningSpaceLoaded handles story elements with None type", () => {
      const noneStoryElement = {
        storyType: StoryElementType.None,
      } as StoryElementTO;

      const spaceTOWithNoneStory = {
        id: 1,
        currentScore: 10,
        requiredScore: 10,
        storyElements: [noneStoryElement],
      } as LearningSpaceTO;

      systemUnderTest.onLearningSpaceLoaded(spaceTOWithNoneStory);

      expect(vm.hasIntroStory).toBe(false);
      expect(vm.hasOutroStory).toBe(false);
      expect(vm.allowIntroStoryButtonClick).toBe(false);
      expect(vm.allowOutroStoryButtonClick).toBe(false);
    });

    test("onLearningSpaceLoaded handles multiple story elements with mixed types", () => {
      const introStoryElement = {
        storyType: StoryElementType.Intro,
      } as StoryElementTO;

      const noneStoryElement = {
        storyType: StoryElementType.None,
      } as StoryElementTO;

      const outroStoryElement = {
        storyType: StoryElementType.Outro,
      } as StoryElementTO;

      const spaceTOWithMixedStories = {
        id: 1,
        currentScore: 8,
        requiredScore: 10,
        storyElements: [introStoryElement, noneStoryElement, outroStoryElement],
      } as LearningSpaceTO;

      systemUnderTest.onLearningSpaceLoaded(spaceTOWithMixedStories);

      expect(vm.hasIntroStory).toBe(true);
      expect(vm.allowIntroStoryButtonClick).toBe(true);
      expect(vm.hasOutroStory).toBe(true);
      expect(vm.allowOutroStoryButtonClick).toBe(false); // Space not completed
    });

    test("onLearningSpaceScored enables outro story button when space score meets requirement", () => {
      // First set up a space with outro story
      vm.hasOutroStory = true;
      vm.allowOutroStoryButtonClick = false;

      const spaceScoreTO = {
        spaceID: 1,
        currentScore: 10,
        requiredScore: 10,
      } as LearningSpaceScoreTO;

      systemUnderTest.onLearningSpaceScored(spaceScoreTO);

      expect(vm.allowOutroStoryButtonClick).toBe(true);
    });

    test("onLearningSpaceScored disables outro story button when space score is insufficient", () => {
      // First set up a space with outro story
      vm.hasOutroStory = true;
      vm.allowOutroStoryButtonClick = true;

      const spaceScoreTO = {
        spaceID: 1,
        currentScore: 5,
        requiredScore: 10,
      } as LearningSpaceScoreTO;

      systemUnderTest.onLearningSpaceScored(spaceScoreTO);

      expect(vm.allowOutroStoryButtonClick).toBe(false);
    });

    test("onLearningSpaceScored does not affect outro button when no outro story exists", () => {
      // No outro story exists
      vm.hasOutroStory = false;
      vm.allowOutroStoryButtonClick = false;

      const spaceScoreTO = {
        spaceID: 1,
        currentScore: 10,
        requiredScore: 10,
      } as LearningSpaceScoreTO;

      systemUnderTest.onLearningSpaceScored(spaceScoreTO);

      expect(vm.allowOutroStoryButtonClick).toBe(false);
    });

    test("onLearningSpaceScored handles exact score requirement match", () => {
      vm.hasOutroStory = true;
      vm.allowOutroStoryButtonClick = false;

      const spaceScoreTO = {
        spaceID: 1,
        currentScore: 100,
        requiredScore: 100,
      } as LearningSpaceScoreTO;

      systemUnderTest.onLearningSpaceScored(spaceScoreTO);

      expect(vm.allowOutroStoryButtonClick).toBe(true);
    });

    test("onLearningSpaceScored handles score exceeding requirement", () => {
      vm.hasOutroStory = true;
      vm.allowOutroStoryButtonClick = false;

      const spaceScoreTO = {
        spaceID: 1,
        currentScore: 150,
        requiredScore: 100,
      } as LearningSpaceScoreTO;

      systemUnderTest.onLearningSpaceScored(spaceScoreTO);

      expect(vm.allowOutroStoryButtonClick).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    test("onLearningWorldLoaded handles world with mixed space completion states", () => {
      const worldTO = {
        completionModalShown: false,
        spaces: [
          {
            id: 1,
            currentScore: 10,
            requiredScore: 10,
          } as LearningSpaceTO,
          {
            id: 2,
            currentScore: 5,
            requiredScore: 10,
          } as LearningSpaceTO,
        ],
      } as LearningWorldTO;

      systemUnderTest.onLearningWorldLoaded(worldTO);
      expect(vm.allowWorldCompletionModalButtonClick).toBe(false);
    });

    test("onLearningWorldLoaded handles empty spaces array", () => {
      const worldTO = {
        completionModalShown: false,
        spaces: [],
      } as LearningWorldTO;

      systemUnderTest.onLearningWorldLoaded(worldTO);
      expect(vm.allowWorldCompletionModalButtonClick).toBe(true); // Empty array means all are completed
    });

    test("onLearningWorldScored handles zero score requirement", () => {
      const worldScoreTO = {
        worldID: 1,
        currentScore: 0,
        requiredScore: 0,
      };

      systemUnderTest.onLearningWorldScored(worldScoreTO);
      expect(vm.allowWorldCompletionModalButtonClick).toBe(true);
    });

    test("onLearningWorldScored handles negative score scenario", () => {
      const worldScoreTO = {
        worldID: 1,
        currentScore: -5,
        requiredScore: 10,
      };

      systemUnderTest.onLearningWorldScored(worldScoreTO);
      expect(vm.allowWorldCompletionModalButtonClick).toBe(false);
    });
  });
});
