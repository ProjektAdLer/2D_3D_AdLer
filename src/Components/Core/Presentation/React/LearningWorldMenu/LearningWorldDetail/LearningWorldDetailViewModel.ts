import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import Observable from "src/Lib/Observable";

export default class LearningWorldDetailViewModel {
  id: Observable<ComponentID> = new Observable<ComponentID>(undefined);
  name: Observable<string> = new Observable<string>(undefined);
  description: Observable<string> = new Observable<string>(undefined);
  goals: Observable<string[]> = new Observable<string[]>(undefined);

  estimatedTimeInMinutes: Observable<number> = new Observable<number>(
    undefined,
  );

  spaces: Observable<LearningSpaceTO[]> = new Observable<LearningSpaceTO[]>([]);
}
