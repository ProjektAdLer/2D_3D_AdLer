import IScoreH5PElementUseCase from "src/Components/Core/Application/UseCases/ScoreH5PElement/IScoreH5PElementUseCase";
import { ElementTypes } from "src/Components/Core/Domain/Types/ElementTypes";
import IScoreElementUseCase from "../../../../Application/UseCases/ScoreElement/IScoreElementUseCase";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../DependencyInjection/UseCases/USECASE_TYPES";
import ElementModalViewModel from "./ElementModalViewModel";
import IElementModalController from "./IElementModalController";

export default class ElementModalController implements IElementModalController {
  constructor(private viewModel: ElementModalViewModel) {}

  async scoreElement(): Promise<void> {
    if (this.viewModel.type.Value !== ElementTypes.h5p) {
      await CoreDIContainer.get<IScoreElementUseCase>(
        USECASE_TYPES.IScoreElementUseCase
      ).executeAsync(this.viewModel.id.Value);
    }
  }

  async h5pEventCalled(event: any): Promise<void> {
    // Skip malformed events
    let hasStatement = event && event.data && event.data.statement;
    if (!hasStatement) {
      return;
    }

    let statement = event.data.statement;
    let validVerb = statement.verb && statement.verb.id;
    if (!validVerb) {
      return;
    }

    let isCompleted =
      statement.verb.id === "http://adlnet.gov/expapi/verbs/answered" ||
      statement.verb.id === "http://adlnet.gov/expapi/verbs/completed";

    let isChild =
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
        USECASE_TYPES.IScoreH5PElementUseCase
      ).executeAsync({
        //@ts-ignore
        xapiData: xapiData,
        elementID: this.viewModel.id.Value,
      });
    }
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
