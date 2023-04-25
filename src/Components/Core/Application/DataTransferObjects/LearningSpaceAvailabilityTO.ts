import { BooleanNode } from "../UseCases/CalculateLearningSpaceAvailability/Parser/BooleanSyntaxTree";

export default class LearningSpaceAvailabilityTO {
  public requirementsString: string | "";
  public requirementsSyntaxTree: BooleanNode | null;
  public isAvailable: boolean;
}
