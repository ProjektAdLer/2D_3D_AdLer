import { useTranslation } from "react-i18next";

export interface ExportProgressProps {
  progress: number;
  status: string | null;
}

/**
 * ExportProgress - Progress indicator for MBZ file export
 * Shows a progress bar with percentage and status text
 */
export default function ExportProgress({
  progress,
  status,
}: ExportProgressProps) {
  const { t: translate } = useTranslation("worldMenu");

  return (
    <div className="rounded bg-green-50 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-green-700">
          {status === "export_starting"
            ? translate("worldManagement.exportStarting", "Starte Export...")
            : status || translate("worldManagement.exporting", "Exportiere...")}
        </span>
        <span className="text-sm text-gray-600">{progress}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full bg-green-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
