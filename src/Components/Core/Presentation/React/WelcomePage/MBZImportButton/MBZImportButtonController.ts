import { injectable } from "inversify";
import IMBZImportButtonController from "./IMBZImportButtonController";
import MBZImportButtonViewModel from "./MBZImportButtonViewModel";
import type IImportLearningWorldUseCase from "../../../../Application/UseCases/ImportLearningWorld/IImportLearningWorldUseCase";
import type ILoadUserLearningWorldsInfoUseCase from "../../../../Application/UseCases/LoadUserLearningWorldsInfo/ILoadUserLearningWorldsInfoUseCase";

/**
 * Controller for MBZImportButton
 * Handles user interactions and delegates to Use Cases
 */
@injectable()
export default class MBZImportButtonController
  implements IMBZImportButtonController
{
  // Reference to file input for triggering clicks
  public fileInputRef: HTMLInputElement | null = null;

  constructor(
    private viewModel: MBZImportButtonViewModel,
    private importWorldUseCase: IImportLearningWorldUseCase,
    private loadUserWorldsInfoUseCase: ILoadUserLearningWorldsInfoUseCase,
  ) {}

  /**
   * Trigger the hidden file input when button is clicked
   */
  onImportButtonClick(): void {
    this.fileInputRef?.click();
  }

  /**
   * Handle file selection and start import process
   */
  async onFileSelected(file: File | null): Promise<void> {
    if (!file) return;

    // Validate file extension
    if (!file.name.toLowerCase().endsWith(".mbz")) {
      this.viewModel.importResult.Value = {
        worldName: "",
        elementCount: 0,
        errors: ["Please select a valid .mbz file"],
        warnings: [],
      };
      this.viewModel.showErrorModal.Value = true;
      return;
    }

    // Start import process
    this.viewModel.isImporting.Value = true;
    this.viewModel.importProgress.Value = 0;
    this.viewModel.importStatus.Value = "Starting import...";

    try {
      // Execute Use Case with progress callback
      await this.importWorldUseCase.executeAsync({
        file,
        onProgress: (current: number, total: number, status: string) => {
          const progress = total > 0 ? (current / total) * 100 : 0;
          this.viewModel.importProgress.Value = Math.round(progress);
          this.viewModel.importStatus.Value = status;
        },
      });

      // Success handled by Presenter via Port
    } catch (error) {
      // Error handled by Presenter via Port
      console.error("MBZImportButtonController: Unexpected error", error);
    } finally {
      // Reset file input
      if (this.fileInputRef) {
        this.fileInputRef.value = "";
      }
    }
  }

  /**
   * Close success modal and refresh world list
   */
  async onSuccessModalClose(): Promise<void> {
    this.viewModel.showSuccessModal.Value = false;
    this.viewModel.importResult.Value = null;
    this.viewModel.importProgress.Value = 0;
    this.viewModel.importStatus.Value = "";

    // Refresh world list
    await this.loadUserWorldsInfoUseCase.executeAsync();
  }

  /**
   * Close error modal and reset state
   */
  onErrorModalClose(): void {
    this.viewModel.showErrorModal.Value = false;
    this.viewModel.importResult.Value = null;
    this.viewModel.isImporting.Value = false;
    this.viewModel.importProgress.Value = 0;
    this.viewModel.importStatus.Value = "";
  }
}
