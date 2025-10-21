import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../Utils/TailwindMerge";
import { useTranslation } from "react-i18next";

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

  return (
    <div
      className={`flex h-full w-full flex-col items-start overflow-y-auto px-8 pt-4 text-adlerdarkblue ${className}`}
    >
      <div className={"mb-4 border-b border-gray-500 pb-2"}>
        <h1 className={tailwindMerge("text-2xl font-bold xl:text-3xl")}>
          {translate("pageTitle")}
        </h1>
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
