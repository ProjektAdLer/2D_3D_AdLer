import Observable from "src/Lib/Observable";

export interface WorldSelectionWorldData {
  id: number;
  name: string;
  isCompleted: boolean;
}
export default class WorldSelectionViewModel {
  userWorlds: Observable<WorldSelectionWorldData[]> = new Observable<
    WorldSelectionWorldData[]
  >([{ id: 0, name: "Adler flieg!", isCompleted: false }]);

  selectedRowID: Observable<number> = new Observable<number>(-1);
}
