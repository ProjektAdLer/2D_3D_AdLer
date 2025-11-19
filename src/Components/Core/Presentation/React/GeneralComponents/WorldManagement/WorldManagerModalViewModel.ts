import Observable from "../../../../../../Lib/Observable";
import type { WorldInfo, ImportProgress } from "../../../../../../electron";

export default class WorldManagerModalViewModel {
  public showModal = new Observable<boolean>(false);
  public worlds = new Observable<WorldInfo[]>([]);
  public loading = new Observable<boolean>(false);
  public importProgress = new Observable<ImportProgress | null>(null);
  public importingFile = new Observable<string | null>(null);
}
