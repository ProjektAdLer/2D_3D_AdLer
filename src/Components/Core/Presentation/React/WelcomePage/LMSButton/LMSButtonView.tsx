import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import LMSButtonViewModel from "./LMSButtonViewModel";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { useTranslation } from "react-i18next";
import LMSButtonController from "./LMSButtonController";
import moodleIcon from "../../../../../../Assets/icons/moodle.svg";

export default function LMSButton({ className }: AdLerUIComponent) {
  const [, controller] = useBuilder<LMSButtonViewModel, LMSButtonController>(
    BUILDER_TYPES.IMoodleButtonBuilder,
  );
  const { t: translate } = useTranslation("start");

  return (
    <StyledButton
      shape="freeFloatCenter"
      containerClassName="w-full h-full"
      onClick={controller.openLMSPage}
      className={`relative m-2 flex gap-2` + tailwindMerge(className)}
      title={translate("lmsButtonToolTip").toString()}
    >
      <img className="w-8 lg:w-12 onek:w-14" src={moodleIcon} alt="icon" />
      <p className="text-2xs font-bold xl:text-sm 2xl:pl-2 2xl:text-lg">
        {translate("moodleButton")}
      </p>
    </StyledButton>
  );
}
