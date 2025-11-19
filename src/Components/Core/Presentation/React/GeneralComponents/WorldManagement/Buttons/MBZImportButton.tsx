import React from "react";
import StyledButton from "../../../ReactRelated/ReactBaseComponents/StyledButton";
import plusIcon from "../../../../../../../Assets/icons/plus.svg";

export default function MBZImportButton() {
  // Check if running in Electron
  const isElectron = typeof window !== "undefined" && window.electronAPI;

  // Don't render if not in Electron
  if (!isElectron) return null;

  const handleImportClick = async () => {
    if (isElectron) {
      await window.electronAPI!.openMBZFileDialog();
    }
  };

  return (
    <StyledButton
      onClick={handleImportClick}
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
  );
}
