import Observable from "src/Lib/Observable";

export interface WorldSelectionWorldData {
  id: number;
  name: string;
  isCompleted: boolean;
}
export default class WorldSelectionViewModel {
  userWorlds: Observable<WorldSelectionWorldData[]> = new Observable<
    WorldSelectionWorldData[]
  >([
    { id: 1, name: "World 1", isCompleted: false },
    { id: 2, name: "World 2", isCompleted: true },
  ]);

  selectedRowID: Observable<number> = new Observable<number>(-1);
}
