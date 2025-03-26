import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import NarrativeFrameworkIntroViewModel from "./NarrativeFrameworkIntroViewModel";
import INarrativeFrameworkIntroController from "./INarrativeFrameworkIntroController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import explainAdler from "src/Assets/narrativeFramework/g-narrativeframe-explainadler-angled.png";

type NarrativeFrameworkIntroProps = {
  location: "space" | "loadingScreen";
};

export default function NarrativeFrameworkIntro(
  props: NarrativeFrameworkIntroProps,
) {
  const [viewModel, controller] = useBuilder<
    NarrativeFrameworkIntroViewModel,
    INarrativeFrameworkIntroController
  >(BUILDER_TYPES.INarrativeFrameworkIntroBuilder);
  const [isOpenInLoadingScreen] = useObservable<boolean>(
    viewModel?.isOpenInLoadingscreen,
  );
  const [isOpenInModal] = useObservable<boolean>(viewModel?.isOpenInModal);
  const [isModal] = useObservable<boolean>(viewModel?.isModal);

  console.log(
    "NarrativeFrameworkIntro",
    isModal,
    isOpenInLoadingScreen,
    isOpenInModal,
  );
  if (!viewModel || !controller) return null;
  if (props.location === "space" && isOpenInModal !== true) return null;
  if (isOpenInModal !== true && isOpenInLoadingScreen !== true) return null;
  // if (!viewModel.introText) return null;

  if (isModal) {
    return (
      <div>
        Neues Modal styling
        {mainBody(viewModel)}
      </div>
    );
  } else {
    return mainBody(viewModel);
  }
}
function mainBody(viewModel: NarrativeFrameworkIntroViewModel) {
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
              {viewModel.introText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
