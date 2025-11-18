import React, { useEffect, useState } from "react";
import StyledModal from "../../ReactRelated/ReactBaseComponents/StyledModal";
import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import type { WorldInfo, ImportProgress } from "../../../../../../electron";

export default function WorldManagerModal() {
  const [showModal, setShowModal] = useState(false);
  const [worlds, setWorlds] = useState<WorldInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [importProgress, setImportProgress] = useState<ImportProgress | null>(
    null,
  );
  const [importingFile, setImportingFile] = useState<string | null>(null);

  // Check if running in Electron
  const isElectron = typeof window !== "undefined" && window.electronAPI;

  // Load worlds when modal opens
  useEffect(() => {
    if (showModal && isElectron) {
      loadWorlds();
    }
  }, [showModal]);

  // Setup Electron event listeners
  useEffect(() => {
    if (!isElectron) return;

    // Listen for "Open World Manager" menu command
    window.electronAPI!.onOpenWorldManager(() => {
      setShowModal(true);
    });

    // Listen for "Import MBZ" menu command
    window.electronAPI!.onImportMBZFile((filePath) => {
      handleImportMBZ(filePath);
    });

    // Listen for import progress
    window.electronAPI!.onImportProgress((progress) => {
      setImportProgress(progress);
    });

    return () => {
      window.electronAPI!.removeAllListeners("open-world-manager");
      window.electronAPI!.removeAllListeners("import-mbz-file");
      window.electronAPI!.removeAllListeners("import-progress");
    };
  }, []);

  const loadWorlds = async () => {
    if (!isElectron) return;

    setLoading(true);
    try {
      const worldsList = await window.electronAPI!.listWorlds();
      setWorlds(worldsList);
    } catch (error) {
      console.error("Failed to load worlds:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImportMBZ = async (filePath: string) => {
    if (!isElectron) return;

    setImportingFile(filePath);
    setImportProgress({ message: "Starte Import...", progress: 0 });

    try {
      const result = await window.electronAPI!.importMBZ(filePath);

      if (result.success) {
        setImportProgress({
          message: `Lernwelt "${result.worldName}" erfolgreich importiert!`,
          progress: 100,
        });

        // Reload worlds list
        await loadWorlds();

        // Trigger page reload to refresh available worlds in the app
        setTimeout(() => {
          window.location.reload();
        }, 2000);

        // Clear progress after showing success
        setTimeout(() => {
          setImportProgress(null);
          setImportingFile(null);
        }, 3000);
      } else {
        setImportProgress({
          message: `Fehler: ${result.error}`,
          progress: 0,
        });

        setTimeout(() => {
          setImportProgress(null);
          setImportingFile(null);
        }, 5000);
      }
    } catch (error) {
      console.error("Import failed:", error);
      setImportProgress({
        message: `Fehler beim Import: ${error}`,
        progress: 0,
      });

      setTimeout(() => {
        setImportProgress(null);
        setImportingFile(null);
      }, 5000);
    }
  };

  const handleDeleteWorld = async (worldName: string) => {
    if (!isElectron) return;

    const confirmed = window.confirm(
      `Möchten Sie die Lernwelt "${worldName}" wirklich löschen?`,
    );

    if (!confirmed) return;

    try {
      const result = await window.electronAPI!.deleteWorld(worldName);

      if (result.success) {
        // Reload worlds list
        await loadWorlds();
      } else {
        alert(`Fehler beim Löschen: ${result.error}`);
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert(`Fehler beim Löschen: ${error}`);
    }
  };

  // Don't render anything if not in Electron
  if (!isElectron) return null;

  return (
    <>
      {/* Import Progress Toast */}
      {importProgress && (
        <div className="fixed bottom-4 right-4 z-[100] min-w-[300px] rounded-lg border-2 border-adlerdarkblue bg-white p-4 shadow-lg">
          <div className="mb-2 font-bold text-adlerdarkblue">
            MBZ Import
            {importingFile && (
              <div className="text-xs font-normal text-gray-600">
                {importingFile.split("/").pop()}
              </div>
            )}
          </div>
          <div className="mb-2 text-sm">{importProgress.message}</div>
          <div className="h-2.5 w-full rounded-full bg-gray-200">
            <div
              className="h-2.5 rounded-full bg-adlerdarkblue transition-all duration-300"
              style={{ width: `${importProgress.progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* World Manager Modal */}
      <div className="z-[200]">
        <StyledModal
          showModal={showModal}
          title="Lernwelten verwalten"
          onClose={() => setShowModal(false)}
          canClose={!loading}
        >
          <div className="min-w-[600px] max-w-4xl">
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <div className="text-adlerdarkblue">Lade Lernwelten...</div>
              </div>
            ) : worlds.length === 0 ? (
              <div className="p-8 text-center">
                <p className="mb-4 text-adlerdarkblue">
                  Keine Lernwelten installiert.
                </p>
                <p className="text-sm text-gray-600">
                  Verwenden Sie "Datei → MBZ importieren..." um Lernwelten
                  hinzuzufügen.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {worlds.map((world) => (
                  <div
                    key={world.worldID}
                    className="border-adlerlightblue rounded-lg border-2 bg-white p-4 transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="mb-1 text-lg font-bold text-adlerdarkblue">
                          {world.worldName}
                        </h3>
                        {world.description && (
                          <p className="mb-2 text-sm text-gray-600">
                            {world.description}
                          </p>
                        )}
                        <div className="flex gap-4 text-xs text-gray-500">
                          <span>{world.elementCount} Elemente</span>
                          <span>{world.sizeFormatted}</span>
                        </div>
                      </div>
                      <StyledButton
                        shape="smallSquare"
                        onClick={() => handleDeleteWorld(world.worldName)}
                        className="rounded bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                      >
                        Löschen
                      </StyledButton>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 border-t border-gray-300 pt-4 text-center text-xs text-gray-500">
              Speicherort:{" "}
              <span className="font-mono">
                ~/Library/Application Support/AdLer Engine/LearningWorlds/
              </span>
            </div>
          </div>
        </StyledModal>
      </div>
    </>
  );
}
