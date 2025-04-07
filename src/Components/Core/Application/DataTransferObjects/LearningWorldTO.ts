import { ComponentID } from "../../Domain/Types/EntityTypes";
import IElementCompletionDisplay from "../../Presentation/Utils/ElementCompletionDisplay/IElementCompletionDisplay";
import LearningSpaceTO from "./LearningSpaceTO";

export default class LearningWorldTO {
  id: ComponentID;
  name: string;
  spaces: LearningSpaceTO[];
  goals: string[];
  description: string;
  worldCompletionText: string;
  evaluationLink: string;
  completionModalShown: boolean | undefined;
  lastVisitedSpaceID: ComponentID | undefined;
  displayStrategy: IElementCompletionDisplay;
}
