import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import NarrativeFrameworkIntroViewModel from "./NarrativeFrameworkIntroViewModel";
import INarrativeFrameworkIntroController from "./INarrativeFrameworkIntroController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import explainAdler from "src/Assets/narrativeFramework/g-narrativeframe-explainadler-angled.png";

type NarrativeFrameworkIntroProps = {
  type: "intro" | "outro";
};

export default function NarrativeFrameworkIntro(
  props: NarrativeFrameworkIntroProps,
) {
  const [viewModel, controller] = useBuilder<
    NarrativeFrameworkIntroViewModel,
    INarrativeFrameworkIntroController
  >(BUILDER_TYPES.INarrativeFrameworkIntroBuilder);

  if (!viewModel || !controller) return null;
  return (
    <div className="bg-suburbthemebg bg-no-repeat bg-cover w-[60svw] h-[60svh] relative rounded-lg p-4">
      <div className="absolute top-[40%] -left-64 flex justify-start items-start xl:-left-32">
        <img
          alt="AdLer with a thumb up"
          src={explainAdler}
          className="z-0 w-1/3 h-auto"
        />
        <div className="max-w-[50svw] z-50 relative mt-4 -left-32 translate-y-[-50%] xl:-left-16 xl:-top-10 onek:mt-0 onek:-top-10 onek:-left-20 twok:top-15 twok:-left-24">
          <span className="absolute w-20 h-20 bg-buttonbgblueopacity -left-3 -bottom-20 bubblecornerbottomleft"></span>
          <div className="p-4 rounded-lg bg-buttonbgblueopacity text-adlerdarkblue">
            <p className="text-sm font-bold onek:text-lg">
              {props.type === "intro" && viewModel.introText}
              {props.type === "outro" && viewModel.outroText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
