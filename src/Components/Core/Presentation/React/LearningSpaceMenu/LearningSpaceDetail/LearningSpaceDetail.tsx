import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import LearningSpaceDetailViewModel, {
  LearningSpaceDetailLearningSpaceData,
} from "./LearningSpaceDetailViewModel";
import spaceIcon from "../../../../../../Assets/icons/13-space/space-icon-nobg.svg";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import { LearningElementTypeStrings } from "../../../../Domain/Types/LearningElementTypes";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import LearningSpaceDetailController from "./LearningSpaceDetailController";
import { getLearningElementIcon } from "../../../Utils/GetLearningElementIcon";
import coinIcon from "../../../../../../Assets/icons/08-coin/coin-icon-nobg.svg";
import TextWithLineBreaks from "~ReactComponents/ReactRelated/ReactBaseComponents/TextWithLineBreaks";
import greenSwosh from "../../../../../../Assets/icons/17-1-solution-check/check-solution-icon-nobg.svg";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import ILoggerPort from "src/Components/Core/Application/Ports/Interfaces/ILoggerPort";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";

export default function LearningSpaceDetail({ className }: AdLerUIComponent) {
  const [viewModel, controller] = useBuilder<
    LearningSpaceDetailViewModel,
    LearningSpaceDetailController
  >(BUILDER_TYPES.ILearningSpaceDetailBuilder);
  const logger = CoreDIContainer.get<ILoggerPort>(CORE_TYPES.ILogger);

  const [name] = useObservable<string>(viewModel.name);
  const [description] = useObservable<string>(viewModel.description);
  const [goals] = useObservable<string[]>(viewModel.goals);
  const [elements] = useObservable<
    [LearningElementTypeStrings, string, boolean, number][]
  >(viewModel.elements);
  const [requiredPoints] = useObservable<number>(viewModel.requiredPoints);
  const [requirements] = useObservable<number[]>(viewModel.requirements);
  const [spaces] = useObservable<LearningSpaceDetailLearningSpaceData[]>(
    viewModel.spaces
  );
  const [isAvailable] = useObservable<boolean>(viewModel.isAvailable);

  // return if any of the observables is undefined
  if (
    name === undefined ||
    name === "" ||
    description === undefined ||
    goals === undefined ||
    elements === undefined ||
    requiredPoints === undefined ||
    requirements === undefined ||
    spaces === undefined
  )
    return null;

  return (
    <main
      className={tailwindMerge(
        className,
        "flex flex-col gap-2 w-full self-start h-[100svh] portrait:h-[45svh]"
      )}
    >
      <article className="flex flex-row portrait:flex-col portrait:items-between portrait:justify-center portrait:h-[25%] portrait:gap-2 items-center justify-between h-[10%] p-1 pb-4 border-b border-gray-500">
        <div className="flex flex-row">
          <img src={spaceIcon} className="w-6 xl:w-8" alt="Lernraum-Icon"></img>
          <div className="flex-wrap ml-2 overflow-x-auto font-black break-words text-md text-adlerdarkblue lg:text-2xl">
            {name}
          </div>
        </div>
        {isAvailable && (
          <StyledButton
            color="highlight"
            shape="freefloatleft"
            className="self-center block m-2 portrait:p-4 justify-self-center animate-bounce-once bg-nodehandlecolor"
            onClick={controller.onLearningSpaceButtonClicked}
          >
            {"Lernraum betreten!"}
          </StyledButton>
        )}
      </article>
      <article className="flex flex-col w-full gap-2 h-[75%] overflow-auto">
        {description !== "" && (
          <section className="pb-2 border-b border-gray-500">
            <h3 className="self-center ml-2 font-black portrait:text-sm text-adlerdarkblue lg:mb-2">
              Beschreibung:
            </h3>
            <div className="items-start ml-6 font-medium portrait:ml-3 portrait:text-xs">
              <TextWithLineBreaks text={description} />
            </div>
          </section>
        )}
        {goals.length > 0 && (
          <section className="pb-2 border-b border-gray-500">
            <h3 className="self-center ml-2 font-black portrait:text-sm text-adlerdarkblue lg:mb-2">
              {goals.length > 1 ? "Lernziele:" : "Lernziel:"}
            </h3>
            <div className="items-start ml-6 font-medium portrait:text-xs portrait:ml-3 lg:text:lg">
              {goals.map((goal) => {
                return <TextWithLineBreaks text={goal} key={goal} />;
              })}
            </div>
          </section>
        )}
        {elements.length > 0 && (
          <section className="pb-2 border-b border-gray-500">
            <h3 className="self-center ml-2 font-black portrait:text-sm text-adlerdarkblue lg:mb-2">
              {elements.length > 1 ? "Lernelemente:" : "Lernelement:"}
            </h3>
            <div className="flex flex-col items-start ml-6 font-medium portrait:ml-3 portrait:text-xs lg:text-lg">
              {elements.map((element) => {
                return (
                  <div key={element[1]} className="w-full">
                    <div className="flex flex-row justify-between w-full xl:w-3/4">
                      <div className="flex flex-row items-center portrait:gap-x-0.5 gap-x-2 max-w-[72%]">
                        <div className="relative w-6 portrait:w-4 mx-2 portrait:mx-0.5 lg:w-8">
                          {getLearningElementIcon(element[0])}
                          {element[2] && (
                            <img
                              src={greenSwosh}
                              alt=""
                              className="absolute h-4 portrait:h-2 lg:h-6 portrait:bottom-5 portrait:left-3 bottom-3 left-4 lg:bottom-6 lg:left-6 "
                            />
                          )}
                        </div>

                        <div className="flex flex-row items-center ml-1">
                          {" " + element[1]}
                        </div>
                      </div>
                      <div className="flex flex-row items-center ml-1 place-items-end">
                        {/* //TODO: Add real current points  */}
                        {element[2]
                          ? element[3] + "/" + element[3]
                          : "0/" + element[3]}
                        <img
                          src={coinIcon}
                          className="self-center w-6 ml-1 portrait:w-4 lg:w-8"
                          alt="Coin-Icon"
                        ></img>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
        {!!requiredPoints && (
          <section className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between w-full xl:w-3/4">
              <h3 className="self-center max-w-[75%] ml-2 text-lg font-black portrait:text-sm text-adlerdarkblue">
                Benötigte Punkte:
              </h3>
              <div className="flex flex-row ml-6 text-lg font-medium portrait:text-xs portrait:ml-2">
                {requiredPoints}
                <img
                  src={coinIcon}
                  className="self-center w-6 ml-1 portrait:w-4 lg:w-8"
                  alt="Coin-Icon"
                ></img>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full xl:w-3/4">
              <h3 className="max-w-[75%] self-center ml-2 text-lg font-black portrait:text-sm text-adlerdarkblue">
                Maximal erreichbare Punkte:
              </h3>
              <div className="flex flex-row items-start ml-6 text-lg font-medium portrait:text-xs portrait:ml-2">
                {elements.reduce((acc, element) => acc + element[3], 0)}
                <img
                  src={coinIcon}
                  className="self-center w-6 ml-1 portrait:w-4 lg:w-8"
                  alt="Coin-Icon"
                ></img>
              </div>
            </div>
          </section>
        )}
        {elements.length > 0 && (
          <div className="pb-2 border-b border-gray-500"></div>
        )}
        {requirements.length > 0 && (
          <div className="pb-2 border-b border-gray-500">
            <div className="self-center ml-2 text-lg font-black text-adlerdarkblue">
              {requirements.length > 1
                ? "Benötigte Räume zur Freischaltung:"
                : "Benötigter Raum zur Freischaltung:"}
            </div>
            <div className="items-start ml-6 text-lg font-medium">
              {requirements.map((requirement) => {
                let name;
                let completed;
                const lookup = spaces.find((space) => space.id === requirement);
                if (lookup === undefined) {
                  logger.log(
                    LogLevelTypes.WARN,
                    "Requirement not found in spaces."
                  );
                  return undefined;
                }
                name = lookup.name;
                completed = lookup.isCompleted;

                return (
                  <div
                    className="relative flex my-4 ml-2"
                    key={name + completed}
                  >
                    <img src={spaceIcon} alt="" className="w-8 mr-4 xl:w-8" />
                    {completed && (
                      <img
                        src={greenSwosh}
                        alt=""
                        className="absolute h-4 lg:h-6 bottom-3 left-4 lg:bottom-3 lg:left-6 "
                      />
                    )}
                    {name}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </article>
    </main>
  );
}
