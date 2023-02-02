import Observable from "src/Lib/Observable";

export interface SpaceSelectionSpaceData {
  id: number;
  name: string;
  isAvailable: boolean;
  isCompleted: boolean;
}

export default class SpaceSelectionViewModel {
  spaces: Observable<SpaceSelectionSpaceData[]> = new Observable<
    SpaceSelectionSpaceData[]
  >([]);

  selectedRowSpaceID: Observable<number> = new Observable<number>(-1);
}
