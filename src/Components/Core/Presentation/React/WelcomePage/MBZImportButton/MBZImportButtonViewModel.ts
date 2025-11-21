import Observable from "src/Lib/Observable";

export type ImportResult = {
  worldName: string;
  elementCount: number;
  errors: string[];
  warnings: string[];
} | null;

/**
 * ViewModel for MBZImportButton
 * Pure data container for the import button state
 */
export default class MBZImportButtonViewModel {
  public isImporting = new Observable<boolean>(false);
  public showSuccessModal = new Observable<boolean>(false);
  public showErrorModal = new Observable<boolean>(false);
  public importResult = new Observable<ImportResult>(null);
  public importProgress = new Observable<number>(0);
  public importStatus = new Observable<string>("");
}
