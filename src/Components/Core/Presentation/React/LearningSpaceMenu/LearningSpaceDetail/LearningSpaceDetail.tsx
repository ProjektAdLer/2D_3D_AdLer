import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import LearningSpaceDetailViewModel from "./LearningSpaceDetailViewModel";
import spaceIcon from "../../../../../../Assets/icons/space.svg";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import LearningSpaceDetailController from "./LearningSpaceDetailController";
import { getLearningElementIcon } from "../../../Utils/GetLearningElementIcon";
import TextWithLineBreaks from "~ReactComponents/ReactRelated/ReactBaseComponents/TextWithLineBreaks";
import greenSwosh from "../../../../../../Assets/icons/check-solution.svg";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { useTranslation } from "react-i18next";
import { LearningElementInfo } from "src/Components/Core/Domain/Types/LearningElementInfo";
import RequirementBasedDisplay from "../../../Utils/ElementCompletionDisplay/RequirementBasedDisplay";

export default function LearningSpaceDetail({ className }: AdLerUIComponent) {
  const [viewModel, controller] = useBuilder<
    LearningSpaceDetailViewModel,
    LearningSpaceDetailController
  >(BUILDER_TYPES.ILearningSpaceDetailBuilder);

  const [name] = useObservable<string>(viewModel.name);
  const [description] = useObservable<string>(viewModel.description);
  const [goals] = useObservable<string[]>(viewModel.goals);
  const [elements] = useObservable<LearningElementInfo[]>(viewModel.elements);
  const [requiredPoints] = useObservable<number>(viewModel.requiredPoints);
  const [currentXP] = useObservable<number>(viewModel.currentXP);
  const [maxXP] = useObservable<number>(viewModel.maxXP);
  const [accumulatedEstimatedTime] = useObservable<number>(
    viewModel.accumulatedEstimatedTime,
  );

  const [isAvailable] = useObservable<boolean>(viewModel.isAvailable);

  const { t: translate } = useTranslation("spaceMenu");

  // return if any of the observables is undefined
  if (
    name === undefined ||
    name === "" ||
    description === undefined ||
    goals === undefined ||
    elements === undefined ||
    requiredPoints === undefined
  )
    return null;

  return (
    <main
      className={tailwindMerge(
        className,
        "flex flex-col gap-2 w-full self-start h-[100svh] portrait:h-[45svh]",
      )}
    >
      <article className="flex flex-row portrait:flex-col portrait:items-between portrait:justify-center portrait:h-[25%] portrait:gap-2 items-center justify-between h-[10%] p-1 pb-4 border-b border-gray-500">
        <div className="flex flex-row">
          <img src={spaceIcon} className="w-6 xl:w-8" alt="Lernraum-Icon"></img>
          <div className="flex-wrap ml-2 overflow-x-auto font-black break-words text-md text-adlerdarkblue lg:text-2xl mobile-landscape:text-sm">
            {name}
          </div>
        </div>
        {isAvailable && (
          <StyledButton
            color="highlight"
            shape="freeFloatLeft"
            className="self-center block m-2 font-bold portrait:p-2 justify-self-center animate-bounce-once bg-nodehandlecolor"
            onClick={controller.onLearningSpaceButtonClicked}
            title={translate("spaceOpenButtonToolTip").toString()}
          >
            {translate("learningSpaceButton")}
          </StyledButton>
        )}
      </article>
      <article className="flex flex-col w-full gap-2 h-[75%] overflow-auto">
        {description !== "" && (
          <section className="pb-2 border-b border-gray-500">
            <h3 className="self-center ml-2 font-black portrait:text-sm mobile-landscape:text-sm text-adlerdarkblue lg:mb-2">
              {translate("description")}
            </h3>
            <div className="items-start ml-6 font-medium portrait:ml-3 portrait:text-xs mobile-landscape:text-xs">
              <TextWithLineBreaks text={description} />
            </div>
          </section>
        )}
        {goals.length > 0 && goals[0] !== "" && (
          <section className="pb-2 border-b border-gray-500">
            <h3 className="self-center ml-2 font-black portrait:text-sm text-adlerdarkblue lg:mb-2 mobile-landscape:text-sm">
              {translate("goal", { count: goals?.length })}
            </h3>
            <div className="items-start ml-6 font-medium portrait:text-xs portrait:ml-3 lg:text:lg mobile-landscape:text-xs">
              <ul className="ml-4 list-disc">
                {goals.map((goal, index) => {
                  return (
                    <li key={index}>
                      <TextWithLineBreaks text={goal} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        )}
        {accumulatedEstimatedTime > 0 && (
          <section className="pb-2 border-b border-gray-500">
            <h3 className="self-center ml-2 font-black portrait:text-sm text-adlerdarkblue lg:mb-2 mobile-landscape:text-sm">
              {translate("estimatedTime")}
            </h3>
            <div className="items-start ml-6 font-medium portrait:ml-3 portrait:text-xs lg:text-lg mobile-landscape:text-xs">
              {accumulatedEstimatedTime + " " + translate("minutes")}
            </div>
          </section>
        )}
        {elements.length > 0 && (
          <section className="pb-2 border-b border-gray-500">
            <h3 className="self-center ml-2 font-black portrait:text-sm text-adlerdarkblue lg:mb-2 mobile-landscape:text-sm">
              {translate("learningElement", { count: elements?.length })}
            </h3>
            <div className="flex flex-col items-start ml-6 font-medium portrait:ml-3 portrait:text-xs lg:text-lg mobile-landscape:text-xs">
              {elements.map((element) => {
                return (
                  <div key={element.name} className="w-full">
                    <div className="flex flex-row justify-between w-full xl:w-3/4">
                      <div className="flex flex-row items-center portrait:gap-x-0.5 gap-x-2 max-w-[72%]">
                        {/* icon of element */}
                        <div className="relative w-6 portrait:w-4 mx-2 portrait:mx-0.5 lg:w-8">
                          {getLearningElementIcon(element.type)}
                          {element.hasScored && (
                            <img
                              src={greenSwosh}
                              alt=""
                              data-testid="checkMark"
                              className="absolute h-4 portrait:h-2 lg:h-6 portrait:bottom-5 portrait:left-3 bottom-3 left-4 lg:bottom-6 lg:left-6 "
                            />
                          )}
                        </div>
                        {/* name of element */}
                        <div className="flex flex-row items-center ml-1">
                          {" " + element.name}
                        </div>
                      </div>
                      <div className="flex flex-row items-center ml-1 place-items-end">
                        {viewModel.completionDisplay.learningSpaceDetail(
                          element,
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
        {viewModel.completionDisplay instanceof RequirementBasedDisplay
          ? viewModel.completionDisplay.learningSpaceDetailSummary(
              currentXP,
              "",
              maxXP,
              "",
            )
          : viewModel.completionDisplay.learningSpaceDetailSummary(
              requiredPoints,
              translate("requiredPoints"),
              elements.reduce((acc, element) => acc + element.points, 0),
              translate("maximumPoints"),
            )}
        {elements.length > 0 && (
          <div className="pb-2 border-b border-gray-500"></div>
        )}
      </article>
    </main>
  );
}
