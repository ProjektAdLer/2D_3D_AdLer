import { ComponentID } from "../../Domain/Types/EntityTypes";
import { LearningSpaceTemplateType } from "../../Domain/Types/LearningSpaceTemplateType";
import { ThemeType } from "../../Domain/Types/ThemeTypes";
import IElementCompletionDisplay from "../../Presentation/Utils/ElementCompletionDisplay/IElementCompletionDisplay";
import { BooleanNode } from "../UseCases/CalculateLearningSpaceAvailability/Parser/BooleanSyntaxTree";
import LearningElementTO from "./LearningElementTO";
import StoryElementTO from "./StoryElementTO";

export default class LearningSpaceTO {
  id: ComponentID;
  name: string;
  elements: (LearningElementTO | null)[];
  description: string;
  goals: string[];
  requirementsString: string;
  requirementsSyntaxTree: BooleanNode | null;
  isAvailable: boolean;
  requiredScore: number;
  currentScore: number;
  maxScore: number;
  template: LearningSpaceTemplateType;
  theme: ThemeType;
  storyElements: StoryElementTO[];
  gradingStyle: IElementCompletionDisplay;
  difficulty: number;
  parentWorldID: ComponentID;
}
