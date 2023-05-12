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
    <div
      className={tailwindMerge(
        className,
        "flex flex-col self-start gap-2 w-full h-full"
      )}
    >
      <div className="flex flex-row items-center justify-between p-1 border-b border-gray-500">
        <div className="flex">
          <img src={worldIcon} className="w-6 xl:w-8" alt="Lernwelt-Icon"></img>
          <h2 className="ml-2 text-lg font-black text-adlerdarkblue lg:text-2xl">
            {name}
          </h2>
        </div>
        <StyledButton
          shape="freefloatleft"
          className="self-center mt-2 mb-2 justify-self-center animate-bounce"
          onClick={controller.onEnterLearningWorldButtonClicked}
        >
          {"Lernwelt öffnen!"}
        </StyledButton>
      </div>
      <div className="flex flex-col w-full gap-2 overflow-auto">
        {description === undefined ||
          (description !== "" && (
            <div className="pb-2 border-b border-gray-500">
              <div className="self-center ml-2 font-black text-adlerdarkblue lg:mb-2">
                Beschreibung:
              </div>
              <div className="items-start ml-6 font-medium">
                <TextWithLineBreaks text={description} />
              </div>
            </div>
          ))}
        {goals === undefined ||
          (goals && (
            <div className="pb-2 border-b border-gray-500">
              <div className="self-center ml-2 font-black text-adlerdarkblue lg:mb-2">
                {goals.length > 1 ? "Lernziele:" : "Lernziel:"}
              </div>
              <div className="items-start ml-6 font-medium lg:text:lg">
                {goals.map((goal) => {
                  return <TextWithLineBreaks text={goal} key={goal} />;
                })}
              </div>
            </div>
          ))}
        <div className="pb-2 border-b border-gray-500">
          <div className="self-center ml-2 font-black text-adlerdarkblue lg:mb-2">
            {spaces?.length > 1 ? "Räume:" : "Raum:"}
          </div>
          <div className="items-start ml-6 font-medium lg:text:lg">
            {spaces?.map((space) => {
              return (
                <div key={space.id}>
                  <div className="flex flex-row items-center lg:text-lg">
                    <div className="relative flex my-2 ml-2">
                      <img
                        src={spaceIcon}
                        alt=""
                        className="w-8 mr-4 xl:w-12"
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
        </div>
        <div className="pb-2 border-b border-gray-500">
          <div className="self-center ml-2 font-black text-adlerdarkblue lg:mb-2">
            Anzahl Räume:
          </div>
          <div className="items-start ml-6 font-medium lg:text:lg">
            {spaces?.length}
          </div>
        </div>
      </div>
    </div>
  );
}
