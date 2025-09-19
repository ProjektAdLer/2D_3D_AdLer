import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import SettingContentViewModel from "./SettingContentViewModel";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import SettingContentController from "./SettingContentController";
import RangeSlider from "~ReactComponents/ReactRelated/ReactBaseComponents/RangeSlider";
import tailwindMerge from "../../Utils/TailwindMerge";
import { useTranslation } from "react-i18next";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import germanIcon from "../../../../../Assets/graphics/german-flag.png";
import englishIcon from "../../../../../Assets/graphics/english-flag.png";

export default function SettingContent({ className }: AdLerUIComponent) {
  const [viewModel, controller] = useBuilder<
    SettingContentViewModel,
    SettingContentController
  >(BUILDER_TYPES.ISettingContentBuilder);
  const { t: translate } = useTranslation("settingsMenu");
  return (
    <div
      className={`flex h-full w-full flex-col items-center overflow-hidden px-4 pt-4 ${className}`}
    >
      <div className={"border-b border-gray-500 pb-2 mobile-landscape:ml-6"}>
        <h1 className={tailwindMerge("text-lg font-bold xl:text-2xl")}>
          {translate("language")}
        </h1>
      </div>
      <div className="flex h-32 flex-row items-center justify-center gap-4">
        <StyledButton
          className="!px-2 !py-1 text-xs mobile-landscape:bottom-2 mobile-landscape:left-2"
          onClick={() => {
            controller.onGermanButtonClicked();
          }}
          icon={germanIcon}
          data-testid="germanButton"
          title={translate("languageButtonGerman").toString()}
          shape="freeFloatLeft"
        >
          {translate("languageButtonGerman")}
        </StyledButton>
        <StyledButton
          className="!px-2 !py-1 text-xs mobile-landscape:bottom-2 mobile-landscape:left-2"
          onClick={() => {
            controller.onEnglishButtonClicked();
          }}
          icon={englishIcon}
          data-testid="englishButton"
          title={translate("languageButtonEnglish").toString()}
          shape="freeFloatLeft"
        >
          {translate("languageButtonEnglish")}
        </StyledButton>
      </div>
      <div className={"border-b border-gray-500 pb-2 mobile-landscape:ml-6"}>
        <h1 className={tailwindMerge("text-lg font-bold xl:text-2xl")}>
          {translate("volume")}
        </h1>
      </div>
      <div className="h-32">
        <RangeSlider
          min={0}
          max={1}
          step={0.01}
          callback={(value) => {
            controller.onVolumeChange(value);
          }}
          displayFactor={100}
        />
      </div>

      <div className={"border-b border-gray-500 pb-2 mobile-landscape:ml-6"}>
        <h1 className={tailwindMerge("text-lg font-bold xl:text-2xl")}>
          {translate("quality")}
        </h1>
      </div>
      <div className="h-32">
        <label>
          <input type="radio" name="myRadio" value="option1" />
          {translate("qualityLow")}
        </label>
      </div>
    </div>
  );
}
