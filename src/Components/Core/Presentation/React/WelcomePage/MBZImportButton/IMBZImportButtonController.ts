/**
 * Controller interface for MBZImportButton
 * Handles user interactions for importing MBZ files
 */
export default interface IMBZImportButtonController {
  /**
   * Reference to the file input element (set by View)
   */
  fileInputRef: HTMLInputElement | null;

  /**
   * Called when user clicks the import button
   */
  onImportButtonClick(): void;

  /**
   * Called when user selects a file
   */
  onFileSelected(file: File | null): Promise<void>;

  /**
   * Called when user closes the success modal
   */
  onSuccessModalClose(): Promise<void>;

  /**
   * Called when user closes the error modal
   */
  onErrorModalClose(): void;
}
