import { useTranslation } from "react-i18next";

export interface ImportSuccessInfo {
  worldName: string;
  elementCount: number;
}

export interface ImportSuccessMessageProps {
  success: ImportSuccessInfo;
}

/**
 * ImportSuccessMessage - Success notification after successful world import
 */
export function ImportSuccessMessage({ success }: ImportSuccessMessageProps) {
  const { t: translate } = useTranslation("worldMenu");

  return (
    <div className="rounded bg-green-100 p-4">
      <p className="font-semibold text-green-800">
        ✓{" "}
        {translate("worldManagement.importSuccess", {
          worldName: success.worldName,
        })}
      </p>
      <p className="text-sm text-green-700">
        {success.elementCount}{" "}
        {translate("worldManagement.elements", "Elemente")}
      </p>
    </div>
  );
}

export interface ErrorMessageProps {
  error: string;
}

/**
 * ImportErrorMessage - Error notification for failed import
 */
export function ImportErrorMessage({ error }: ErrorMessageProps) {
  const { t: translate } = useTranslation("worldMenu");

  return (
    <div className="rounded bg-red-100 p-4">
      <p className="font-semibold text-red-800">
        ✗ {translate("worldManagement.importFailed", "Import fehlgeschlagen")}
      </p>
      <p className="text-sm text-red-700">{error}</p>
    </div>
  );
}

/**
 * DeleteErrorMessage - Error notification for failed deletion
 */
export function DeleteErrorMessage({ error }: ErrorMessageProps) {
  const { t: translate } = useTranslation("worldMenu");

  return (
    <div className="rounded bg-red-100 p-4">
      <p className="font-semibold text-red-800">
        ✗{" "}
        {error === "preinstalled_cannot_delete"
          ? translate(
              "worldManagement.cannotDeletePreinstalled",
              "Vorinstallierte Lernwelten können nicht gelöscht werden.",
            )
          : translate("worldManagement.deleteFailed", {
              error: error,
            })}
      </p>
    </div>
  );
}

/**
 * ExportErrorMessage - Error notification for failed export
 */
export function ExportErrorMessage({ error }: ErrorMessageProps) {
  const { t: translate } = useTranslation("worldMenu");

  return (
    <div className="rounded bg-red-100 p-4">
      <p className="font-semibold text-red-800">
        ✗{" "}
        {translate("worldManagement.exportFailed", {
          error: error,
        })}
      </p>
    </div>
  );
}
