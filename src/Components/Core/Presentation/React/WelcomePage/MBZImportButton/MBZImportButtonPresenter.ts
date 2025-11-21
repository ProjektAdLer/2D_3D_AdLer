import { injectable } from "inversify";
import IMBZImportButtonPresenter from "./IMBZImportButtonPresenter";
import MBZImportButtonViewModel from "./MBZImportButtonViewModel";
import IWorldManagementAdapter from "../../../../Application/Ports/WorldManagementPort/IWorldManagementAdapter";
import WorldImportResultTO from "../../../../Application/DataTransferObjects/WorldImportResultTO";

/**
 * Presenter for MBZImportButton
 * Implements IWorldManagementAdapter to receive data from Use Cases via Ports.
 * Transforms TOs to ViewModel format and updates the View.
 */
@injectable()
export default class MBZImportButtonPresenter
  implements IMBZImportButtonPresenter, IWorldManagementAdapter
{
  constructor(private viewModel: MBZImportButtonViewModel) {}

  /**
   * Called by WorldManagementPort when a world is imported
   */
  onWorldImported(result: WorldImportResultTO): void {
    this.viewModel.isImporting.Value = false;

    if (result.success) {
      this.viewModel.importResult.Value = {
        worldName: result.worldName,
        elementCount: result.elementCount,
        errors: result.errors,
        warnings: result.warnings,
      };
      this.viewModel.showSuccessModal.Value = true;
      this.viewModel.showErrorModal.Value = false;
    } else {
      this.viewModel.importResult.Value = {
        worldName: result.worldName,
        elementCount: result.elementCount,
        errors: result.errors,
        warnings: result.warnings,
      };
      this.viewModel.showSuccessModal.Value = false;
      this.viewModel.showErrorModal.Value = true;
    }
  }

  /**
   * Called by WorldManagementPort when an error occurs
   */
  onWorldManagementError(error: string): void {
    console.error("MBZImportButtonPresenter: Error from Use Case:", error);
    this.viewModel.isImporting.Value = false;
    this.viewModel.importResult.Value = {
      worldName: "",
      elementCount: 0,
      errors: [error],
      warnings: [],
    };
    this.viewModel.showErrorModal.Value = true;
    this.viewModel.showSuccessModal.Value = false;
  }
}
