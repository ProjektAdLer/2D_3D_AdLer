import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInjection } from "inversify-react";
import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import LocalStore from "../../../../Adapters/LocalStore/LocalStore";
import MBZImporter from "../../../../Adapters/LocalStore/MBZImporter";
import StyledModal from "../../ReactRelated/ReactBaseComponents/StyledModal";
import plusIcon from "../../../../../../Assets/icons/plus.svg";
import USECASE_TYPES from "../../../../DependencyInjection/UseCases/USECASE_TYPES";
import type ILoadUserLearningWorldsInfoUseCase from "../../../../Application/UseCases/LoadUserLearningWorldsInfo/ILoadUserLearningWorldsInfoUseCase";

/**
 * MBZImportButton provides a UI for importing MBZ (Moodle Backup) files
 * into IndexedDB for offline use.
 *
 * Process:
 * 1. User clicks button
 * 2. File input opens
 * 3. User selects .mbz file
 * 4. MBZImporter extracts and stores in IndexedDB
 * 5. Learning world list is refreshed via UseCase
 */
export default function MBZImportButton() {
  const { t: translate } = useTranslation("worldMenu");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadUserWorldsInfoUseCase =
    useInjection<ILoadUserLearningWorldsInfoUseCase>(
      USECASE_TYPES.ILoadUserLearningWorldsInfoUseCase,
    );

  const [isImporting, setIsImporting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [importResult, setImportResult] = useState<{
    worldName: string;
    elementCount: number;
    errors: string[];
    warnings: string[];
  } | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file extension
    if (!file.name.toLowerCase().endsWith(".mbz")) {
      setImportResult({
        worldName: "",
        elementCount: 0,
        errors: ["Please select a valid .mbz file"],
        warnings: [],
      });
      setShowErrorModal(true);
      return;
    }

    setIsImporting(true);

    try {
      // Initialize LocalStore and MBZImporter
      const localStore = new LocalStore();
      await localStore.init();

      const importer = new MBZImporter(localStore);

      // Import the MBZ file
      const result = await importer.importMBZ(file);

      if (result.success) {
        setImportResult({
          worldName: result.worldName,
          elementCount: result.elementCount,
          errors: result.errors,
          warnings: result.warnings,
        });
        setShowSuccessModal(true);
      } else {
        setImportResult({
          worldName: result.worldName,
          elementCount: result.elementCount,
          errors: result.errors,
          warnings: result.warnings,
        });
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("MBZ Import failed:", error);
      setImportResult({
        worldName: "",
        elementCount: 0,
        errors: [error instanceof Error ? error.message : "Unknown error"],
        warnings: [],
      });
      setShowErrorModal(true);
    } finally {
      setIsImporting(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSuccessModalClose = async () => {
    setShowSuccessModal(false);
    // Refresh world list via UseCase instead of reloading
    await loadUserWorldsInfoUseCase.executeAsync();
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
    setImportResult(null);
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
        onClick={handleButtonClick}
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

      {/* Success modal */}
      {showSuccessModal && importResult && (
        <StyledModal
          title={String(
            translate("importButton.successTitle", "Import Successful"),
          )}
          showModal={showSuccessModal}
          onClose={handleSuccessModalClose}
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

            <StyledButton onClick={handleSuccessModalClose} className="w-full">
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
          onClose={handleErrorModalClose}
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

            <StyledButton onClick={handleErrorModalClose} className="w-full">
              {translate("importButton.close", "Close")}
            </StyledButton>
          </div>
        </StyledModal>
      )}
    </>
  );
}
