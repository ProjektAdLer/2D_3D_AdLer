import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import NarrativeFrameworkViewModel from "./NarrativeFrameworkViewModel";
import INarrativeFrameworkController from "./INarrativeFrameworkController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import { ThemeType } from "src/Components/Core/Domain/Types/ThemeTypes";
import explainAdler from "src/Assets/narrativeFramework/g-narrativeframe-explainadler-angled.png";

// Import background images
import campusABBackground from "src/Assets/misc/narrativeFrameworkBackgrounds/a-background-narrativeframework-campusab.png";
import campusKEBackground from "src/Assets/misc/narrativeFrameworkBackgrounds/a-background-narrativeframework-campuske.png";
import suburbBackground from "src/Assets/misc/narrativeFrameworkBackgrounds/a-background-narrativeframework-suburb.png";
import companyBackground from "src/Assets/misc/narrativeFrameworkBackgrounds/a-background-narrativeframework-company.png";

type NarrativeFrameworkProps = {
  type: "intro" | "outro";
};

function getBackgroundImage(theme: ThemeType): string {
  // Convert theme to string for comparison
  const themeString = theme?.toString();

  // Check for main world themes and their variations
  if (
    themeString === ThemeType.CampusAB ||
    themeString?.startsWith("CAMPUSASCHAFFENBURG")
  ) {
    return campusABBackground;
  }
  if (
    themeString === ThemeType.CampusKE ||
    themeString?.startsWith("CAMPUSKEMPTEN")
  ) {
    return campusKEBackground;
  }
  if (themeString === ThemeType.Suburb || themeString?.startsWith("SUBURB")) {
    return suburbBackground;
  }
  if (themeString === ThemeType.Company || themeString?.startsWith("COMPANY")) {
    return companyBackground;
  }

  // Fallback to suburb background if theme is undefined or doesn't match
  return suburbBackground;
}

export default function NarrativeFramework(props: NarrativeFrameworkProps) {
  const [viewModel, controller] = useBuilder<
    NarrativeFrameworkViewModel,
    INarrativeFrameworkController
  >(BUILDER_TYPES.INarrativeFrameworkBuilder);

  if (!viewModel || !controller) return null;
  if (props.type === "intro" && !viewModel.introText) return null;
  if (props.type === "outro" && !viewModel.outroText) return null;

  const backgroundImage = getBackgroundImage(
    viewModel.theme || ThemeType.Suburb,
  );

  return (
    <div className="relative h-auto w-full">
      {/* Background Container - takes full available space */}
      <div
        className="relative h-auto min-h-[250px] w-full rounded-lg bg-cover bg-bottom bg-no-repeat p-3 md:min-h-[300px] md:p-4 lg:min-h-[350px] xl:min-h-[400px] onek:min-h-[450px] twok:min-h-[700px] fourk:min-h-[1100px] mobile-landscape:min-h-[200px] mobile-landscape:p-2 mobile-portrait:-mx-4 mobile-portrait:min-h-[300px] mobile-portrait:w-screen mobile-portrait:p-4 tablet-portrait:min-h-[320px]"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* AdLer Character - positioned bottom left with overflow */}
        <div className="absolute -bottom-3 -left-3 flex items-end md:-bottom-4 md:-left-4 mobile-landscape:-bottom-2 mobile-landscape:-left-2 mobile-portrait:-bottom-2 mobile-portrait:-left-2 tablet-portrait:-bottom-4 tablet-portrait:-left-4">
          <img
            alt="AdLer with a thumb up"
            src={explainAdler}
            className="mobile-portrait:w-18 tablet-portrait:w-22 h-auto w-20 md:w-24 lg:w-28 xl:w-32 onek:w-36 twok:w-40 mobile-landscape:w-16"
          />
        </div>

        {/* Speech Bubble - positioned top right of AdLer */}
        <div className="tablet-portrait:bottom-18 tablet-portrait:left-18 absolute bottom-16 left-16 z-10 md:bottom-20 md:left-20 lg:bottom-24 lg:left-24 xl:bottom-28 xl:left-28 onek:bottom-32 onek:left-32 twok:bottom-36 twok:left-36 mobile-landscape:bottom-12 mobile-landscape:left-12 mobile-portrait:bottom-14 mobile-portrait:left-14">
          <div className="relative w-auto min-w-[200px] max-w-[65vw] md:max-w-[60vw] lg:max-w-[55vw] xl:max-w-[50vw] mobile-landscape:max-w-[70vw] mobile-portrait:max-w-[68vw] tablet-portrait:max-w-[62vw]">
            {/* Speech bubble content */}
            <div className="rounded-lg bg-buttonbgblueopacity p-2 text-adlerdarkblue shadow-lg md:p-3 lg:p-4 mobile-landscape:p-2 mobile-portrait:p-2 tablet-portrait:p-3">
              <p className="text-center text-2xs font-bold leading-tight md:text-xs md:leading-normal lg:text-sm xl:text-base onek:text-lg twok:text-2xl twok:leading-relaxed fourk:text-2xl mobile-landscape:text-2xs mobile-portrait:text-2xs tablet-portrait:text-xs">
                {props.type === "intro" && viewModel.introText}
                {props.type === "outro" && viewModel.outroText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
