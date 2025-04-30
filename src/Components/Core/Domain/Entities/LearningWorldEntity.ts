import IElementCompletionDisplay from "../../Presentation/Utils/ElementCompletionDisplay/IElementCompletionDisplay";
import { ComponentID } from "../Types/EntityTypes";
import { LearningSpaceThemeType } from "../Types/LearningSpaceThemeTypes";
import LearningSpaceEntity from "./LearningSpaceEntity";
import NarrativeFrameworkEntity from "./NarrativeFrameworkEntity";

export default class LearningWorldEntity {
  id: ComponentID;
  name: string;
  spaces: LearningSpaceEntity[];
  goals: string[];
  description: string;
  evaluationLink: string;
  completionModalShown: boolean | undefined;
  lastVisitedSpaceID: ComponentID | undefined;
  narrativeFramework: NarrativeFrameworkEntity | null;
  theme: LearningSpaceThemeType;
  gradingStyle: IElementCompletionDisplay;
}
