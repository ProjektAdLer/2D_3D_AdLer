import { BooleanNode } from "src/Components/Core/Application/UseCases/CalculateLearningSpaceAvailability/Parser/BooleanSyntaxTree";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import Observable from "src/Lib/Observable";

export interface RequiredLearningSpaceData {
  id: ComponentID;
  isCompleted: boolean;
}

export interface LearningSpaceSelectionLearningSpaceData {
  id: ComponentID;
  name: string;
  requirementsSyntaxTree: BooleanNode | null;
  isAvailable: boolean;
  isCompleted: boolean;
}

export default class LearningSpaceSelectionViewModel {
  worldID: Observable<ComponentID> = new Observable<ComponentID>(-1);

  spaces: Observable<LearningSpaceSelectionLearningSpaceData[]> =
    new Observable<LearningSpaceSelectionLearningSpaceData[]>([]);

  lastSelectedSpaceID: Observable<number> = new Observable<number>(-1);
}
