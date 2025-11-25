import { useTranslation } from "react-i18next";
import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import worldIcon from "../../../../../../Assets/icons/world.svg";
import type IWorldManagerModalController from "./IWorldManagerModalController";

export interface WorldManagementButtonProps {
  controller: IWorldManagerModalController;
}

/**
 * WorldManagementButton - Button to open the world management modal
 * Displays a world icon with label and opens the management interface on click
 */
export default function WorldManagementButton({
  controller,
}: WorldManagementButtonProps) {
  const { t: translate } = useTranslation("start");

  return (
    <StyledButton
      shape="freeFloatCenter"
      containerClassName=""
      onClick={() => controller.onOpenModal()}
      className="my-2 flex"
      title="Weltenverwaltung"
      data-testid="worldManagerButton"
    >
      <img
        className="w-8 lg:w-12 onek:w-14"
        src={worldIcon}
        alt="World Management Icon"
      />
      <p className="text-2xs font-bold xl:text-sm 2xl:pl-2 2xl:text-lg">
        {translate("worldManagerButton")}
      </p>
    </StyledButton>
  );
}
