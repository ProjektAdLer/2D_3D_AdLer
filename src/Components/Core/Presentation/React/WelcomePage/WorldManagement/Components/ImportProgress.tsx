import { useTranslation } from "react-i18next";

export interface ImportProgressProps {
  progress: number;
  status: string | null;
}

/**
 * ImportProgress - Progress indicator for MBZ file import
 * Shows a progress bar with percentage and status text
 */
export default function ImportProgress({
  progress,
  status,
}: ImportProgressProps) {
  const { t: translate } = useTranslation("worldMenu");

  return (
    <div className="rounded-lg bg-blue-50 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-adlerblue">
          {status === "import_starting"
            ? translate("worldManagement.importStarting", "Starte Import...")
            : status || translate("worldManagement.importing", "Importiere...")}
        </span>
        <span className="text-sm text-gray-600">{progress}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full bg-adlerblue transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
