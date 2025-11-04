import { useState } from "react";
import { useTranslation } from "react-i18next";
import CookieModalController from "../../../WelcomePage/CookieModal/CookieModalController";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

export default function ExternalContentConsentBlocker({
  onConsent,
}: {
  onConsent: () => void;
}) {
  const { t: translate } = useTranslation("learningElement");
  const [showDetails, setShowDetails] = useState(false);

  const handleAccept = () => {
    const controller = new CookieModalController();
    controller.accept();
    onConsent();
  };

  return (
    <div
      className="flex min-h-[400px] flex-col items-center justify-center gap-6 p-8 text-center"
      data-testid="external-content-consent-blocker"
    >
      <div className="max-w-2xl space-y-4">
        <h2 className="text-2xl font-bold text-adlerdarkblue">
          {translate("externalContentConsentRequired")}
        </h2>

        <p className="text-lg text-gray-700">
          {translate("externalContentConsentDescription")}
        </p>

        {showDetails && (
          <div className="mt-4 rounded-lg border border-gray-300 bg-gray-50 p-4 text-left text-sm text-gray-600">
            <p className="mb-2 font-semibold">
              {translate("externalContentConsentDetailsTitle")}
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>{translate("externalContentConsentDetail1")}</li>
              <li>{translate("externalContentConsentDetail2")}</li>
            </ul>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3">
          <StyledButton
            shape="freeFloatCenter"
            onClick={handleAccept}
            data-testid="external-content-consent-accept"
            className="!px-6 !py-3 text-base font-semibold"
          >
            {translate("externalContentConsentAccept")}
          </StyledButton>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-adlerdarkblue underline hover:no-underline"
            data-testid="external-content-consent-details-toggle"
          >
            {showDetails
              ? translate("externalContentConsentHideDetails")
              : translate("externalContentConsentShowDetails")}
          </button>
        </div>
      </div>
    </div>
  );
}
