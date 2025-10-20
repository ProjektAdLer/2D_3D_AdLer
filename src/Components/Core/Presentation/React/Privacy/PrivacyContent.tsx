import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../Utils/TailwindMerge";
import { useTranslation } from "react-i18next";

export default function PrivacyContent({ className }: AdLerUIComponent) {
  const { t: translate } = useTranslation("privacy");

  return (
    <div
      className={`flex h-full w-full flex-col items-start overflow-y-auto px-8 pt-4 text-adlerdarkblue ${className}`}
    >
      <div className={"mb-4 border-b border-gray-500 pb-2"}>
        <h1 className={tailwindMerge("text-2xl font-bold xl:text-3xl")}>
          {translate("pageTitle")}
        </h1>
      </div>

      <div className="space-y-4 pb-8">
        <p className="text-base leading-relaxed">
          {translate("contentPlaceholder")}
        </p>
      </div>
    </div>
  );
}
