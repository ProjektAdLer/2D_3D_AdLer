import { useTranslation } from "react-i18next";
import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import StyledModal from "../../ReactRelated/ReactBaseComponents/StyledModal";
import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import WorldManagerModalViewModel, {
  WorldInfo,
} from "./WorldManagerModalViewModel";
import type IWorldManagerModalController from "./IWorldManagerModalController";

export interface WorldManagerModalProps {
  viewModel: WorldManagerModalViewModel;
  controller: IWorldManagerModalController;
}

/**
 * WorldManagerModal - Modal for managing imported learning worlds
 * Shows list of all worlds with storage statistics and delete functionality
 */
export default function WorldManagerModal({
  viewModel,
  controller,
}: WorldManagerModalProps) {
  const { t: translate } = useTranslation("worldMenu");

  const [showModal] = useObservable(viewModel.showModal);
  const [worlds] = useObservable(viewModel.worlds);
  const [loading] = useObservable(viewModel.loading);
  const [storageInfo] = useObservable(viewModel.storageInfo);

  if (!showModal) return null;

  return (
    <StyledModal
      isOpen={showModal}
      onClose={() => controller.onCloseModal()}
      title={String(translate("worldManagement.title", "Weltenverwaltung"))}
      showCloseButton={true}
    >
      <div className="flex flex-col gap-4">
        {/* Storage Information */}
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

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="text-adlerblue">
              {translate("worldManagement.loading", "Lade Welten...")}
            </div>
          </div>
        )}

        {/* World List */}
        {!loading && worlds.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            {translate(
              "worldManagement.noWorlds",
              "Keine Lernwelten vorhanden",
            )}
          </div>
        )}

        {!loading && worlds.length > 0 && (
          <div className="max-h-96 space-y-2 overflow-y-auto">
            {worlds.map((world) => (
              <WorldRow
                key={world.worldID}
                world={world}
                onDelete={() => controller.onDeleteWorld(world.worldID)}
                translate={translate}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-gray-200 pt-4">
          <StyledButton
            onClick={() => controller.onRefresh()}
            className="bg-gray-500 hover:bg-gray-600"
          >
            {translate("worldManagement.refresh", "Aktualisieren")}
          </StyledButton>
          <StyledButton onClick={() => controller.onCloseModal()}>
            {translate("worldManagement.close", "Schließen")}
          </StyledButton>
        </div>
      </div>
    </StyledModal>
  );
}

/**
 * WorldRow - Single row displaying world information
 */
interface WorldRowProps {
  world: WorldInfo;
  onDelete: () => void;
  translate: any;
}

function WorldRow({ world, onDelete, translate }: WorldRowProps) {
  return (
    <div className="flex items-center justify-between rounded border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-bold text-gray-800">{world.worldName}</p>
          {world.source === "public" && (
            <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
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

      {/* Delete button - only for IndexedDB worlds */}
      {world.source === "indexeddb" && (
        <StyledButton
          onClick={onDelete}
          className="bg-red-500 text-white hover:bg-red-600"
        >
          {translate("worldManagement.delete", "Löschen")}
        </StyledButton>
      )}
    </div>
  );
}
