import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import Observable from "src/Lib/Observable";

export interface LearningWorldDetailLearningSpaceData {
  id: ComponentID;
  name: string;
  isCompleted: boolean;
}

export default class LearningWorldDetailViewModel {
  id: Observable<ComponentID> = new Observable<ComponentID>(undefined);
  name: Observable<string> = new Observable<string>(undefined);
  description: Observable<string> = new Observable<string>(undefined);
  goals: Observable<string[]> = new Observable<string[]>(undefined);

  spaces: Observable<LearningWorldDetailLearningSpaceData[]> = new Observable<
    LearningWorldDetailLearningSpaceData[]
  >([]);
}
