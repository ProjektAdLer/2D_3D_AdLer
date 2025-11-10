import { useState } from "react";
import { useTranslation } from "react-i18next";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import ILearningElementModalController from "../ILearningElementModalController";
import SettingsTO from "src/Components/Core/Application/DataTransferObjects/SettingsTO";

export default function CookieConsentBlocker({
  onConsent,
  controller,
}: {
  onConsent: () => void;
  controller: ILearningElementModalController;
}) {
  const { t: translate } = useTranslation("learningElement");
  const [showDetails, setShowDetails] = useState(false);

  const handleAccept = () => {
    const settings = new SettingsTO();
    settings.cookieConsent = "accepted";
    controller.setUserSettings(settings);
    onConsent();
  };

  return (
    <div
      className="flex h-full w-full items-center justify-center p-4 md:p-8"
      data-testid="cookie-consent-blocker"
    >
      <div className="max-w-2xl space-y-3 md:space-y-4">
        <h2 className="text-lg font-bold text-adlerdarkblue md:text-xl lg:text-2xl mobile-landscape:text-base mobile-portrait:text-base">
          {translate("externalContentConsentRequired")}
        </h2>

        <p className="text-sm text-gray-700 md:text-base lg:text-lg mobile-landscape:text-xs mobile-portrait:text-xs">
          {translate("externalContentConsentDescription")}
        </p>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-adlerdarkblue underline hover:no-underline md:text-sm mobile-landscape:text-xs mobile-portrait:text-xs"
          data-testid="external-content-consent-details-toggle"
        >
          {showDetails
            ? translate("externalContentConsentHideDetails")
            : translate("externalContentConsentShowDetails")}
        </button>

        {showDetails && (
          <div className="mt-3 rounded-lg border border-gray-300 bg-gray-50 p-3 text-xs text-gray-600 md:mt-4 md:p-4 md:text-sm mobile-landscape:text-xs mobile-portrait:text-xs">
            <p className="mb-2 font-semibold">
              {translate("externalContentConsentDetailsTitle")}
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>{translate("externalContentConsentDetail1")}</li>
              <li>{translate("externalContentConsentDetail2")}</li>
            </ul>
          </div>
        )}

        <div className="mt-4 md:mt-6">
          <StyledButton
            shape="freeFloatCenter"
            onClick={handleAccept}
            data-testid="external-content-consent-accept"
            className="!px-4 !py-2 text-sm font-semibold md:!px-6 md:!py-3 md:text-base mobile-landscape:!px-3 mobile-landscape:!py-1.5 mobile-landscape:text-xs mobile-portrait:!px-3 mobile-portrait:!py-1.5 mobile-portrait:text-xs"
          >
            {translate("externalContentConsentAccept")}
          </StyledButton>
        </div>
      </div>
    </div>
  );
}
