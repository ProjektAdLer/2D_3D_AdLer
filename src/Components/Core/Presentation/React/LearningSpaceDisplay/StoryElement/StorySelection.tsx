import { useTranslation } from "react-i18next";
import IStoryElementController from "./IStoryElementController";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

export default function StorySelection({
  controller,
}: {
  controller: IStoryElementController;
}) {
  const { t: translate } = useTranslation("learningSpace");

  return (
    <div className="flex flex-col items-center justify-center w-full row-span-4 gap-4 pb-16 lg:flex-row lg:pb-8">
      <StyledButton
        shape="freefloatcenter"
        onClick={() => controller.onIntroButtonClicked()}
        className="!text-xl w-32"
        data-testid="intro"
      >
        {translate("introStoryTitle")}
      </StyledButton>

      <StyledButton
        shape="freefloatcenter"
        onClick={() => controller.onOutroButtonClicked()}
        className="!text-xl w-32"
        data-testid="outro"
      >
        {translate("outroStoryTitle")}
      </StyledButton>
    </div>
  );
}
