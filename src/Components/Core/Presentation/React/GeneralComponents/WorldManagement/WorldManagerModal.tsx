import React, { useEffect } from "react";
import StyledModal from "../../ReactRelated/ReactBaseComponents/StyledModal";
import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import useBuilder from "../../ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import WorldManagerModalViewModel from "./WorldManagerModalViewModel";
import IWorldManagerModalController from "./IWorldManagerModalController";
import type { WorldInfo } from "../../../../../../electron";
import plusIcon from "../../../../../../Assets/icons/plus.svg";

export default function WorldManagerModal() {
  // Check if running in Electron
  const isElectron = typeof window !== "undefined" && window.electronAPI;

  // Always call hooks at the top level
  const [viewModel, controller] = useBuilder<
    WorldManagerModalViewModel,
    IWorldManagerModalController
  >(BUILDER_TYPES.IWorldManagerModalBuilder);

  const showModalObservable = useObservable(viewModel?.showModal);
  const worldsObservable = useObservable<WorldInfo[]>(viewModel?.worlds);
  const loadingObservable = useObservable(viewModel?.loading);
  const importProgressObservable = useObservable(viewModel?.importProgress);
  const importingFileObservable = useObservable(viewModel?.importingFile);

  // Extract values with defaults
  const showModal = showModalObservable?.[0] ?? false;
  const worlds = worldsObservable?.[0] ?? [];
  const loading = loadingObservable?.[0] ?? false;
  const importProgress = importProgressObservable?.[0] ?? null;
  const importingFile = importingFileObservable?.[0] ?? null;

  // Setup Electron event listeners once when component mounts
  useEffect(() => {
    console.log(
      "WorldManagerModal: useEffect - isElectron:",
      isElectron,
      "controller:",
      controller,
    );
    if (!isElectron || !controller) return;

    const presenter = (controller as any).presenter;
    console.log("WorldManagerModal: presenter:", presenter);
    if (presenter && presenter.setupElectronListeners) {
      console.log("WorldManagerModal: Setting up Electron listeners");
      presenter.setupElectronListeners();
    }

    return () => {
      console.log("WorldManagerModal: Cleanup");
      if (presenter && presenter.cleanupElectronListeners) {
        presenter.cleanupElectronListeners();
      }
    };
  }, [controller, isElectron]);

  // Load worlds when modal opens
  useEffect(() => {
    console.log(
      "WorldManagerModal: Load worlds useEffect - showModal:",
      showModal,
    );
    if (controller && showModal && isElectron) {
      (controller as any).presenter?.loadWorlds();
    }
  }, [showModal, controller, isElectron]);

  // Don't render anything if not in Electron or if builder hasn't loaded
  console.log(
    "WorldManagerModal: Render check - isElectron:",
    isElectron,
    "viewModel:",
    viewModel,
    "controller:",
    controller,
    "showModal:",
    showModal,
  );
  if (!isElectron || !viewModel || !controller) return null;

  return (
    <>
      {/* Import Progress Toast */}
      {importProgress && (
        <div className="fixed bottom-4 right-4 z-[10010] min-w-[300px] rounded-lg border-2 border-adlerdarkblue bg-white p-4 shadow-lg">
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
      <StyledModal
        showModal={showModal}
        title="Lernwelten verwalten"
        onClose={() => controller.onCloseModal()}
        canClose={!loading}
        className="z-[10000]"
      >
        <div className="w-full max-w-6xl">
          {/* Import Button */}
          <div className="mb-4 flex justify-start">
            <StyledButton
              onClick={() => controller.onOpenFileDialog()}
              shape="smallSquare"
              title="MBZ Datei importieren"
              data-testid="mbz-import-button"
            >
              <img
                className="w-10 xl:w-12 mobile-landscape:w-6"
                src={plusIcon}
                alt="Import Icon"
              />
            </StyledButton>
          </div>

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
                Verwenden Sie den "MBZ importieren..."-Button oben oder "Datei →
                MBZ importieren..." um Lernwelten hinzuzufügen.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {worlds.map((world: WorldInfo) => (
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
                      onClick={() => controller.onDeleteWorld(world.worldName)}
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
    </>
  );
}
