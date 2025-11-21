import Observable from "../../../../../../Lib/Observable";

/**
 * World information for management display
 */
export interface WorldInfo {
  worldID: number;
  worldName: string;
  worldFolder: string;
  elementCount: number;
  sizeInBytes: number;
  sizeFormatted: string;
  source: "indexeddb" | "public";
}

/**
 * Storage information
 */
export interface StorageInfo {
  used: number;
  quota: number;
  available: number;
  usedFormatted: string;
  quotaFormatted: string;
  usedPercent: number;
}

/**
 * ViewModel for WorldManagerModal
 * Contains observable data for the world management UI
 */
export default class WorldManagerModalViewModel {
  public showModal = new Observable<boolean>(false);
  public worlds = new Observable<WorldInfo[]>([]);
  public loading = new Observable<boolean>(false);
  public storageInfo = new Observable<StorageInfo | null>(null);

  // Import/Export states
  public isImporting = new Observable<boolean>(false);
  public importError = new Observable<string | null>(null);
  public importSuccess = new Observable<{
    worldName: string;
    elementCount: number;
  } | null>(null);
}
