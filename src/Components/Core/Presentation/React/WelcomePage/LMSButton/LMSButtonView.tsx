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
      containerClassName=" w-full h-full"
      onClick={controller.openLMSPage}
      className={`relative gap-2 flex m-2` + tailwindMerge(className)}
      title={translate("lmsButtonToolTip").toString()}
    >
      <img
        className="mobile-portrait:w-8 w-[35px] lg:w-[50px]"
        src={moodleIcon}
        alt="icon"
      />
      <p className="font-bold mobile-portrait:text-2xs">
        {translate("moodleButton")}
      </p>
    </StyledButton>
  );
}
