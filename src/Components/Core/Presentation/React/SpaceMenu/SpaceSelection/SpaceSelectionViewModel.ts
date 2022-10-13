import Observable from "src/Lib/Observable";

export default class SpaceSelectionViewModel {
  spaces: Observable<[number, string][]> = new Observable<[number, string][]>(
    []
  );

  spacesCompleted: Observable<[number, boolean][]> = new Observable<
    [number, boolean][]
  >([]);

  selectedRowID: Observable<number> = new Observable<number>(-1);
}
