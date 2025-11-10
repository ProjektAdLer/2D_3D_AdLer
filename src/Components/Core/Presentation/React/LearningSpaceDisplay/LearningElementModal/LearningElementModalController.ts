import ILearningWorldCompletionModalPresenter from "~ReactComponents/LearningSpaceMenu/LearningWorldCompletionModal/ILearningWorldCompletionModalPresenter";
import IScoreH5PElementUseCase from "src/Components/Core/Application/UseCases/ScoreH5PLearningElement/IScoreH5PLearningElementUseCase";
import { LearningElementTypes } from "src/Components/Core/Domain/Types/LearningElementTypes";
import IScoreLearningElementUseCase from "../../../../Application/UseCases/ScoreLearningElement/IScoreLearningElementUseCase";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../DependencyInjection/UseCases/USECASE_TYPES";
import LearningElementModalViewModel from "./LearningElementModalViewModel";
import ILearningElementModalController from "./ILearningElementModalController";
import IBottomTooltipPresenter from "../BottomTooltip/IBottomTooltipPresenter";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import bind from "bind-decorator";
import IBeginStoryElementOutroCutSceneUseCase from "src/Components/Core/Application/UseCases/BeginStoryElementOutroCutScene/IBeginStoryElementOutroCutSceneUseCase";
import IGetSettingsConfigUseCase from "src/Components/Core/Application/UseCases/GetSettingsConfig/IGetSettingsConfigUseCase";
import ISetSettingsConfigUseCase from "src/Components/Core/Application/UseCases/SetSettingsConfig/ISetSettingsConfigUseCase";
import SettingsTO from "src/Components/Core/Application/DataTransferObjects/SettingsTO";

export default class LearningElementModalController
  implements ILearningElementModalController
{
  private BottomTooltipPresenter: IBottomTooltipPresenter;
  private beginStoryElementOutroCutSceneUseCase: IBeginStoryElementOutroCutSceneUseCase;
  private getSettingsConfigUseCase: IGetSettingsConfigUseCase;
  private setSettingsConfigUseCase: ISetSettingsConfigUseCase;

  constructor(private viewModel: LearningElementModalViewModel) {
    this.BottomTooltipPresenter = CoreDIContainer.get<IBottomTooltipPresenter>(
      PRESENTATION_TYPES.IBottomTooltipPresenter,
    );
    this.beginStoryElementOutroCutSceneUseCase =
      CoreDIContainer.get<IBeginStoryElementOutroCutSceneUseCase>(
        USECASE_TYPES.IBeginStoryElementOutroCutSceneUseCase,
      );
    this.getSettingsConfigUseCase =
      CoreDIContainer.get<IGetSettingsConfigUseCase>(
        USECASE_TYPES.IGetSettingsConfigUseCase,
      );
    this.setSettingsConfigUseCase =
      CoreDIContainer.get<ISetSettingsConfigUseCase>(
        USECASE_TYPES.ISetSettingsConfigUseCase,
      );
  }

  @bind
  closeModal(): void {
    this.viewModel.isOpen.Value = false;
  }

  @bind
  triggerOutroCutscene(): void {
    this.beginStoryElementOutroCutSceneUseCase.execute({
      scoredLearningElementID: this.viewModel.id.Value,
    });
  }

  async scoreLearningElement(): Promise<boolean> {
    let result = true;
    if (this.viewModel.type.Value !== LearningElementTypes.h5p) {
      try {
        await CoreDIContainer.get<IScoreLearningElementUseCase>(
          USECASE_TYPES.IScoreLearningElementUseCase,
        ).executeAsync(this.viewModel.id.Value);
      } catch (e) {
        result = false;
      }
    }
    return result;
  }

  @bind
  async h5pEventCalled(event: any): Promise<void> {
    // Skip XAPI events if the element is a primitive h5p
    if (this.viewModel.isScoreable.Value === false) {
      return;
    }

    // Skip malformed events.
    const hasStatement = event && event.data && event.data.statement;
    if (!hasStatement) {
      return;
    }

    const statement = event.data.statement;
    const validVerb = statement.verb && statement.verb.id;
    if (!validVerb) {
      return;
    }

    const isCompleted =
      statement.verb.id === "http://adlnet.gov/expapi/verbs/answered" ||
      statement.verb.id === "http://adlnet.gov/expapi/verbs/completed";

    const isChild =
      statement.context &&
      statement.context.contextActivities &&
      statement.context.contextActivities.parent &&
      statement.context.contextActivities.parent[0] &&
      statement.context.contextActivities.parent[0].id;

    if (isCompleted && !isChild) {
      const xapiData = event.data.statement as XAPIData;

      statement.result.success =
        statement?.result?.score?.scaled === 1 || false;

      await CoreDIContainer.get<IScoreH5PElementUseCase>(
        USECASE_TYPES.IScoreH5PLearningElementUseCase,
      ).executeAsync({
        // @ts-ignore
        xapiData: xapiData,
        elementID: this.viewModel.id.Value,
      });
    }
  }

  // ignored coverage because tests on this listener function are too hard without strong typing for H5P
  // TODO: remove ignore
  /* istanbul ignore next */
  xAPICompletedListener(t: any): void {
    if (
      ("completed" === t.getVerb(undefined) || "answered" === t.getVerb()) &&
      !t.getVerifiedStatementValue(["context", "contextActivities", "parent"])
    ) {
      let n = t.getScore(),
        r = t.getMaxScore(),
        i = t.getVerifiedStatementValue([
          "object",
          "definition",
          "extensions",
          "http://h5p.org/x-api/h5p-local-content-id",
        ]);
      // @ts-ignore
      e.setFinished(i, n, r);
    }
  }

  showBottomToolTip(): void {
    this.BottomTooltipPresenter.show();
  }

  @bind
  setModalVisibility(isOpen: boolean): void {
    // presenter must be set in method to avoid race condition of which component will be constructed first (learningelement or learningworldcompletionmodal)
    const presenter =
      CoreDIContainer.get<ILearningWorldCompletionModalPresenter>(
        PRESENTATION_TYPES.ILearningWorldCompletionModalPresenter,
      );
    presenter.onModalVisibility(isOpen);
  }

  getUserSettings(): SettingsTO {
    return this.getSettingsConfigUseCase.execute();
  }

  setUserSettings(settings: SettingsTO): void {
    this.setSettingsConfigUseCase.execute(settings);
  }
}

export interface XAPIData {
  actor: Actor;
  verb: Verb;
  object: Object;
  context: Context;
  result: Result;
}

export interface Result {
  score: Score;
  completion: boolean;
  success: boolean;
  duration: string;
  response: string;
}

export interface Score {
  min: number;
  max: number;
  raw: number;
  scaled: number;
}

export interface Context {
  contextActivities: ContextActivities;
}

export interface ContextActivities {
  parent: Parent[];
  category: Category[];
}

export interface Parent {
  id: string;
  objectType: string;
}

export interface Category {
  id: string;
  objectType: string;
}

export interface Object {
  id: string;
  objectType: string;
  definition: Definition;
}

export interface Definition {
  name: Name;
  description: Description;
  type: string;
  interactionType: string;
  source: Source[];
  correctResponsesPattern: string[];
  target: Target[];
}

export interface Account {
  name: string;
  homePage: string;
}

export interface Actor {
  name: string;
  objectType: string;
  account: Account;
}

interface Display {
  "en-US": string;
}

export interface Verb {
  id: string;
  display: Display;
}

export interface Name {
  "en-US": string;
}

export interface Description {
  "en-US": string;
}

export interface Description2 {
  "en-US": string;
}

export interface Source {
  id: string;
  description: Description2;
}

export interface Description3 {
  "en-US": string;
}

export interface Target {
  id: string;
  description: Description3;
}
