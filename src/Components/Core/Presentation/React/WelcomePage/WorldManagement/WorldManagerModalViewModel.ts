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
  /** Timestamp when the world was imported (only for IndexedDB worlds) */
  importedAt?: number;
  /** Timestamp when the world was last updated (re-imported) */
  updatedAt?: number;
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
  public importProgress = new Observable<number>(0); // 0-100
  public importStatus = new Observable<string>(""); // Status message during import
  public importError = new Observable<string | null>(null);
  public importSuccess = new Observable<{
    worldName: string;
    elementCount: number;
  } | null>(null);

  // Export states
  public isExporting = new Observable<boolean>(false);
  public exportProgress = new Observable<number>(0); // 0-100
  public exportStatus = new Observable<string>(""); // Status message during export
  public exportingWorldID = new Observable<number | null>(null); // Track which world is being exported

  // Delete confirmation dialog state (managed by View, not browser alert)
  public deleteConfirmation = new Observable<{
    worldID: number;
    worldName: string;
    sizeFormatted: string;
  } | null>(null);

  // Error states for UI display (instead of browser alerts)
  public deleteError = new Observable<string | null>(null);
  public exportError = new Observable<string | null>(null);

  // Download state - View handles the actual download trigger
  public pendingDownload = new Observable<{
    fileName: string;
    fileData: Blob;
  } | null>(null);

  // Page reload flag - View handles the actual reload
  public shouldReloadPage = new Observable<boolean>(false);

  // Publish mode (Dozentenmodus) states
  public isPublishMode = new Observable<boolean>(false);
  public selectedWorldIDs = new Observable<Set<number>>(new Set());
  public isExportingPackage = new Observable<boolean>(false);
  public packageExportProgress = new Observable<number>(0);
  public packageExportStatus = new Observable<string>("");
  public packageExportError = new Observable<string | null>(null);
}
