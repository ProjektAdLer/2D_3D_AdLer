import { useRef } from "react";
import { useTranslation } from "react-i18next";
import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import StyledModal from "../../ReactRelated/ReactBaseComponents/StyledModal";
import plusIcon from "../../../../../../Assets/icons/plus.svg";
import MBZImportButtonViewModel, {
  type ImportResult,
} from "./MBZImportButtonViewModel";
import type IMBZImportButtonController from "./IMBZImportButtonController";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "../../../../DependencyInjection/Builders/BUILDER_TYPES";

/**
 * MBZImportButton provides a UI for importing MBZ (Moodle Backup) files
 * into IndexedDB for offline use.
 *
 * This component follows the MVC pattern:
 * - View: Displays UI and handles user interactions
 * - Controller: Processes interactions and coordinates Use Cases
 * - Presenter: Transforms data from Use Cases to ViewModel format
 */
export default function MBZImportButton() {
  const { t: translate } = useTranslation("worldMenu");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get ViewModel and Controller from Builder
  const [viewModel, controller] = useBuilder<
    MBZImportButtonViewModel,
    IMBZImportButtonController
  >(BUILDER_TYPES.IMBZImportButtonBuilder);

  // Set file input ref in controller so it can trigger clicks
  if (controller) {
    controller.fileInputRef = fileInputRef.current;
  }

  // Observe ViewModel properties
  const [isImporting] = useObservable<boolean>(viewModel?.isImporting);
  const [showSuccessModal] = useObservable<boolean>(
    viewModel?.showSuccessModal,
  );
  const [showErrorModal] = useObservable<boolean>(viewModel?.showErrorModal);
  const [importResult] = useObservable<ImportResult>(viewModel?.importResult);
  const [importProgress] = useObservable<number>(viewModel?.importProgress);
  const [importStatus] = useObservable<string>(viewModel?.importStatus);

  const handleFileSelected = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0] || null;
    if (controller) {
      await controller.onFileSelected(file);
    }
  };

  return (
    <>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".mbz"
        style={{ display: "none" }}
        onChange={handleFileSelected}
      />

      {/* Import button */}
      <StyledButton
        shape="smallSquare"
        onClick={() => controller?.onImportButtonClick()}
        disabled={isImporting}
        className="bg-adlerlightblue hover:bg-adlerblue"
        title={String(translate("importButton.label", "Import World (.mbz)"))}
      >
        <img
          className="w-10 xl:w-12 mobile-landscape:w-6"
          src={plusIcon}
          alt={String(translate("importButton.label", "Import World (.mbz)"))}
        />
      </StyledButton>

      {/* Import progress indicator */}
      {isImporting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold">
              {translate("importButton.importing", "Importing...")}
            </h3>
            <div className="mb-2 h-4 w-64 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-adlerblue transition-all duration-300"
                style={{ width: `${importProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">{importStatus}</p>
          </div>
        </div>
      )}

      {/* Success modal */}
      {showSuccessModal && importResult && (
        <StyledModal
          title={String(
            translate("importButton.successTitle", "Import Successful"),
          )}
          showModal={showSuccessModal}
          onClose={() => controller?.onSuccessModalClose()}
          canClose={false}
        >
          <div className="space-y-4">
            <p>
              {translate(
                "importButton.successMessage",
                "World imported successfully!",
              )}
            </p>
            <div className="bg-adlerbgbright rounded p-3">
              <p className="font-bold">{importResult.worldName}</p>
              <p className="text-sm">
                {translate("importButton.elementCount", "Elements")}:{" "}
                {importResult.elementCount}
              </p>
            </div>

            {importResult.warnings.length > 0 && (
              <div className="rounded bg-yellow-100 p-3">
                <p className="font-semibold text-yellow-800">
                  {translate("importButton.warnings", "Warnings")}:
                </p>
                <ul className="mt-2 list-disc pl-5 text-sm text-yellow-700">
                  {importResult.warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-sm text-adlerblue">
              {translate(
                "importButton.reloadMessage",
                "Click OK to refresh the world list.",
              )}
            </p>

            <StyledButton
              onClick={() => controller?.onSuccessModalClose()}
              className="w-full"
            >
              {translate("importButton.ok", "OK")}
            </StyledButton>
          </div>
        </StyledModal>
      )}

      {/* Error modal */}
      {showErrorModal && importResult && (
        <StyledModal
          title={String(translate("importButton.errorTitle", "Import Failed"))}
          showModal={showErrorModal}
          onClose={() => controller?.onErrorModalClose()}
          canClose={false}
        >
          <div className="space-y-4">
            <p>
              {translate(
                "importButton.errorMessage",
                "Failed to import the MBZ file.",
              )}
            </p>

            {importResult.errors.length > 0 && (
              <div className="rounded bg-red-100 p-3">
                <p className="font-semibold text-red-800">
                  {translate("importButton.errors", "Errors")}:
                </p>
                <ul className="mt-2 list-disc pl-5 text-sm text-red-700">
                  {importResult.errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <StyledButton
              onClick={() => controller?.onErrorModalClose()}
              className="w-full"
            >
              {translate("importButton.close", "Close")}
            </StyledButton>
          </div>
        </StyledModal>
      )}
    </>
  );
}
