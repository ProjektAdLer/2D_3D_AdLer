import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import StyledModal from "../../ReactRelated/ReactBaseComponents/StyledModal";
import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import WorldManagerModalViewModel, {
  WorldInfo,
} from "./WorldManagerModalViewModel";
import type IWorldManagerModalController from "./IWorldManagerModalController";
import plusIcon from "../../../../../../Assets/icons/plus.svg";
import exportIcon from "../../../../../../Assets/icons/log-export.svg";
import deleteIcon from "../../../../../../Assets/icons/close.svg";
import tailwindMerge from "../../../Utils/TailwindMerge";

export interface WorldManagerModalProps {
  viewModel: WorldManagerModalViewModel;
  controller: IWorldManagerModalController;
}

/**
 * WorldManagerModal - Modal for managing learning worlds
 * Supports import, export, and deletion of worlds
 */
export default function WorldManagerModal({
  viewModel,
  controller,
}: WorldManagerModalProps) {
  const { t: translate } = useTranslation("worldMenu");
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const safeWorlds = worlds || [];
  const safeLoading = loading || false;

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

  useEffect(() => {
    const dropZone = document.getElementById("drop-zone");

    const dropHandler = async (e: DragEvent) => {
      if (!e.dataTransfer) return;
      if ([...e.dataTransfer.items].some((item) => item.kind === "file")) {
        e.preventDefault();
      }
      let file = e.dataTransfer.files?.[0];
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

    // cancels dragover event to enable drop event to occur
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
          {/* Import Success Message */}
          {importSuccess && (
            <div className="rounded bg-green-100 p-4">
              <p className="font-semibold text-green-800">
                ✓ {importSuccess.worldName} erfolgreich importiert!
              </p>
              <p className="text-sm text-green-700">
                {importSuccess.elementCount} Elemente
              </p>
            </div>
          )}

          {/* Import Error Message */}
          {importError && (
            <div className="rounded bg-red-100 p-4">
              <p className="font-semibold text-red-800">
                ✗ Import fehlgeschlagen
              </p>
              <p className="text-sm text-red-700">{importError}</p>
            </div>
          )}

          {/* Import Button */}
          <div className={tailwindMerge("flex")}>
            <StyledButton
              onClick={handleImportClick}
              disabled={isImporting}
              className="bg-adlerblue text-white hover:bg-adlerdarkblue"
              icon={plusIcon}
              shape="freeFloatCenter"
            >
              {isImporting ? "Importiere..." : "Lernwelt importieren (.mbz)"}
            </StyledButton>
            <label
              className="ml-4 flex-auto content-center border-2 border-dashed border-adlerdarkblue text-center text-gray-500"
              id="drop-zone"
              onClick={(event) => {
                event.preventDefault();
              }}
            >
              Drop files here, please
            </label>
          </div>

          {/* Import Progress */}
          {isImporting && (
            <div className="rounded bg-blue-50 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-adlerblue">
                  {importStatus || "Importiere..."}
                </span>
                <span className="text-sm text-gray-600">{importProgress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full bg-adlerblue transition-all duration-300"
                  style={{ width: `${importProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Export Progress */}
          {isExporting && (
            <div className="rounded bg-green-50 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-green-700">
                  {exportStatus || "Exportiere..."}
                </span>
                <span className="text-sm text-gray-600">{exportProgress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full bg-green-600 transition-all duration-300"
                  style={{ width: `${exportProgress}%` }}
                />
              </div>
            </div>
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
                <WorldRow
                  key={world.worldID}
                  world={world}
                  onDelete={() => controller.onDeleteWorld(world.worldID)}
                  onExport={() => controller.onExportWorld(world.worldID)}
                  translate={translate}
                />
              ))}
            </div>
          )}

          {/* Storage Information - at the bottom */}
          {storageInfo && (
            <div className="bg-adlerbgbright rounded p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold">
                  {translate("worldManagement.storage", "Speicher")}
                </span>
                <span className="text-sm text-gray-600">
                  {storageInfo.usedFormatted} / {storageInfo.quotaFormatted}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full bg-adlerblue transition-all duration-300"
                  style={{ width: `${storageInfo.usedPercent}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {storageInfo.usedPercent}%{" "}
                {translate("worldManagement.used", "belegt")}
              </p>
            </div>
          )}
        </div>
      </StyledModal>
    </>
  );
}

/**
 * WorldRow - Single row displaying world information
 */
interface WorldRowProps {
  world: WorldInfo;
  onDelete: () => void;
  onExport: () => void;
  translate: any;
}

function WorldRow({ world, onDelete, onExport, translate }: WorldRowProps) {
  return (
    <div className="flex items-center justify-between rounded border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md">
      <div className="mr-4 min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-bold text-gray-800">{world.worldName}</p>
          {world.source === "public" && (
            <span className="whitespace-nowrap rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
              {translate("worldManagement.preinstalled", "Vorinstalliert")}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-gray-600">
          {world.elementCount}{" "}
          {translate("worldManagement.elements", "Elemente")} ·{" "}
          {world.sizeFormatted}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex shrink-0 gap-2">
        {world.source === "indexeddb" && (
          <>
            <StyledButton
              onClick={onExport}
              className="bg-adlerblue !px-2 !py-1 !text-xs text-white hover:bg-adlerdarkblue"
              icon={exportIcon}
              shape="freeFloatCenter"
            >
              <span className="text-xs">
                {translate("worldManagement.export", "Exportieren")}
              </span>
            </StyledButton>
            <StyledButton
              onClick={onDelete}
              className="bg-red-500 !px-2 !py-1 !text-xs text-white hover:bg-red-600"
              icon={deleteIcon}
              shape="freeFloatCenter"
            >
              <span className="text-xs">
                {translate("worldManagement.delete", "Löschen")}
              </span>
            </StyledButton>
          </>
        )}
      </div>
    </div>
  );
}
