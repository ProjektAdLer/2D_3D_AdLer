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
    <main className="bg-suburbthemebg bg-no-repeat bg-cover w-[70svw] h-[60svh] relative rounded-lg p-4 mobile-portrait:h-[65svh] mobile-portrait:w-[85svw] mobile-portrait:mt-4 pointer-events-none">
      <div className="absolute top-20 -left-20 flex justify-start items-start mobile-portrait:top-64 mobile-portrait:-left-10 tablet-portrait:-left-24 tablet-portrait:top-96 lg:top-52 lg:-left-28 xl:top-44 twok:-left-64">
        <img
          alt="AdLer with a thumb up"
          src={explainAdler}
          className="w-1/3 h-auto z-0"
        />
        <div className="max-w-[70%] z-50 relative mt-4 -left-10 translate-y-[-50%] mobile-portrait:max-w-[65%] mobile-portrait:left-0 mobile-portrait:top-0 tablet-portrait:-left-16 tablet-portrait:-top-32 lg:-left-20 lg:-top-20 onek:-left-36 twok:max-w-[45%] twok:-left-44 twok:top-0">
          <span className="bg-buttonbgblueopacity absolute -left-20 bottom-3 bubblecornerbottomleft w-20 h-20 rotate-90 mobile-landscape:invisible tablet-portrait:rotate-0 tablet-portrait:left-0 tablet-portrait:-bottom-20 lg:-rotate-0 lg:-bottom-20 lg:left-0"></span>
          <div className="bg-buttonbgblueopacity rounded-lg p-4 text-adlerdarkblue">
            <p className="font-bold text-xs tablet-portrait:text-sm lg:text-base onek:text-lg fourk:text-xl">
              {viewModel.introText}
            </p>
          </div>
        </div>
        {/*}{viewModel.outroText}{*/}
      </div>
    </main>
  );
}
