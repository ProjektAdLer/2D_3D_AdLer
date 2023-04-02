import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import Observable from "src/Lib/Observable";

export interface RequiredLearningSpaceData {
  id: ComponentID;
  isCompleted: boolean;
}

export interface LearningSpaceSelectionLearningSpaceData {
  id: ComponentID;
  name: string;
  requiredSpaces: RequiredLearningSpaceData[];
  isAvailable: boolean;
  isCompleted: boolean;
}

export default class LearningSpaceSelectionViewModel {
  worldID: Observable<ComponentID> = new Observable<ComponentID>(-1);

  spaces: Observable<LearningSpaceSelectionLearningSpaceData[]> =
    new Observable<LearningSpaceSelectionLearningSpaceData[]>([]);

  selectedRowSpaceID: Observable<number> = new Observable<number>(-1);
}
