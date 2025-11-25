import { useTranslation } from "react-i18next";
import StyledButton from "../../../ReactRelated/ReactBaseComponents/StyledButton";
import deleteIcon from "../../../../../../../Assets/icons/close.svg";
import type { WorldInfo } from "../WorldManagerModalViewModel";

export interface WorldListItemProps {
  world: WorldInfo;
  onDelete: () => void;
  /** Whether publish mode is active (shows checkbox) */
  isPublishMode?: boolean;
  /** Whether this world is selected (for publish mode) */
  isSelected?: boolean;
  /** Callback when checkbox is toggled (for publish mode) */
  onToggleSelect?: () => void;
}

/**
 * Formats a timestamp to a localized date string
 */
function formatDate(timestamp: number | undefined): string | null {
  if (!timestamp) return null;
  const date = new Date(timestamp);
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * WorldListItem - Single row displaying world information with action buttons
 * Shows world name, element count, size, and export/delete actions for user-imported worlds
 * In publish mode, shows a checkbox for selection
 */
export default function WorldListItem({
  world,
  onDelete,
  isPublishMode = false,
  isSelected = false,
  onToggleSelect,
}: WorldListItemProps) {
  const { t: translate } = useTranslation("worldMenu");

  const importDate = formatDate(world.importedAt);
  const updateDate = formatDate(world.updatedAt);
  const displayDate = updateDate || importDate;

  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md">
      {/* Checkbox for publish mode */}
      {isPublishMode && (
        <div className="mr-3 flex items-center">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            className="h-5 w-5 cursor-pointer rounded border-gray-300 text-adlerblue focus:ring-adlerblue"
          />
        </div>
      )}

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
          {/* Show import/update date for IndexedDB worlds */}
          {displayDate && world.source === "indexeddb" && (
            <>
              {" "}
              ·{" "}
              <span className="text-gray-500">
                {updateDate
                  ? translate("worldManagement.updated", "Aktualisiert")
                  : translate("worldManagement.imported", "Importiert")}
                : {displayDate}
              </span>
            </>
          )}
        </p>
      </div>

      {/* Action buttons - only for user-imported worlds and when not in publish mode */}
      {!isPublishMode && (
        <div className="flex shrink-0 gap-2">
          {world.source === "indexeddb" && (
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
          )}
        </div>
      )}
    </div>
  );
}
