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
  const [estimatedTimeInMinutes] = useObservable<number>(
    viewModel.estimatedTimeInMinutes,
  );

  const { t: translate } = useTranslation("worldMenu");

  // return if any of the observables is undefined
  if (name === undefined || name === "") return null;

  return (
    <main
      className={tailwindMerge(
        className,
        "flex h-full w-full flex-col gap-2 self-start mobile-landscape:h-full mobile-landscape:max-h-full",
      )}
    >
      <article className="portrait:items-between flex h-[10%] flex-row items-center justify-between border-b border-gray-500 p-1 pb-4 portrait:h-12 portrait:justify-center portrait:gap-2">
        <div className="flex flex-row">
          <img src={worldIcon} className="w-6 xl:w-8" alt="Lernwelt-Icon"></img>
          <div className="text-md ml-2 flex-wrap overflow-x-auto break-words font-black text-adlerdarkblue lg:text-2xl mobile-landscape:text-sm">
            {name}
          </div>
        </div>
        <StyledButton
          color="highlight"
          shape="freeFloatLeft"
          className="animate-bounce-once m-2 block self-center justify-self-center bg-nodehandlecolor font-bold portrait:p-2"
          onClick={controller.onEnterLearningWorldButtonClicked}
          title={translate("worldOpenButtonToolTip").toString()}
          data-testid="enter-learningworld"
        >
          {translate("openLearningWorldButton")}
        </StyledButton>
      </article>

      {/* Hier ist die Lösung: flex-1 und min-h-0 */}
      <article className="flex min-h-0 w-full flex-1 flex-col gap-2 overflow-y-auto mobile-landscape:min-h-0 mobile-landscape:overflow-y-auto">
        {description === undefined ||
          (description !== "" && (
            <div className="border-b border-gray-500 pb-2">
              <h3 className="ml-2 self-center font-black text-adlerdarkblue lg:mb-2 mobile-landscape:text-sm portrait:text-sm">
                {translate("description")}
              </h3>
              <div className="ml-6 items-start font-medium mobile-landscape:text-xs portrait:text-xs">
                <TextWithLineBreaks text={description} />
              </div>
            </div>
          ))}
        {goals === undefined ||
          (goals.length > 0 && (
            <div className="border-b border-gray-500 pb-2">
              <h3 className="ml-2 self-center font-black text-adlerdarkblue lg:mb-2 mobile-landscape:text-sm portrait:text-sm">
                {translate("goal", { count: goals?.length })}
              </h3>
              <div className="lg:text:lg ml-6 items-start font-medium mobile-landscape:text-xs portrait:text-xs">
                {goals.map((goal) => {
                  return <TextWithLineBreaks text={goal} key={goal} />;
                })}
              </div>
            </div>
          ))}
        {estimatedTimeInMinutes !== undefined && estimatedTimeInMinutes > 0 && (
          <div className="border-b border-gray-500 pb-2">
            <h3 className="ml-2 self-center font-black text-adlerdarkblue lg:mb-2 mobile-landscape:text-sm portrait:text-sm">
              {translate("estimatedTime")}
            </h3>
            <div className="lg:text:lg ml-6 items-start font-medium mobile-landscape:text-xs portrait:text-xs">
              {estimatedTimeInMinutes + " " + translate("minutes")}
            </div>
          </div>
        )}
        <section className="border-b border-gray-500 pb-2">
          <h3 className="ml-2 self-center font-black text-adlerdarkblue lg:mb-2 mobile-landscape:text-sm portrait:text-sm">
            {translate("rooms", { count: spaces?.length })}
          </h3>
          <div className="lg:text:lg ml-6 items-start font-medium mobile-landscape:text-xs portrait:ml-3 portrait:text-xs">
            {spaces?.map((space) => {
              return (
                <div key={space.id}>
                  <div className="flex flex-row items-center lg:text-lg">
                    <div className="relative my-2 ml-2 flex mobile-landscape:my-1">
                      <img
                        src={spaceIcon}
                        alt=""
                        className="mr-4 w-8 xl:w-12 portrait:mr-1 portrait:w-6"
                      />
                      {space.currentScore >= space.requiredScore && (
                        <img
                          src={greenSwosh}
                          data-testid={`greenSwosh-${space.id}`}
                          alt=""
                          className="absolute bottom-3 left-4 w-6 xl:bottom-4 xl:left-6 xl:w-8"
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
        <section className="border-b border-gray-500 pb-2">
          <h3 className="ml-2 self-center font-black text-adlerdarkblue lg:mb-2 mobile-landscape:text-sm portrait:text-sm">
            {translate("roomCount")}
          </h3>
          <div className="lg:text:lg ml-6 items-start font-medium mobile-landscape:text-xs portrait:text-xs">
            {spaces?.length}
          </div>
        </section>
      </article>
    </main>
  );
}
