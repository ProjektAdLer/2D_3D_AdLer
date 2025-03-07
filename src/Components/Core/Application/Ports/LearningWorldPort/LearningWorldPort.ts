import { injectable } from "inversify";
import ILearningWorldPort from "../Interfaces/ILearningWorldPort";
import LearningWorldTO from "../../DataTransferObjects/LearningWorldTO";
import AbstractPort from "../AbstractPort/AbstractPort";
import ILearningWorldAdapter from "./ILearningWorldAdapter";
import LearningElementTO from "../../DataTransferObjects/LearningElementTO";
import LearningSpaceScoreTO from "../../DataTransferObjects/LearningSpaceScoreTO";
import LearningSpaceTO from "../../DataTransferObjects/LearningSpaceTO";
import UserInitialLearningWorldsInfoTO from "../../DataTransferObjects/UserInitialLearningWorldsInfoTO";
import { ComponentID } from "../../../Domain/Types/EntityTypes";
import LearningWorldScoreTO from "../../DataTransferObjects/LearningWorldScoreTO";
import LearningSpacePrecursorAndSuccessorTO from "../../DataTransferObjects/LearningSpacePrecursorAndSuccessorTO";
import AdaptivityElementProgressTO from "../../DataTransferObjects/AdaptivityElement/AdaptivityElementProgressTO";
import AdaptivityElementProgressUpdateTO from "../../DataTransferObjects/AdaptivityElement/AdaptivityElementProgressUpdateTO";
import AdaptivityElementHintTO from "../../DataTransferObjects/AdaptivityElement/AdaptivityElementHintTO";
import UserLearningWorldsInfoTO from "../../DataTransferObjects/UserLearningWorldsInfoTO";
import StoryElementTO from "../../DataTransferObjects/StoryElementTO";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import bind from "bind-decorator";
import AdaptivityElementQuestionPresentationUpdateTO from "../../DataTransferObjects/AdaptivityElement/AdaptivityElementQuestionPresentationUpdateTO";
import NarrativeFrameworkTO from "../../DataTransferObjects/NarrativeFrameworkTO";

@injectable()
export default class LearningWorldPort
  extends AbstractPort<ILearningWorldAdapter>
  implements ILearningWorldPort
{
  @bind
  name(): string {
    return "LEARNINGWORLD-PORT";
  }

  // userWorlds
  public onUserInitialLearningWorldsInfoLoaded(
    userInitialLearningWorldsInfoTO: UserInitialLearningWorldsInfoTO,
  ): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onUserInitialLearningWorldsInfoLoaded)
          value.onUserInitialLearningWorldsInfoLoaded(
            userInitialLearningWorldsInfoTO,
          );
      });
    });
  }
  public onUserLearningWorldsInfoLoaded(
    userLearningWorldsInfoTO: UserLearningWorldsInfoTO,
  ): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onUserLearningWorldsInfoLoaded)
          value.onUserLearningWorldsInfoLoaded(userLearningWorldsInfoTO);
      });
    });
  }

  // world
  public onLearningWorldLoaded(learningWorldTO: LearningWorldTO): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onLearningWorldLoaded)
          value.onLearningWorldLoaded(learningWorldTO);
      });
    });
  }

  public onLearningWorldScored(
    learningWorldScoreTO: LearningWorldScoreTO,
  ): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onLearningWorldScored)
          value.onLearningWorldScored(learningWorldScoreTO);
      });
    });
  }

  public onLearningWorldEntityLoaded(learningWorldTO: LearningWorldTO): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onLearningWorldEntityLoaded)
          value.onLearningWorldEntityLoaded(learningWorldTO);
      });
    });
  }

  // space
  public onLearningSpaceLoaded(learningSpaceTO: LearningSpaceTO): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onLearningSpaceLoaded)
          value.onLearningSpaceLoaded(learningSpaceTO);
      });
    });
  }

  public onLearningSpaceScored(
    learningSpaceScoreTO: LearningSpaceScoreTO,
  ): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onLearningSpaceScored)
          value.onLearningSpaceScored(learningSpaceScoreTO);
      });
    });
  }

  public onLearningSpacePrecursorAndSuccessorLoaded(
    LearningSpacePrecursorAndSuccessorTO: LearningSpacePrecursorAndSuccessorTO,
  ): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onLearningSpacePrecursorAndSuccessorLoaded)
          value.onLearningSpacePrecursorAndSuccessorLoaded(
            LearningSpacePrecursorAndSuccessorTO,
          );
      });
    });
  }

  // element
  public onLearningElementLoaded(
    learningElementStartedTO: LearningElementTO,
  ): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onLearningElementLoaded)
          value.onLearningElementLoaded(learningElementStartedTO);
      });
    });
  }
  public onLearningElementScored(
    hasScored: boolean,
    learningElementID: ComponentID,
  ): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onLearningElementScored)
          value.onLearningElementScored(hasScored, learningElementID);
      });
    });
  }
  public onLearningElementHighlighted(learningElementID: ComponentID): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onLearningElementHighlighted)
          value.onLearningElementHighlighted(learningElementID);
      });
    });
  }

  // adaptivity
  public onAdaptivityElementLoaded(
    adaptivityElementProgressTO: AdaptivityElementProgressTO,
  ): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onAdaptivityElementLoaded)
          value.onAdaptivityElementLoaded(adaptivityElementProgressTO);
      });
    });
  }

  public onAdaptivityElementAnswerEvaluated(
    adaptivityElementProgressUpdateTO: AdaptivityElementProgressUpdateTO,
  ): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onAdaptivityElementAnswerEvaluated)
          value.onAdaptivityElementAnswerEvaluated(
            adaptivityElementProgressUpdateTO,
          );
      });
    });
  }

  public onAdaptivityElementUserHintInformed(
    adaptivityElementHintTO: AdaptivityElementHintTO,
  ): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onAdaptivityElementUserHintInformed)
          value.onAdaptivityElementUserHintInformed(adaptivityElementHintTO);
      });
    });
  }

  public onAdaptivityElementQuestionAnsweredCorrectly(
    adaptivityElementQuestionPresentationUpdateTO: AdaptivityElementQuestionPresentationUpdateTO,
  ): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onAdaptivityElementQuestionAnsweredCorrectly)
          value.onAdaptivityElementQuestionAnsweredCorrectly(
            adaptivityElementQuestionPresentationUpdateTO,
          );
      });
    });
  }

  //Story
  public onStoryElementLoaded(storyelementTO: StoryElementTO): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onStoryElementLoaded)
          value.onStoryElementLoaded(storyelementTO);
      });
    });
  }

  public onStoryElementCutSceneTriggered(storyType: StoryElementType): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onStoryElementCutSceneTriggered)
          value.onStoryElementCutSceneTriggered(storyType);
      });
    });
  }

  public onStoryElementCutSceneFinished(): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onStoryElementCutSceneFinished)
          value.onStoryElementCutSceneFinished();
      });
    });
  }

  // Narrative Framework

  public onNarrativeFrameworkInfoLoaded(
    narrativeFrameworkTO: NarrativeFrameworkTO,
  ): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.onNarrativeFrameworkInfoLoaded)
          value.onNarrativeFrameworkInfoLoaded(narrativeFrameworkTO);
      });
    });
  }
}
