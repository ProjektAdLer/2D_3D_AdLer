import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import CheckBoxEntry from "./CheckBoxEntry";
import DetailSectionViewModel from "./DetailSectionViewModel";
import spaceIcon from "../../../../../../Assets/icons/13-space/space-icon-nobg.svg";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import { ElementTypeStrings } from "../../../../Domain/Types/ElementTypes";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import DetailSectionController from "./DetailSectionController";
import { getElementIcon } from "../../../Utils/GetIcon";
import coinIcon from "../../../../../../Assets/icons/coin_icon.svg";

export default function DetailSection() {
  const [viewModel, controller] = useBuilder<
    DetailSectionViewModel,
    DetailSectionController
  >(BUILDER_TYPES.IDetailSectionBuilder);

  const [name] = useObservable<string>(viewModel.name);
  const [description] = useObservable<string>(viewModel.description);
  const [goals] = useObservable<string>(viewModel.goals);
  const [elements] = useObservable<
    [ElementTypeStrings, string, boolean, number][]
  >(viewModel.elements);
  const [requiredPoints] = useObservable<number>(viewModel.requiredPoints);
  const [requirements] = useObservable<number[]>(viewModel.requirements);
  const [spaces] = useObservable<[number, string][]>(viewModel.spaces);
  const [spacesCompleted] = useObservable<[number, boolean][]>(
    viewModel.spacesCompleted
  );

  // return if any of the observables is undefined
  if (
    name === undefined ||
    description === undefined ||
    goals === undefined ||
    elements === undefined ||
    requiredPoints === undefined ||
    requirements === undefined ||
    spaces === undefined ||
    spacesCompleted === undefined
  )
    return null;

  return (
    <div className="flex flex-col gap-2 w-[100%] overflow-auto">
      <div className="flex flex-row items-center p-1 pb-4 border-b border-gray-500">
        <img src={spaceIcon} className="w-6 xl:w-8" alt="Lernraum-Icon"></img>
        <div className="ml-2 text-lg text-white lg:text-2xl roboto-black text-shadow">
          {name}
        </div>
      </div>

      {description !== "" && (
        <div className="pb-2 border-b border-gray-500">
          <div className="self-center ml-2 text-white lg:mb-2 roboto-black text-shadow">
            Beschreibung:
          </div>
          <div className="items-start ml-6 roboto-regular">{description}</div>
        </div>
      )}
      {goals !== "" && (
        <div className="pb-2 border-b border-gray-500">
          <div className="self-center ml-2 text-white lg:mb-2 roboto-black text-shadow">
            Lernziele:
          </div>
          <div className="items-start ml-6 lg:text:lg roboto-regular">
            {goals}
          </div>
        </div>
      )}
      {elements.length > 0 && (
        <div className="pb-2 border-b border-gray-500">
          <div className="self-center ml-2 text-white lg:mb-2 roboto-black text-shadow">
            Lernelemente:
          </div>
          <div className="flex flex-col items-start ml-6 lg:text-lg roboto-regular">
            {elements.map((element) => {
              return (
                <div key={element[1]} className="">
                  <CheckBoxEntry checked={element[2]}>
                    <div className="w-6 ml-2 mr-2 lg:w-8">
                      {getElementIcon(element[0])}
                    </div>
                    <div className="flex flex-row items-center ml-1">
                      {" " + element[1] + " (" + element[0] + ", " + element[3]}
                      <img
                        src={coinIcon}
                        className="self-center w-6 ml-1 lg:w-8"
                        alt="Coin-Icon"
                      ></img>
                      {" )"}
                    </div>
                  </CheckBoxEntry>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {!!requiredPoints && (
        <div className="pb-2 border-b border-gray-500">
          <div className="self-center ml-2 text-lg text-white roboto-black text-shadow">
            Benötigte Punkte:
          </div>
          <div className="items-start ml-6 text-lg roboto-regular">
            {requiredPoints}
          </div>
        </div>
      )}
      {requirements.length > 0 && (
        <div className="pb-2 border-b border-gray-500">
          <div className="self-center ml-2 text-lg text-white roboto-black text-shadow">
            Benötigte Räume zur Freischaltung:
          </div>
          <div className="items-start ml-6 text-lg roboto-regular">
            {requirements.map((requirement) => {
              let name = spaces.find((space) => space[0] === requirement)![1];
              let completed = spacesCompleted.find(
                (space) => space[0] === requirement
              )![1];

              return (
                <CheckBoxEntry key={name + requirement} checked={completed}>
                  {name}
                </CheckBoxEntry>
              );
            })}
          </div>
        </div>
      )}
      {viewModel.requirements.Value.every((requirement) => {
        // check for each requirement if the space is completed
        let spaceCompletedTuple = spacesCompleted.find(
          (space) => space[0] === requirement
        );
        return spaceCompletedTuple !== undefined
          ? spaceCompletedTuple[1]
          : false;
      }) && (
        <StyledButton
          shape="freefloatleft"
          className="self-center mt-2 mb-2 justify-self-center"
          onClick={controller.onSpaceButtonClicked}
        >
          {"Lernraum '" + name + "' betreten!"}
        </StyledButton>
      )}
    </div>
  );
}
