import { useTranslation } from "react-i18next";

export interface DeleteProgressProps {
  status: string | null;
}

/**
 * DeleteProgress - Indeterminate progress indicator for world deletion
 * Shows an animated progress bar with status text
 */
export default function DeleteProgress({ status }: DeleteProgressProps) {
  const { t: translate } = useTranslation("worldMenu");

  const statusText =
    status === "deleting"
      ? translate("worldManagement.deleting", "Löscht Lernwelt...")
      : status === "delete_complete"
        ? translate("worldManagement.deleteComplete", "Lernwelt gelöscht")
        : translate("worldManagement.deleting", "Löscht...");

  return (
    <div className="rounded-lg bg-orange-50 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-orange-700">
          {statusText}
        </span>
        {status === "delete_complete" && (
          <span className="text-sm text-green-600">✓</span>
        )}
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        {status === "delete_complete" ? (
          <div className="h-full w-full bg-green-500 transition-all duration-300" />
        ) : (
          <div className="h-full w-1/3 animate-indeterminate rounded-full bg-orange-500" />
        )}
      </div>
    </div>
  );
}
