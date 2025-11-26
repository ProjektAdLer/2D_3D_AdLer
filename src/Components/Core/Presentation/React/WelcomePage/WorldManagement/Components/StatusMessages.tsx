import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ImportErrorDetails } from "../WorldManagerModalViewModel";
import tailwindMerge from "../../../../Utils/TailwindMerge";

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
    <div className="rounded-lg bg-green-100 p-4">
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

interface ImportErrorMessageProps {
  error: ImportErrorDetails;
}

/**
 * ImportErrorMessage - Error notification for failed import with optional technical details
 */
export function ImportErrorMessage({ error }: ImportErrorMessageProps) {
  const { t: translate } = useTranslation("worldMenu");
  const [showDetails, setShowDetails] = useState(error.showDetails);

  return (
    <div
      className={tailwindMerge(
        "rounded-lg border-2 border-red-500 bg-red-50 p-4",
        "dark:border-red-700 dark:bg-red-900/20",
      )}
    >
      {/* Error header with message */}
      <div className="mb-2 flex items-start">
        {/* Warning icon */}
        <span
          className="mr-3 flex-shrink-0 text-2xl"
          role="img"
          aria-label="warning"
        >
          ⚠️
        </span>

        {/* Error message */}
        <div className="flex-1">
          <p className="font-semibold text-red-800 dark:text-red-200">
            {translate("worldManagement.importFailed", "Import fehlgeschlagen")}
          </p>
          <p className="mt-1 text-sm text-red-700 dark:text-red-300">
            {error.message}
          </p>
        </div>
      </div>

      {/* Technical details toggle (only if technical details exist) */}
      {error.technicalDetails && (
        <div className="mt-3">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className={tailwindMerge(
              "text-sm text-red-700 hover:text-red-900 dark:text-red-300 dark:hover:text-red-100",
              "flex items-center underline transition-colors",
            )}
            type="button"
          >
            <span className="mr-1">{showDetails ? "▼" : "▶"}</span>
            <span>
              {showDetails
                ? translate(
                    "worldManagement.hideTechnicalDetails",
                    "Technische Details ausblenden",
                  )
                : translate(
                    "worldManagement.showTechnicalDetails",
                    "Technische Details anzeigen",
                  )}
            </span>
          </button>

          {/* Technical details (collapsed/expanded) */}
          {showDetails && (
            <pre
              className={tailwindMerge(
                "mt-2 rounded bg-red-100 p-3 dark:bg-red-900/40",
                "overflow-x-auto text-xs text-red-900 dark:text-red-100",
                "border border-red-300 dark:border-red-700",
                "whitespace-pre-wrap break-words",
              )}
            >
              {error.technicalDetails}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * DeleteErrorMessage - Error notification for failed deletion
 */
export function DeleteErrorMessage({ error }: ErrorMessageProps) {
  const { t: translate } = useTranslation("worldMenu");

  return (
    <div className="rounded-lg bg-red-100 p-4">
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
    <div className="rounded-lg bg-red-100 p-4">
      <p className="font-semibold text-red-800">
        ✗{" "}
        {translate("worldManagement.exportFailed", {
          error: error,
        })}
      </p>
    </div>
  );
}
