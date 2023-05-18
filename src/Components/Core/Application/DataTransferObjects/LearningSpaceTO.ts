import { ComponentID } from "../../Domain/Types/EntityTypes";
import { LearningSpaceTemplateStrings } from "../../Domain/Types/LearningSpaceTemplateTypes";
import { BooleanNode } from "../UseCases/CalculateLearningSpaceAvailability/Parser/BooleanSyntaxTree";
import LearningElementTO from "./LearningElementTO";

export default class LearningSpaceTO {
  id: ComponentID;
  name: string;
  elements: (LearningElementTO | null)[];
  description: string;
  goals: string[];
  requirementsString: string | "";
  requirementsSyntaxTree: BooleanNode | null;
  isAvailable: boolean;
  requiredScore: number;
  currentScore: number;
  maxScore: number;
  template: LearningSpaceTemplateStrings;
}
