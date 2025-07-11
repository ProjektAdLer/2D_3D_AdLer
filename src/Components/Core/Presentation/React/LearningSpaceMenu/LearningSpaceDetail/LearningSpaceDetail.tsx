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
        "flex h-[100svh] w-full flex-col gap-2 self-start portrait:h-[45svh]",
      )}
    >
      <article className="portrait:items-between flex h-[10%] flex-row items-center justify-between border-b border-gray-500 p-1 pb-4 portrait:h-[25%] portrait:flex-col portrait:justify-center portrait:gap-2">
        <div className="flex flex-row">
          <img src={spaceIcon} className="w-6 xl:w-8" alt="Lernraum-Icon"></img>
          <div className="text-md ml-2 flex-wrap overflow-x-auto break-words font-black text-adlerdarkblue lg:text-2xl mobile-landscape:text-sm">
            {name}
          </div>
        </div>
        {isAvailable && (
          <StyledButton
            color="highlight"
            shape="freeFloatLeft"
            className="animate-bounce-once m-2 block self-center justify-self-center bg-nodehandlecolor font-bold portrait:p-2"
            onClick={controller.onLearningSpaceButtonClicked}
            title={translate("spaceOpenButtonToolTip").toString()}
          >
            {translate("learningSpaceButton")}
          </StyledButton>
        )}
      </article>
      <article className="flex h-[75%] w-full flex-col gap-2 overflow-auto">
        {description !== "" && (
          <section className="border-b border-gray-500 pb-2">
            <h3 className="ml-2 self-center font-black text-adlerdarkblue lg:mb-2 mobile-landscape:text-sm portrait:text-sm">
              {translate("description")}
            </h3>
            <div className="ml-6 items-start font-medium mobile-landscape:text-xs portrait:ml-3 portrait:text-xs">
              <TextWithLineBreaks text={description} />
            </div>
          </section>
        )}
        {goals.length > 0 && goals[0] !== "" && (
          <section className="border-b border-gray-500 pb-2">
            <h3 className="ml-2 self-center font-black text-adlerdarkblue lg:mb-2 mobile-landscape:text-sm portrait:text-sm">
              {translate("goal", { count: goals?.length })}
            </h3>
            <div className="lg:text:lg ml-6 items-start font-medium mobile-landscape:text-xs portrait:ml-3 portrait:text-xs">
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
          <section className="border-b border-gray-500 pb-2">
            <h3 className="ml-2 self-center font-black text-adlerdarkblue lg:mb-2 mobile-landscape:text-sm portrait:text-sm">
              {translate("estimatedTime")}
            </h3>
            <div className="ml-6 items-start font-medium lg:text-lg mobile-landscape:text-xs portrait:ml-3 portrait:text-xs">
              {accumulatedEstimatedTime + " " + translate("minutes")}
            </div>
          </section>
        )}
        {elements.length > 0 && (
          <section className="border-b border-gray-500 pb-2">
            <h3 className="ml-2 self-center font-black text-adlerdarkblue lg:mb-2 mobile-landscape:text-sm portrait:text-sm">
              {translate("learningElement", { count: elements?.length })}
            </h3>
            <div className="ml-6 flex flex-col items-start font-medium lg:text-lg mobile-landscape:text-xs portrait:ml-3 portrait:text-xs">
              {elements.map((element) => {
                return (
                  <div key={element.name} className="w-full">
                    <div className="flex w-full flex-row justify-between pr-4">
                      <div className="relative flex max-w-[72%] flex-row items-center gap-x-2 portrait:gap-x-0.5">
                        {/* icon of element */}
                        <div className="relative mx-2 w-6 lg:w-8 portrait:mx-0.5 portrait:w-4">
                          {getLearningElementIcon(element.type)}
                          {element.hasScored && (
                            <img
                              src={greenSwosh}
                              alt=""
                              data-testid="checkMark"
                              className="absolute bottom-3 left-4 h-4 lg:bottom-6 lg:left-6 lg:h-6 portrait:bottom-5 portrait:left-3 portrait:h-2"
                            />
                          )}
                        </div>
                        {/* name of element */}
                        <div
                          title={element.name}
                          className="md:max-w-76 group ml-1 flex max-w-16 flex-row items-center overflow-hidden xl:min-w-52 xl:max-w-56 onek:min-w-64"
                        >
                          <span className="inline-block text-ellipsis whitespace-nowrap">
                            {" " + element.name}
                          </span>
                        </div>
                      </div>
                      {element.difficultyInfo?.difficultyType !== undefined && (
                        <div className="ml-1 flex w-1/5 flex-row items-center justify-center justify-self-end px-2">
                          {element.difficultyInfo.difficultyType === 0 && (
                            <div className="flex flex-row items-center justify-center rounded-lg bg-diffeasy p-1 lg:scale-75 mobile-landscape:w-24">
                              {translate("difficultyEasy")}
                            </div>
                          )}
                          {element.difficultyInfo.difficultyType === 100 && (
                            <div className="ml-1 flex flex-row items-center justify-center rounded-lg bg-diffmedium p-1 px-2 lg:scale-75 mobile-landscape:w-24">
                              {translate("difficultyMedium")}
                            </div>
                          )}
                          {element.difficultyInfo.difficultyType === 200 && (
                            <div className="ml-1 flex flex-row items-center justify-center rounded-lg bg-diffhard p-1 px-2 text-white lg:scale-75 mobile-landscape:w-24">
                              {translate("difficultyHard")}
                            </div>
                          )}
                        </div>
                      )}
                      {element.estimatedTimeInMinutes != null &&
                      element.estimatedTimeInMinutes > 0 ? (
                        <div className="flex w-12 justify-end md:w-24">
                          <div className="m-1 flex w-full flex-row items-center justify-center rounded-lg bg-adlerbggradientfrom lg:scale-75">
                            {element.estimatedTimeInMinutes + " min"}
                          </div>
                        </div>
                      ) : (
                        <div className="flex w-12 justify-end md:w-24"></div>
                      )}
                      <div className="ml-1 flex flex-row place-items-end items-center">
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
          <div className="border-b border-gray-500 pb-2"></div>
        )}
      </article>
    </main>
  );
}
