import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import worldIcon from "../../../../../../Assets/icons/world.svg";
import type IWorldManagerModalController from "./IWorldManagerModalController";

export interface WorldManagementButtonProps {
  controller: IWorldManagerModalController;
}

/**
 * WorldManagementButton - Icon button to open the world management modal
 * Displays a world icon and opens the management interface on click
 */
export default function WorldManagementButton({
  controller,
}: WorldManagementButtonProps) {
  return (
    <StyledButton
      shape="smallSquare"
      onClick={() => controller.onOpenModal()}
      className="bg-adlerlightblue hover:bg-adlerblue"
      title="Weltenverwaltung"
    >
      <img
        className="w-10 xl:w-12 mobile-landscape:w-6"
        src={worldIcon}
        alt="World Management Icon"
      />
    </StyledButton>
  );
}
