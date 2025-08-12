import { ComponentID } from "../../Domain/Types/EntityTypes";
import { ThemeType } from "../../Domain/Types/ThemeTypes";
import IElementCompletionDisplay from "../../Presentation/Utils/ElementCompletionDisplay/IElementCompletionDisplay";
import LearningSpaceTO from "./LearningSpaceTO";

export default class LearningWorldTO {
  id: ComponentID;
  name: string;
  theme: ThemeType;
  spaces: LearningSpaceTO[];
  goals: string[];
  description: ThemeType;
  evaluationLink: string | null;
  evaluationLinkName: string | null;
  evaluationLinkText: string | null;
  completionModalShown: boolean | undefined;
  lastVisitedSpaceID: ComponentID | undefined;
  gradingStyle: IElementCompletionDisplay;
}
