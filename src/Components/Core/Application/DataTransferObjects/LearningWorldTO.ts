import { ComponentID } from "../../Domain/Types/EntityTypes";
import IElementCompletionDisplay from "../../Presentation/Utils/ElementCompletionDisplay/IElementCompletionDisplay";
import LearningSpaceTO from "./LearningSpaceTO";

export default class LearningWorldTO {
  id: ComponentID;
  name: string;
  spaces: LearningSpaceTO[];
  goals: string[];
  description: string;
  evaluationLink: string | null;
  evaluationLinkName: string | null;
  evaluationLinkText: string | null;
  completionModalShown: boolean | undefined;
  lastVisitedSpaceID: ComponentID | undefined;
  gradingStyle: IElementCompletionDisplay;
}
