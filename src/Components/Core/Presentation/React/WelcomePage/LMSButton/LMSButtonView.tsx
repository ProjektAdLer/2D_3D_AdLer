import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import LMSButtonViewModel from "./LMSButtonViewModel";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { useTranslation } from "react-i18next";
import LMSButtonController from "./LMSButtonController";

export default function LMSButton({ className }: AdLerUIComponent) {
  const [viewModel, controller] = useBuilder<
    LMSButtonViewModel,
    LMSButtonController
  >(BUILDER_TYPES.IMoodleButtonBuilder);
  const { t: translate } = useTranslation("start");

  console.log(viewModel);

  return (
    <StyledButton
      shape="freeFloatCenterNoPadding"
      containerClassName=" w-full lg:w-1/2 h-full"
      onClick={controller.openLMSPage}
      className={
        `relative !px-0 !py-0 flex flex-col items-center justify-end !w-full !h-full col-span-3 col-start-6 bg-cover !bg-learningworldbg` +
        tailwindMerge(className)
      }
    >
      {translate("moodleButton")}
    </StyledButton>
  );
}
