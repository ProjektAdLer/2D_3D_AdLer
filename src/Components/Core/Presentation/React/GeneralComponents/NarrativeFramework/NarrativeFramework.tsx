import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import NarrativeFrameworkViewModel from "./NarrativeFrameworkViewModel";
import INarrativeFrameworkController from "./INarrativeFrameworkController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import explainAdler from "src/Assets/narrativeFramework/g-narrativeframe-explainadler-angled.png";

type NarrativeFrameworkProps = {
  type: "intro" | "outro";
};

export default function NarrativeFramework(props: NarrativeFrameworkProps) {
  const [viewModel, controller] = useBuilder<
    NarrativeFrameworkViewModel,
    INarrativeFrameworkController
  >(BUILDER_TYPES.INarrativeFrameworkBuilder);

  if (!viewModel || !controller) return null;
  if (props.type === "intro" && !viewModel.introText) return null;
  if (props.type === "outro" && !viewModel.outroText) return null;
  return (
    <div className="bg-suburbthemebg bg-no-repeat bg-cover relative rounded-lg p-4 w-full h-full mobile-landscape:w-[70vw]">
      <div className="flex justify-start items-start absolute top-56 mobile-landscape:top-16 tablet-portrait:top-96 -left-16 xl:-left-2 xl:top-56">
        <img alt="AdLer with a thumb up" src={explainAdler} className="w-32" />
        <div className="z-50 relative mt-4 -left-4 -top-24 translate-y-[-50%] mobile-portrait:w-56 mobile-landscape:-top-4 tablet-portrait:-top-48 xl:w-3/4 xl:left-4 xl:-top-24 onek:mt-0 onek:-top-20 onek:-left-0 twok:top-15 twok:left-2">
          <span className="invisible mobile-landscape:invisible md:visible absolute w-20 h-20 bg-buttonbgblueopacity -left-3 -bottom-20 bubblecornerbottomleft"></span>
          <div className="p-4 mobile-portrait:p-2 rounded-lg bg-buttonbgblueopacity text-adlerdarkblue">
            <p className="text-2xs font-bold tablet-portrait:text-lg lg:text-base xl:text-lg onek:text-lg">
              {props.type === "intro" && viewModel.introText}
              {props.type === "outro" && viewModel.outroText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
