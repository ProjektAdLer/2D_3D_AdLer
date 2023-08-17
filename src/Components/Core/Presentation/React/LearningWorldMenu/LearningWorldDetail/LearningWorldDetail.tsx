import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import LearningWorldDetailViewModel from "./LearningWorldDetailViewModel";
import worldIcon from "../../../../../../Assets/icons/14-world/world-icon-nobg.svg";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import TextWithLineBreaks from "~ReactComponents/ReactRelated/ReactBaseComponents/TextWithLineBreaks";
import ILearningWorldDetailController from "./ILearningWorldDetailController";
import greenSwosh from "../../../../../../Assets/icons/17-1-solution-check/check-solution-icon-nobg.svg";
import spaceIcon from "../../../../../../Assets/icons/13-space/space-icon-nobg.svg";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";

export default function LearningWorldDetail({ className }: AdLerUIComponent) {
  const [viewModel, controller] = useBuilder<
    LearningWorldDetailViewModel,
    ILearningWorldDetailController
  >(BUILDER_TYPES.ILearningWorldDetailBuilder);

  const [name] = useObservable<string>(viewModel.name);
  const [description] = useObservable<string>(viewModel.description);
  const [goals] = useObservable<string[]>(viewModel.goals);
  const [spaces] = useObservable<LearningSpaceTO[]>(viewModel.spaces);

  // return if any of the observables is undefined
  if (name === undefined || name === "") return null;

  return (
    <main
      className={tailwindMerge(
        className,
        "flex flex-col self-start gap-2 w-full h-full overflow-hidden"
      )}
    >
      <article className="flex overflow-x-auto w-full flex-row portrait:flex-col portrait:items-between portrait:justify-center items-center h-[12%] portrait:h-[20%] portrait:gap-2 justify-between p-1 border-b border-gray-500">
        <div className="flex">
          <img src={worldIcon} className="w-6 xl:w-8" alt="Lernwelt-Icon"></img>
          <h2 className="flex-wrap ml-2 overflow-x-auto font-black break-words text-md text-adlerdarkblue lg:text-2xl">
            {name}
          </h2>
        </div>
        <StyledButton
          color="highlight"
          shape="freefloatleft"
          className="self-center block m-4 justify-self-center animate-bounce-once bg-nodehandlecolor"
          onClick={controller.onEnterLearningWorldButtonClicked}
        >
          {"Lernwelt öffnen!"}
        </StyledButton>
      </article>
      <article className="flex flex-col w-full gap-2 landscape:lg-[75%] h-[68%] overflow-y-auto">
        {description === undefined ||
          (description !== "" && (
            <div className="pb-2 border-b border-gray-500">
              <h3 className="self-center ml-2 font-black portrait:text-sm text-adlerdarkblue lg:mb-2">
                Beschreibung:
              </h3>
              <div className="items-start ml-6 font-medium portrait:text-xs">
                <TextWithLineBreaks text={description} />
              </div>
            </div>
          ))}
        {goals === undefined ||
          (goals.length > 0 && (
            <div className="pb-2 border-b border-gray-500">
              <h3 className="self-center ml-2 font-black text-adlerdarkblue portrait:text-sm lg:mb-2">
                {goals.length > 1 ? "Lernziele:" : "Lernziel:"}
              </h3>
              <div className="items-start ml-6 font-medium portrait:text-xs lg:text:lg">
                {goals.map((goal) => {
                  return <TextWithLineBreaks text={goal} key={goal} />;
                })}
              </div>
            </div>
          ))}
        <section className="pb-2 border-b border-gray-500">
          <h3 className="self-center ml-2 font-black portrait:text-sm text-adlerdarkblue lg:mb-2">
            {spaces?.length > 1 ? "Räume:" : "Raum:"}
          </h3>
          <div className="items-start ml-6 font-medium portrait:ml-3 portrait:text-xs lg:text:lg">
            {spaces?.map((space) => {
              return (
                <div key={space.id}>
                  <div className="flex flex-row items-center lg:text-lg">
                    <div className="relative flex my-2 ml-2">
                      <img
                        src={spaceIcon}
                        alt=""
                        className="w-8 mr-4 portrait:w-6 portrait:mr-1 xl:w-12"
                      />
                      {space.currentScore >= space.requiredScore && (
                        <img
                          src={greenSwosh}
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
          <h3 className="self-center ml-2 font-black text-adlerdarkblue portrait:text-sm lg:mb-2">
            Anzahl Räume:
          </h3>
          <div className="items-start ml-6 font-medium portrait:text-xs lg:text:lg">
            {spaces?.length}
          </div>
        </section>
      </article>
    </main>
  );
}
