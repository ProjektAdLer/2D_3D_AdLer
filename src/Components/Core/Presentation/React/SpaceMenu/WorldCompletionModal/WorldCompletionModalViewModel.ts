import Observable from "src/Lib/Observable";

export default class WorldCompletionModalViewModel {
  wasClosedOnce: boolean = false;

  showModal = new Observable<boolean>(false);

  spaceIDs: Observable<number[]> = new Observable<number[]>([]);

  spacesCompleted: Observable<[number, boolean][]> = new Observable<
    [number, boolean][]
  >([]);
}
