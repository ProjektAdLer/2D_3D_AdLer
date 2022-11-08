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
import { logger } from "src/Lib/Logger";

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
  const [spaces] = useObservable<[number, string, boolean][]>(viewModel.spaces);

  // return if any of the observables is undefined
  if (
    name === undefined ||
    description === undefined ||
    goals === undefined ||
    elements === undefined ||
    requiredPoints === undefined ||
    requirements === undefined ||
    spaces === undefined
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
                <div key={element[1]} className="w-full">
                  <CheckBoxEntry className="w-full" checked={element[2]}>
                    <div className="flex flex-row justify-between w-full lg:w-3/4">
                      <div className="flex flex-row items-center gap-x-2">
                        <div className="w-6 ml-2 mr-2 lg:w-8">
                          {getElementIcon(element[0])}
                        </div>
                        <div className="flex flex-row items-center ml-1">
                          {" " + element[1] + " (" + element[0] + ")"}
                        </div>
                      </div>
                      <div className="flex flex-row items-center ml-1 place-items-end">
                        {/* //TODO: Add real current points  */}
                        {element[2]
                          ? element[3] + "/" + element[3]
                          : "0/" + element[3]}
                        <img
                          src={coinIcon}
                          className="self-center w-6 ml-1 lg:w-8"
                          alt="Coin-Icon"
                        ></img>
                      </div>
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
      {elements.length > 0 && (
        <div className="pb-2 border-b border-gray-500">
          <div className="self-center ml-2 text-lg text-white roboto-black text-shadow">
            Maximal erreichbare Punkte:
          </div>
          <div className="items-start ml-6 text-lg roboto-regular">
            {elements.reduce((acc, element) => acc + element[3], 0)}
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
              let name;
              let completed;
              const lookup = spaces.find((space) => space[0] === requirement);
              if (lookup === undefined) {
                logger.warn("Requirement not found in spaces.");
                return;
              }
              name = lookup[1];
              completed = lookup[2];

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
        let requiredSpaces = spaces.find((space) => space[0] === requirement);
        return requiredSpaces !== undefined ? requiredSpaces[2] : false;
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
