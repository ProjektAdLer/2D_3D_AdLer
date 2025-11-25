import { useTranslation } from "react-i18next";
import StyledButton from "../../../ReactRelated/ReactBaseComponents/StyledButton";

export interface DeleteConfirmationProps {
  worldName: string;
  sizeFormatted: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * DeleteConfirmation - Confirmation dialog for world deletion
 * Shows world name and size, with confirm and cancel buttons
 */
export default function DeleteConfirmation({
  worldName,
  sizeFormatted,
  onConfirm,
  onCancel,
}: DeleteConfirmationProps) {
  const { t: translate } = useTranslation("worldMenu");

  return (
    <div className="rounded border-2 border-red-300 bg-red-50 p-4">
      <p className="mb-3 font-semibold text-red-800">
        {translate("worldManagement.deleteConfirmTitle", "Lernwelt löschen?")}
      </p>
      <p className="mb-4 text-sm text-red-700">
        {translate("worldManagement.deleteConfirmMessage", {
          worldName: worldName,
          size: sizeFormatted,
        })}
      </p>
      <div className="flex gap-2">
        <StyledButton
          onClick={onConfirm}
          className="bg-red-500 text-white hover:bg-red-600"
          shape="freeFloatCenter"
        >
          {translate("worldManagement.confirmDelete", "Ja, löschen")}
        </StyledButton>
        <StyledButton
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 hover:bg-gray-400"
          shape="freeFloatCenter"
        >
          {translate("worldManagement.cancelDelete", "Abbrechen")}
        </StyledButton>
      </div>
    </div>
  );
}
