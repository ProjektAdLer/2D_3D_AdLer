import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import NarrativeFrameworkViewModel from "./NarrativeFrameworkViewModel";
import INarrativeFrameworkController from "./INarrativeFrameworkController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import explainAdler from "src/Assets/narrativeFramework/g-narrativeframe-explainadler-angled.png";

export default function NarrativeFramework() {
  const [viewModel, controller] = useBuilder<
    NarrativeFrameworkViewModel,
    INarrativeFrameworkController
  >(BUILDER_TYPES.INarrativeFrameworkBuilder);
  const [isOpen] = useObservable<boolean>(viewModel?.isOpen);

  if (!viewModel || !controller || !isOpen) return null;
  if (!viewModel.introText && !viewModel.outroText) return null;

  return (
    <main className="bg-suburbthemebg bg-no-repeat bg-cover w-[60svw] h-[60svh] relative rounded-lg p-4">
      <div className="absolute top-[20%] -left-64 flex justify-start items-start lg:top-[30%] xl:-left-32">
        <img
          alt="AdLer with a thumb up"
          src={explainAdler}
          className="w-1/3 h-auto z-0"
        />
        <div className="max-w-[45svw] z-50 relative mt-4 -left-32 translate-y-[-50%] xl:-left-20 xl:-top-10 onek:top-8 onek:mt-0 twok:top-20 twok:-left-44">
          <span className="bg-buttonbgblueopacity absolute -left-3 -bottom-20 bubblecornerbottomleft w-20 h-20"></span>
          <div className="bg-buttonbgblueopacity rounded-lg p-4 text-adlerdarkblue">
            <p className="font-bold text-sm onek:text-lg">
              {viewModel.introText}
            </p>
          </div>
        </div>
        {/*}{viewModel.outroText}{*/}
      </div>
    </main>
  );
}
