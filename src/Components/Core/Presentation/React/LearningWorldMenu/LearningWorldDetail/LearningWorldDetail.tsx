import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import LearningWorldDetailViewModel from "./LearningWorldDetailViewModel";
import worldIcon from "../../../../../../Assets/icons/world.svg";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import TextWithLineBreaks from "~ReactComponents/ReactRelated/ReactBaseComponents/TextWithLineBreaks";
import ILearningWorldDetailController from "./ILearningWorldDetailController";
import greenSwosh from "../../../../../../Assets/icons/check-solution.svg";
import spaceIcon from "../../../../../../Assets/icons/space.svg";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import { useTranslation } from "react-i18next";

export default function LearningWorldDetail({ className }: AdLerUIComponent) {
  const [viewModel, controller] = useBuilder<
    LearningWorldDetailViewModel,
    ILearningWorldDetailController
  >(BUILDER_TYPES.ILearningWorldDetailBuilder);

  const [name] = useObservable<string>(viewModel.name);
  const [description] = useObservable<string>(viewModel.description);
  const [goals] = useObservable<string[]>(viewModel.goals);
  const [spaces] = useObservable<LearningSpaceTO[]>(viewModel.spaces);

  const { t: translate } = useTranslation("worldMenu");

  // return if any of the observables is undefined
  if (name === undefined || name === "") return null;

  return (
    <main
      className={tailwindMerge(
        className,
        "flex flex-col gap-2 w-full self-start h-[80svh] portrait:h-[62dvh]",
      )}
    >
      <article className="flex flex-row portrait:flex-col portrait:items-between portrait:justify-center portrait:h-[25%] portrait:gap-2 items-center justify-between h-[10%] p-1 pb-4 border-b border-gray-500">
        <div className="flex flex-row">
          <img src={worldIcon} className="w-6 xl:w-8" alt="Lernwelt-Icon"></img>
          <div className="flex-wrap ml-2 overflow-x-auto font-black break-words text-md text-adlerdarkblue lg:text-2xl mobile-landscape:text-sm">
            {name}
          </div>
        </div>
        <StyledButton
          color="highlight"
          shape="freeFloatLeft"
          className="self-center block m-2 portrait:p-2 justify-self-center animate-bounce-once font-bold bg-nodehandlecolor"
          onClick={controller.onEnterLearningWorldButtonClicked}
        >
          {translate("openLearningWorldButton")}
        </StyledButton>
      </article>
      <article className="flex flex-col w-full gap-2 landscape:lg-[75%] h-[68%] onek-h-[75%] overflow-y-auto">
        {description === undefined ||
          (description !== "" && (
            <div className="pb-2 border-b border-gray-500">
              <h3 className="self-center ml-2 font-black portrait:text-sm text-adlerdarkblue lg:mb-2 mobile-landscape:text-sm">
                {translate("description")}
              </h3>
              <div className="items-start ml-6 font-medium portrait:text-xs mobile-landscape:text-xs">
                <TextWithLineBreaks text={description} />
              </div>
            </div>
          ))}
        {goals === undefined ||
          (goals.length > 0 && (
            <div className="pb-2 border-b border-gray-500">
              <h3 className="self-center ml-2 font-black text-adlerdarkblue portrait:text-sm lg:mb-2 mobile-landscape:text-sm">
                {translate("goal", { count: goals?.length })}
              </h3>
              <div className="items-start ml-6 font-medium mobile-landscape:text-xs portrait:text-xs lg:text:lg">
                {goals.map((goal) => {
                  return <TextWithLineBreaks text={goal} key={goal} />;
                })}
              </div>
            </div>
          ))}
        <section className="pb-2 border-b border-gray-500">
          <h3 className="self-center ml-2 font-black portrait:text-sm text-adlerdarkblue lg:mb-2 mobile-landscape:text-sm">
            {translate("rooms", { count: spaces?.length })}
          </h3>
          <div className="items-start ml-6 font-medium portrait:ml-3 mobile-landscape:text-xs portrait:text-xs lg:text:lg">
            {spaces?.map((space) => {
              return (
                <div key={space.id}>
                  <div className="flex flex-row items-center lg:text-lg">
                    <div className="relative flex my-2 ml-2 mobile-landscape:my-1">
                      <img
                        src={spaceIcon}
                        alt=""
                        className="w-8 mr-4 portrait:w-6 portrait:mr-1 xl:w-12"
                      />
                      {space.currentScore >= space.requiredScore && (
                        <img
                          src={greenSwosh}
                          data-testid="greenSwosh"
                          alt=""
                          className="absolute w-6 bottom-3 left-4 xl:w-8 xl:left-6 xl:bottom-4"
                        />
                      )}
                    </div>
                    <div className="pl-2">{space.name}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section className="pb-2 border-b border-gray-500">
          <h3 className="self-center ml-2 font-black text-adlerdarkblue portrait:text-sm lg:mb-2 mobile-landscape:text-sm">
            {translate("roomCount")}
          </h3>
          <div className="items-start ml-6 font-medium portrait:text-xs lg:text:lg mobile-landscape:text-xs">
            {spaces?.length}
          </div>
        </section>
      </article>
    </main>
  );
}
