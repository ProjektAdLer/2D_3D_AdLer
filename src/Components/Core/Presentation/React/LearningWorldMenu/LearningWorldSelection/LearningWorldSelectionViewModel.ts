import Observable from "src/Lib/Observable";

export interface LearningWorldSelectionLearningWorldData {
  id: number;
  name: string;
  isCompleted: boolean;
}
export default class LearningWorldSelectionViewModel {
  userWorlds: Observable<LearningWorldSelectionLearningWorldData[]> =
    new Observable<LearningWorldSelectionLearningWorldData[]>([
      { id: 0, name: "Adler flieg!", isCompleted: false },
    ]);

  selectedRowID: Observable<number> = new Observable<number>(-1);
}
