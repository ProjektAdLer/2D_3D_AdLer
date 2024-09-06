import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import MoodleButtonViewModel from "./MoodleButtonViewModel";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { useTranslation } from "react-i18next";

export default function MoodleButton({ className }: AdLerUIComponent) {
  const [viewModel] = useBuilder<MoodleButtonViewModel, undefined>(
    BUILDER_TYPES.IMoodleButtonBuilder
  );
  const { t: translate } = useTranslation("start");

  console.log(viewModel);

  return (
    <StyledButton
      shape="freefloatcenternopadding"
      containerClassName=" w-full lg:w-1/2 h-full"
      onClick={() => {
        window.open(viewModel.moodleUrl, "_self");
      }}
      className={
        `relative !px-0 !py-0 flex flex-col items-center justify-end !w-full !h-full col-span-3 col-start-6 bg-cover !bg-learningworldbg` +
        tailwindMerge(className)
      }
    >
      <p className="absolute p-4 mx-auto text-2xl font-bold rounded-lg text-center bg-buttonbgblue lg:bottom-[42%] portrait:bottom-[20%] portrait:text-lg bottom-32 text-adlerdarkblue">
        {translate("moodleButton")}
      </p>
    </StyledButton>
  );
}
