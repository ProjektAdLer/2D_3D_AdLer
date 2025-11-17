import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import { useTranslation } from "react-i18next";
import emptyCheckBox from "../../../../../Assets/icons/empty-box.svg";
import greenSwosh from "../../../../../Assets/icons/check-solution.svg";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import PrivacyContentViewModel from "./PrivacyContentViewModel";
import IPrivacyContentController from "./IPrivacyContentController";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";

interface Subsection {
  title: string;
  content?: string;
}

interface Section {
  title: string;
  subsections: Subsection[];
}

export default function PrivacyContent({ className }: AdLerUIComponent) {
  const { t: translate } = useTranslation("privacy");
  const sections: Section[] = translate("sections", { returnObjects: true });

  const [viewModel, controller] = useBuilder<
    PrivacyContentViewModel,
    IPrivacyContentController
  >(BUILDER_TYPES.IPrivacyContentBuilder);

  const [cookiesAccepted] = useObservable<boolean>(viewModel?.cookiesAccepted);

  if (!viewModel || !controller) return null;

  const handleCookieToggle = () => {
    controller.setCookieConsent(!cookiesAccepted);
  };

  return (
    <div
      className={`flex h-full w-full max-w-4xl flex-col items-start px-8 pt-4 text-adlerdarkblue ${className}`}
    >
      {/* Cookie Settings at the top */}
      <div className="bg-adlerblue-100 mb-6 w-full rounded-lg border-2 border-adlerdarkblue p-4">
        <h2 className="mb-3 text-xl font-bold">
          {translate("cookieSettings")}
        </h2>
        <div className="relative flex flex-row items-center py-2">
          <img
            className="w-6 cursor-pointer bg-adleryellow lg:w-8"
            alt="Empty Cookies Checkbox"
            data-testid="emptyBoxCookies"
            src={emptyCheckBox}
            onClick={handleCookieToggle}
          />
          {cookiesAccepted && (
            <img
              src={greenSwosh}
              alt="Cookies Accepted"
              data-testid="checkMarkCookies"
              className="absolute w-6 cursor-pointer lg:w-8"
              onClick={handleCookieToggle}
            />
          )}
          <div className="ml-10 cursor-pointer" onClick={handleCookieToggle}>
            {translate("cookieSettingsButton")}
          </div>
        </div>
      </div>

      <div className="w-full space-y-6 pb-8">
        {sections &&
          Array.isArray(sections) &&
          sections.map((section: Section, index: number) => (
            <div key={index} className="space-y-4">
              <h2 className="border-b border-gray-300 pb-2 text-xl font-bold">
                {section.title}
              </h2>
              {section.subsections &&
                Array.isArray(section.subsections) &&
                section.subsections.map(
                  (subsection: Subsection, subIndex: number) => (
                    <div key={subIndex} className="space-y-2">
                      {subsection.content ? (
                        <>
                          <h3 className="text-lg font-semibold">
                            {subsection.title}
                          </h3>
                          <p className="whitespace-pre-wrap text-base leading-relaxed text-gray-700">
                            {subsection.content}
                          </p>
                        </>
                      ) : (
                        <h3 className="text-lg font-semibold">
                          {subsection.title}
                        </h3>
                      )}
                    </div>
                  ),
                )}
            </div>
          ))}
      </div>
    </div>
  );
}
