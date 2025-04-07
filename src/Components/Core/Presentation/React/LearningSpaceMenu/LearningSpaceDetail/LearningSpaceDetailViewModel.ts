import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import Observable from "src/Lib/Observable";
import IElementCompletionDisplay from "../../../Utils/ElementCompletionDisplay/IElementCompletionDisplay";
import { LearningElementInfo } from "src/Components/Core/Domain/Types/LearningElementInfo";

export interface LearningSpaceDetailLearningSpaceData {
  id: ComponentID;
  name: string;
  isCompleted: boolean;
}

export default class LearningSpaceDetailViewModel {
  // world data
  spaces: Observable<LearningSpaceDetailLearningSpaceData[]> = new Observable<
    LearningSpaceDetailLearningSpaceData[]
  >([]);

  // space data
  id: Observable<ComponentID> = new Observable<ComponentID>(undefined);
  name: Observable<string> = new Observable<string>("");
  description: Observable<string> = new Observable<string>("");
  goals: Observable<string[]> = new Observable<string[]>([]);
  requiredPoints: Observable<number> = new Observable<number>(0);
  isAvailable: Observable<boolean> = new Observable<boolean>(false);

  completionDisplay: IElementCompletionDisplay;

  elements: Observable<LearningElementInfo[]> = new Observable<
    LearningElementInfo[]
  >([]);
}
