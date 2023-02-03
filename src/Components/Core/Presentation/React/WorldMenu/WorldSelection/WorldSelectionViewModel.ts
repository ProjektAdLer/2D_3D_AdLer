import Observable from "src/Lib/Observable";

export interface WorldSelectionWorldData {
  id: number;
  isCompleted: boolean;
  title: string;
}
export default class WorldSelectionViewModel {
  worlds: Observable<WorldSelectionWorldData[]> = new Observable<
    WorldSelectionWorldData[]
  >([
    { id: 1, isCompleted: false, title: "World 1" },
    { id: 2, isCompleted: false, title: "World 2" },
  ]);

  selectedRowID: Observable<number> = new Observable<number>(-1);
}
