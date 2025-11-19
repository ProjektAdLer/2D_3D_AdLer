import React from "react";
import StyledButton from "../../../ReactRelated/ReactBaseComponents/StyledButton";
import worldIcon from "../../../../../../../Assets/icons/world.svg";

export default function WorldManagementButton() {
  // Check if running in Electron
  const isElectron = typeof window !== "undefined" && window.electronAPI;

  // Don't render if not in Electron
  if (!isElectron) return null;

  const handleManagementClick = () => {
    if (isElectron) {
      console.log("WorldManagementButton: Sending open-world-manager event...");
      window.electronAPI!.openWorldManager();
    }
  };

  return (
    <StyledButton
      onClick={handleManagementClick}
      shape="smallSquare"
      title="Lernwelten verwalten"
      data-testid="world-management-button"
    >
      <img
        className="w-10 xl:w-12 mobile-landscape:w-6"
        src={worldIcon}
        alt="World Icon"
      />
    </StyledButton>
  );
}
