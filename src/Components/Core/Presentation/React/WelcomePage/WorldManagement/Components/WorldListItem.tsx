import { useTranslation } from "react-i18next";
import StyledButton from "../../../ReactRelated/ReactBaseComponents/StyledButton";
import exportIcon from "../../../../../../../Assets/icons/log-export.svg";
import deleteIcon from "../../../../../../../Assets/icons/close.svg";
import type { WorldInfo } from "../WorldManagerModalViewModel";

export interface WorldListItemProps {
  world: WorldInfo;
  onDelete: () => void;
  onExport: () => void;
}

/**
 * WorldListItem - Single row displaying world information with action buttons
 * Shows world name, element count, size, and export/delete actions for user-imported worlds
 */
export default function WorldListItem({
  world,
  onDelete,
  onExport,
}: WorldListItemProps) {
  const { t: translate } = useTranslation("worldMenu");

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

      {/* Action buttons - only for user-imported worlds */}
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
