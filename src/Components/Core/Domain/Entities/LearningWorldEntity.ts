import IElementCompletionDisplay from "../../Presentation/Utils/ElementCompletionDisplay/IElementCompletionDisplay";
import { ComponentID } from "../Types/EntityTypes";
import { ThemeType } from "../Types/ThemeTypes";
import LearningSpaceEntity from "./LearningSpaceEntity";
import NarrativeFrameworkEntity from "./NarrativeFrameworkEntity";

export default class LearningWorldEntity {
  id: ComponentID;
  name: string;
  spaces: LearningSpaceEntity[];
  goals: string[];
  description: string;
  evaluationLink: string | null;
  evaluationLinkName: string | null;
  evaluationLinkText: string | null;
  completionModalShown: boolean | undefined;
  lastVisitedSpaceID: ComponentID | undefined;
  narrativeFramework: NarrativeFrameworkEntity | null;
  theme: ThemeType;
  gradingStyle: IElementCompletionDisplay;
}
