import { useTranslation } from "react-i18next";

export interface StorageInfoProps {
  usedFormatted: string;
  quotaFormatted: string;
  usedPercent: number;
}

/**
 * StorageInfo - Display component for browser storage usage
 * Shows used/total storage with a progress bar
 */
export default function StorageInfo({
  usedFormatted,
  quotaFormatted,
  usedPercent,
}: StorageInfoProps) {
  const { t: translate } = useTranslation("worldMenu");

  return (
    <div className="pt-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold">
          {translate("worldManagement.storage", "Speicher")}
        </span>
        <span className="text-sm text-gray-600">
          {usedFormatted} / {quotaFormatted}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full bg-adlerblue transition-all duration-300"
          style={{ width: `${usedPercent}%` }}
        />
      </div>
      <p className="mt-1 text-xs text-gray-500">
        {usedPercent}% {translate("worldManagement.used", "belegt")}
      </p>
    </div>
  );
}
