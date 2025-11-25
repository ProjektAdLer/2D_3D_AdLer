import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import StyledModal from "../../ReactRelated/ReactBaseComponents/StyledModal";
import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import WorldManagerModalViewModel from "./WorldManagerModalViewModel";
import type IWorldManagerModalController from "./IWorldManagerModalController";
import plusIcon from "../../../../../../Assets/icons/plus.svg";
import exportIcon from "../../../../../../Assets/icons/log-export.svg";
import tailwindMerge from "../../../Utils/TailwindMerge";

// Import sub-components
import {
  WorldListItem,
  ImportProgress,
  ExportProgress,
  DeleteConfirmation,
  StorageInfo,
  ImportSuccessMessage,
  ImportErrorMessage,
  DeleteErrorMessage,
  ExportErrorMessage,
} from "./Components";

export interface WorldManagerModalProps {
  viewModel: WorldManagerModalViewModel;
  controller: IWorldManagerModalController;
}

/**
 * WorldManagerModal - Modal for managing learning worlds
 * Supports import, export, and deletion of worlds
 *
 * This component follows the MVC pattern and uses sub-components for:
 * - WorldListItem: Individual world entries
 * - ImportProgress/ExportProgress: Progress indicators
 * - DeleteConfirmation: Deletion confirmation dialog
 * - StorageInfo: Storage usage display
 * - StatusMessages: Success/error notifications
 */
export default function WorldManagerModal({
  viewModel,
  controller,
}: WorldManagerModalProps) {
  const { t: translate } = useTranslation("worldMenu");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Observable state from ViewModel
  const [showModal] = useObservable(viewModel.showModal);
  const [worlds] = useObservable(viewModel.worlds);
  const [loading] = useObservable(viewModel.loading);
  const [storageInfo] = useObservable(viewModel.storageInfo);
  const [isImporting] = useObservable(viewModel.isImporting);
  const [importProgress] = useObservable(viewModel.importProgress);
  const [importStatus] = useObservable(viewModel.importStatus);
  const [importError] = useObservable(viewModel.importError);
  const [importSuccess] = useObservable(viewModel.importSuccess);
  const [isExporting] = useObservable(viewModel.isExporting);
  const [exportProgress] = useObservable(viewModel.exportProgress);
  const [exportStatus] = useObservable(viewModel.exportStatus);
  const [deleteConfirmation] = useObservable(viewModel.deleteConfirmation);
  const [deleteError] = useObservable(viewModel.deleteError);
  const [exportError] = useObservable(viewModel.exportError);
  const [pendingDownload] = useObservable(viewModel.pendingDownload);
  const [shouldReloadPage] = useObservable(viewModel.shouldReloadPage);

  // Publish mode states
  const [isPublishMode] = useObservable(viewModel.isPublishMode);
  const [selectedWorldIDs] = useObservable(viewModel.selectedWorldIDs);
  const [isExportingPackage] = useObservable(viewModel.isExportingPackage);
  const [packageExportProgress] = useObservable(
    viewModel.packageExportProgress,
  );
  const [packageExportStatus] = useObservable(viewModel.packageExportStatus);
  const [packageExportError] = useObservable(viewModel.packageExportError);

  const safeWorlds = worlds || [];
  const safeLoading = loading || false;
  const safeSelectedIDs = selectedWorldIDs || new Set<number>();

  // Handle page reload when signaled by controller
  useEffect(() => {
    if (shouldReloadPage) {
      window.location.reload();
    }
  }, [shouldReloadPage]);

  // Handle file download when pendingDownload is set
  useEffect(() => {
    if (pendingDownload) {
      const { fileName, fileData } = pendingDownload;
      const url = URL.createObjectURL(fileData);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      controller.clearPendingDownload();
    }
  }, [pendingDownload, controller]);

  // Auto-clear errors after 5 seconds
  useEffect(() => {
    if (deleteError) {
      const timer = setTimeout(() => controller.clearDeleteError(), 5000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [deleteError, controller]);

  useEffect(() => {
    if (exportError) {
      const timer = setTimeout(() => controller.clearExportError(), 5000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [exportError, controller]);

  useEffect(() => {
    if (packageExportError) {
      const timer = setTimeout(
        () => controller.clearPackageExportError(),
        5000,
      );
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [packageExportError, controller]);

  // File input handler
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await controller.onImportWorld(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Drag and drop handling
  useEffect(() => {
    const dropZone = document.getElementById("drop-zone");

    const dropHandler = async (e: DragEvent) => {
      if (!e.dataTransfer) return;
      if ([...e.dataTransfer.items].some((item) => item.kind === "file")) {
        e.preventDefault();
      }
      const file = e.dataTransfer.files?.[0];
      if (file && file.name.endsWith(".mbz")) {
        await controller.onImportWorld(file);
      }
    };

    const dragOverHandler = (e: DragEvent) => {
      if (!e.dataTransfer) return;

      for (const item of e.dataTransfer.items) {
        e.preventDefault();
        if (
          item.kind === "file" &&
          (item.type.includes("mbz") || item.type === "")
        ) {
          e.dataTransfer.dropEffect = "copy";
        } else {
          e.dataTransfer.dropEffect = "none";
        }
      }
    };

    const preventDefaultDrops = (e: DragEvent) => {
      if (!e.dataTransfer) return;
      if ([...e.dataTransfer.items].some((item) => item.kind === "file")) {
        e.preventDefault();
      }
    };

    const dragOverHandlerWindow = (e: DragEvent) => {
      if (!e.dataTransfer) return;
      const fileItems = [...e.dataTransfer.items].filter(
        (item) => item.kind === "file",
      );
      if (fileItems.length > 0) {
        e.preventDefault();
        if (e.target instanceof Node && !dropZone?.contains(e.target)) {
          e.dataTransfer.dropEffect = "none";
        }
      }
    };

    dropZone?.addEventListener("dragover", dragOverHandler);
    dropZone?.addEventListener("drop", dropHandler);
    window.addEventListener("dragover", dragOverHandlerWindow);
    window.addEventListener("drop", preventDefaultDrops);

    return () => {
      window.removeEventListener("drop", preventDefaultDrops);
      window.removeEventListener("dragover", dragOverHandlerWindow);
      dropZone?.removeEventListener("drop", dropHandler);
      dropZone?.removeEventListener("dragover", dragOverHandler);
    };
  }, [showModal, controller]);

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

      <StyledModal
        showModal={showModal}
        onClose={() => controller.onCloseModal()}
        title={String(translate("worldManagement.title", "Weltenverwaltung"))}
        canClose={true}
      >
        <div className="flex w-full min-w-[800px] max-w-[1200px] flex-col gap-4">
          {/* Status Messages */}
          {importSuccess && <ImportSuccessMessage success={importSuccess} />}
          {importError && <ImportErrorMessage error={importError} />}
          {deleteError && <DeleteErrorMessage error={deleteError} />}
          {exportError && <ExportErrorMessage error={exportError} />}
          {packageExportError && (
            <ExportErrorMessage error={packageExportError} />
          )}

          {/* Delete Confirmation Dialog */}
          {deleteConfirmation && (
            <DeleteConfirmation
              worldName={deleteConfirmation.worldName}
              sizeFormatted={deleteConfirmation.sizeFormatted}
              onConfirm={() => controller.confirmDelete()}
              onCancel={() => controller.cancelDelete()}
            />
          )}

          {/* Import Button with Drop Zone */}
          <div className={tailwindMerge("flex")}>
            <StyledButton
              onClick={handleImportClick}
              disabled={isImporting}
              className="bg-adlerblue text-white hover:bg-adlerdarkblue"
              icon={plusIcon}
              shape="freeFloatCenter"
            >
              {isImporting
                ? translate("worldManagement.importing", "Importiere...")
                : translate(
                    "worldManagement.importButton",
                    "Lernwelt importieren (.mbz)",
                  )}
            </StyledButton>
            <label
              className="ml-4 flex-auto content-center border-2 border-dashed border-adlerdarkblue text-center text-gray-500"
              id="drop-zone"
              onClick={(event) => {
                event.preventDefault();
              }}
            >
              {translate("worldManagement.dropZone", "Dateien hier ablegen")}
            </label>
          </div>

          {/* Publish Mode Toggle */}
          <div className="flex items-center justify-between rounded bg-gray-50 p-3">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={isPublishMode}
                onChange={() => controller.togglePublishMode()}
                className="h-5 w-5 cursor-pointer rounded border-gray-300 text-adlerblue focus:ring-adlerblue"
              />
              <span className="font-medium text-gray-700">
                {translate(
                  "worldManagement.publishMode",
                  "Veröffentlichungsmodus (Dozenten)",
                )}
              </span>
            </label>

            {/* Publish Mode Controls */}
            {isPublishMode && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {safeSelectedIDs.size} / {safeWorlds.length}{" "}
                  {translate("worldManagement.selected", "ausgewählt")}
                </span>
                <StyledButton
                  onClick={() => controller.selectAllWorlds()}
                  className="!px-2 !py-1 !text-xs"
                  shape="freeFloatCenter"
                >
                  {translate("worldManagement.selectAll", "Alle")}
                </StyledButton>
                <StyledButton
                  onClick={() => controller.deselectAllWorlds()}
                  className="!px-2 !py-1 !text-xs"
                  shape="freeFloatCenter"
                >
                  {translate("worldManagement.deselectAll", "Keine")}
                </StyledButton>
                <StyledButton
                  onClick={() => controller.exportSelectedWorldsPackage()}
                  disabled={safeSelectedIDs.size === 0 || isExportingPackage}
                  className="bg-adlerblue !px-3 !py-1 text-white hover:bg-adlerdarkblue disabled:opacity-50"
                  icon={exportIcon}
                  shape="freeFloatCenter"
                >
                  {isExportingPackage
                    ? translate("worldManagement.exporting", "Exportiere...")
                    : translate(
                        "worldManagement.exportPackage",
                        "Paket exportieren",
                      )}
                </StyledButton>
              </div>
            )}
          </div>

          {/* Package Export Progress */}
          {isExportingPackage && (
            <ExportProgress
              progress={packageExportProgress || 0}
              status={packageExportStatus}
            />
          )}

          {/* Progress Indicators */}
          {isImporting && (
            <ImportProgress
              progress={importProgress || 0}
              status={importStatus}
            />
          )}
          {isExporting && (
            <ExportProgress
              progress={exportProgress || 0}
              status={exportStatus}
            />
          )}

          {/* Loading State */}
          {safeLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="text-adlerblue">
                {translate("worldManagement.loading", "Lade Welten...")}
              </div>
            </div>
          )}

          {/* World List */}
          {!safeLoading && safeWorlds.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              {translate(
                "worldManagement.noWorlds",
                "Keine Lernwelten vorhanden",
              )}
            </div>
          )}

          {!safeLoading && safeWorlds.length > 0 && (
            <div className="max-h-96 space-y-2 overflow-y-auto">
              {safeWorlds.map((world) => (
                <WorldListItem
                  key={world.worldID}
                  world={world}
                  onDelete={() => controller.onDeleteWorld(world.worldID)}
                  onExport={() => controller.onExportWorld(world.worldID)}
                  isPublishMode={isPublishMode}
                  isSelected={safeSelectedIDs.has(world.worldID)}
                  onToggleSelect={() =>
                    controller.toggleWorldSelection(world.worldID)
                  }
                />
              ))}
            </div>
          )}

          {/* Storage Information */}
          {storageInfo && (
            <StorageInfo
              usedFormatted={storageInfo.usedFormatted}
              quotaFormatted={storageInfo.quotaFormatted}
              usedPercent={storageInfo.usedPercent}
            />
          )}
        </div>
      </StyledModal>
    </>
  );
}
