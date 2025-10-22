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
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import emptyCheckBox from "../../../../../Assets/icons/empty-box.svg";
import greenSwosh from "../../../../../Assets/icons/check-solution.svg";

export default function SettingContent({ className }: AdLerUIComponent) {
  const [viewModel, controller] = useBuilder<
    SettingContentViewModel,
    SettingContentController
  >(BUILDER_TYPES.ISettingContentBuilder);
  const { t: translate } = useTranslation("settingsMenu");
  // const [highGraphicsQualityEnabled] = useObservable(
  //   viewModel.highGraphicsQualityEnabled,
  // );
  const [breakTimeNotificationsEnabled] = useObservable(
    viewModel.breakTimeNotificationsEnabled,
  );
  const [language] = useObservable(viewModel.language);

  if (!viewModel || !controller) return null;

  return (
    <div
      className={`flex h-full w-full flex-col items-center overflow-hidden px-4 pt-4 text-adlerdarkblue ${className}`}
    >
      {/* language */}
      <div className={"border-b border-gray-500 pb-2 mobile-landscape:ml-6"}>
        <h1 className={tailwindMerge("text-lg font-bold xl:text-2xl")}>
          {translate("language")}
        </h1>
      </div>
      <div className="flex h-32 flex-row items-center justify-center gap-4">
        <StyledButton
          className="!px-2 !py-1 text-xs mobile-landscape:bottom-2 mobile-landscape:left-2"
          color={language === "de" ? "pressed" : "default"}
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
          color={language === "en" ? "pressed" : "default"}
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

      {/* volume */}
      <div className={"border-b border-gray-500 pb-2 mobile-landscape:ml-6"}>
        <h1 className={tailwindMerge("text-lg font-bold xl:text-2xl")}>
          {translate("volume")}
        </h1>
      </div>
      <div>
        <RangeSlider
          min={0}
          max={1}
          initialValue={viewModel.volume.Value}
          step={0.01}
          callback={(value) => {
            controller.onVolumeChange(value);
          }}
          displayFactor={100}
        />
        <div className="flex flex-row items-center justify-center pb-8">
          <StyledButton
            className="pb-8 text-xs mobile-landscape:bottom-2 mobile-landscape:left-2"
            onClick={() => {
              controller.onTestSoundButtonClicked();
            }}
            data-testid="testSoundButton"
            title={translate("testSoundButton").toString()}
            shape="freeFloatLeft"
          >
            {translate("testSoundButton")}
          </StyledButton>
        </div>
      </div>

      {/* Graphics */}
      <div className={"border-b border-gray-500 pb-2 mobile-landscape:ml-6"}>
        <h1 className={tailwindMerge("text-lg font-bold xl:text-2xl")}>
          {translate("quality")}
        </h1>
      </div>
      <div>
        <RangeSlider
          min={viewModel.minimumGraphicsQuality}
          max={viewModel.maximumGraphicsQuality}
          step={0.5}
          initialValue={
            viewModel.minMaxGraphicsQuality - viewModel.graphicsQuality.Value
          }
          enableInputField={false}
          callback={(value) => {
            controller.onGraphicsQualityChange(
              viewModel.minMaxGraphicsQuality - value,
            );
          }}
          display={(value) => {
            switch (value) {
              case 2:
                return translate("resolution_best");
              case 1.5:
                return translate("resolution_acceptable");
              case 1:
                return translate("resolution_restricted");
              default:
                return translate("resolution_restricted");
            }
          }}
        />
      </div>

      {/* Graphics compability mode */}
      {/* <div className="relative flex-row py-4 w:-full">
        <img
          className="absolute w-6 lg:w-8 portrait:mx-0.5 portrait:w-4"
          alt="Empty Graphics Quality Checkbox"
          data-testid="emptyBoxGraphicsQuality"
          src={emptyCheckBox}
          onClick={() => {
            controller.onGraphicsQualityButtonClicked();
          }}
        ></img>
        {highGraphicsQualityEnabled && (
          <img
            src={greenSwosh}
            alt="Graphics Quality Swosh"
            data-testid="checkMarkGraphicsQuality"
            className="absolute w-6 lg:w-8 portrait:mx-0.5 portrait:w-4"
            onClick={() => {
              controller.onGraphicsQualityButtonClicked();
            }}
          />
        )}
        <div className="py-1 pl-10">{translate("qualityLow")}</div>
      </div> */}

      {/* break notifications */}
      <div className={"border-b border-gray-500 pb-2 mobile-landscape:ml-6"}>
        <h1 className={tailwindMerge("text-lg font-bold xl:text-2xl")}>
          {translate("breakTimeNotifications")}
        </h1>
      </div>
      <div className="w:-full relative flex-row py-4">
        <img
          className="absolute w-6 bg-adleryellow lg:w-8 portrait:mx-0.5 portrait:w-4"
          alt="Empty Break Time Notifications Checkbox"
          data-testid="emptyBoxBreakTimeNotifications"
          src={emptyCheckBox}
          onClick={() => {
            controller.onBreakTimeNotificationsButtonClicked();
          }}
        ></img>
        {breakTimeNotificationsEnabled && (
          <img
            src={greenSwosh}
            alt="Break Time Notifications Swosh"
            data-testid="checkMarkBreakTimeNotifications"
            className="absolute w-6 lg:w-8 portrait:mx-0.5 portrait:w-4"
            onClick={() => {
              controller.onBreakTimeNotificationsButtonClicked();
            }}
          />
        )}
        <div className="py-1 pl-10">
          {translate("breakTimeNotificationsButton")}
        </div>
      </div>
    </div>
  );
}
