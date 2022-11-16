import Observable from "src/Lib/Observable";

export default class SpaceSelectionViewModel {
  //id, name, isAvailable, isCompleted
  spaces: Observable<[number, string, boolean, boolean][]> = new Observable<
    [number, string, boolean, boolean][]
  >([[1, "Placeholder", false, false]]);

  // Array of [id, array of required space ids]
  requirementsList: Observable<[number, number[]][]> = new Observable<
    [number, number[]][]
  >([
    [1, []],
    [2, [1]],
  ]);

  selectedRowID: Observable<number> = new Observable<number>(-1);
}
