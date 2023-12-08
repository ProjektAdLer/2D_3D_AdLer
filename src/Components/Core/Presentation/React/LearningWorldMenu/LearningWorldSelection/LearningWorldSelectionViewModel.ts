import Observable from "src/Lib/Observable";

export interface LearningWorldSelectionLearningWorldData {
  id: number;
  name: string;
  isCompleted: boolean;
}
export default class LearningWorldSelectionViewModel {
  userWorlds: Observable<LearningWorldSelectionLearningWorldData[]> =
    new Observable<LearningWorldSelectionLearningWorldData[]>([]);

  selectedRowID: Observable<number> = new Observable<number>(-1);
  newData: Observable<boolean> = new Observable<boolean>(false);
}
