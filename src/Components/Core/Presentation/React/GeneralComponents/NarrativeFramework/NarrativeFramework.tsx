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
    <div
      className="relative h-80 w-full rounded-lg bg-cover bg-no-repeat p-4 mobile-landscape:h-32 mobile-landscape:w-[70vw] tablet-portrait:h-[60vh]"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute -left-6 top-56 flex items-start justify-start xl:-left-2 xl:top-56 mobile-landscape:top-16 tablet-portrait:top-56">
        <img alt="AdLer with a thumb up" src={explainAdler} className="w-32" />
        <div className="twok:top-15 relative -left-4 -top-24 z-50 mt-4 translate-y-[-50%] xl:-top-24 xl:left-4 xl:w-3/4 onek:-left-0 onek:-top-20 onek:mt-0 twok:left-2 mobile-landscape:-top-4 mobile-portrait:w-56 tablet-portrait:-top-12">
          <span className="bubblecornerbottomleft invisible absolute -bottom-20 -left-3 h-20 w-20 bg-buttonbgblueopacity md:visible mobile-landscape:invisible"></span>
          <div className="rounded-lg bg-buttonbgblueopacity p-4 text-adlerdarkblue mobile-portrait:p-2">
            <p className="text-2xs font-bold lg:text-base xl:text-lg onek:text-lg tablet-portrait:text-lg">
              {props.type === "intro" && viewModel.introText}
              {props.type === "outro" && viewModel.outroText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
