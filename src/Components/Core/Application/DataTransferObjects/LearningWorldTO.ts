import { ComponentID } from "../../Domain/Types/EntityTypes";
import { LearningSpaceThemeType } from "../../Domain/Types/LearningSpaceThemeTypes";
import IElementCompletionDisplay from "../../Presentation/Utils/ElementCompletionDisplay/IElementCompletionDisplay";
import LearningSpaceTO from "./LearningSpaceTO";

export default class LearningWorldTO {
  id: ComponentID;
  name: string;
  theme: LearningSpaceThemeType;
  spaces: LearningSpaceTO[];
  goals: string[];
  description: LearningSpaceThemeType;
  evaluationLink: string | null;
  evaluationLinkName: string | null;
  evaluationLinkText: string | null;
  completionModalShown: boolean | undefined;
  lastVisitedSpaceID: ComponentID | undefined;
  gradingStyle: IElementCompletionDisplay;
}
