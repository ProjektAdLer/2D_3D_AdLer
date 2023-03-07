import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import SpaceDetailViewModel, {
  SpaceDetailSpaceData,
} from "./SpaceDetailViewModel";
import spaceIcon from "../../../../../../Assets/icons/13-space/space-icon-nobg.svg";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import { ElementTypeStrings } from "../../../../Domain/Types/ElementTypes";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import SpaceDetailController from "./SpaceDetailController";
import { getElementIcon } from "../../../Utils/GetIcon";
import coinIcon from "../../../../../../Assets/icons/08-coin/coin-icon-nobg.svg";
import { logger } from "src/Lib/Logger";
import TextWithLineBreaks from "~ReactComponents/ReactRelated/ReactBaseComponents/TextWithLineBreaks";
import greenSwosh from "../../../../../../Assets/icons/17-1-solution-check/check-solution-icon-nobg.svg";

export default function SpaceDetail() {
  const [viewModel, controller] = useBuilder<
    SpaceDetailViewModel,
    SpaceDetailController
  >(BUILDER_TYPES.ISpaceDetailBuilder);

  const [name] = useObservable<string>(viewModel.name);
  const [description] = useObservable<string>(viewModel.description);
  const [goals] = useObservable<string>(viewModel.goals);
  const [elements] = useObservable<
    [ElementTypeStrings, string, boolean, number][]
  >(viewModel.elements);
  const [requiredPoints] = useObservable<number>(viewModel.requiredPoints);
  const [requirements] = useObservable<number[]>(viewModel.requirements);
  const [spaces] = useObservable<SpaceDetailSpaceData[]>(viewModel.spaces);

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
      <div className="flex flex-row items-center justify-between p-1 pb-4 border-b border-gray-500">
        <div className="flex flex-row">
          <img src={spaceIcon} className="w-6 xl:w-8" alt="Lernraum-Icon"></img>
          <div className="ml-2 text-lg text-white lg:text-2xl roboto-black text-shadow">
            {name}
          </div>
        </div>
        {viewModel.requirements.Value.every((requirement) => {
          // check for each requirement if the space is completed
          let requiredSpaces = spaces.find((space) => space.id === requirement);
          return requiredSpaces !== undefined
            ? requiredSpaces.isCompleted
            : false;
        }) && (
          <StyledButton
            shape="freefloatleft"
            className="mt-2 mb-2"
            onClick={controller.onSpaceButtonClicked}
          >
            {"Lernraum betreten!"}
          </StyledButton>
        )}
      </div>

      {description !== "" && (
        <div className="pb-2 border-b border-gray-500">
          <div className="self-center ml-2 text-white lg:mb-2 roboto-black text-shadow">
            Beschreibung:
          </div>
          <div className="items-start ml-6 roboto-regular">
            <TextWithLineBreaks text={description} />
          </div>
        </div>
      )}
      {goals !== "" && (
        <div className="pb-2 border-b border-gray-500">
          <div className="self-center ml-2 text-white lg:mb-2 roboto-black text-shadow">
            Lernziele:
          </div>
          <div className="items-start ml-6 lg:text:lg roboto-regular">
            <TextWithLineBreaks text={goals} />
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
                  <div className="flex flex-row justify-between w-full xl:w-3/4">
                    <div className="flex flex-row items-center gap-x-2">
                      <div className="relative w-6 ml-2 mr-2 lg:w-8">
                        {getElementIcon(element[0])}
                        {element[2] && (
                          <img
                            src={greenSwosh}
                            alt=""
                            className="absolute h-4 lg:h-6 bottom-3 left-4 lg:bottom-6 lg:left-6 "
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
                        className="self-center w-6 ml-1 lg:w-8"
                        alt="Coin-Icon"
                      ></img>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {!!requiredPoints && (
        <div className="pb-2">
          <div className="flex flex-row justify-between w-full pb-2 xl:w-3/4">
            <div className="self-center ml-2 text-lg text-white roboto-black text-shadow">
              Benötigte Punkte:
            </div>
            <div className="flex flex-row items-start pb-2 ml-6 text-lg roboto-regular">
              {requiredPoints}
              <img
                src={coinIcon}
                className="self-center w-6 ml-1 lg:w-8"
                alt="Coin-Icon"
              ></img>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full xl:w-3/4">
            <div className="self-center ml-2 text-lg text-white roboto-black text-shadow">
              Maximal erreichbare Punkte:
            </div>
            <div className="flex flex-row items-start ml-6 text-lg roboto-regular">
              {elements.reduce((acc, element) => acc + element[3], 0)}
              <img
                src={coinIcon}
                className="self-center w-6 ml-1 lg:w-8"
                alt="Coin-Icon"
              ></img>
            </div>
          </div>
        </div>
      )}
      {elements.length > 0 && (
        <div className="pb-2 border-b border-gray-500"></div>
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
              const lookup = spaces.find((space) => space.id === requirement);
              if (lookup === undefined) {
                logger.warn("Requirement not found in spaces.");
                return undefined;
              }
              name = lookup.name;
              completed = lookup.isCompleted;

              return (
                <div className="relative flex my-4 ml-2" key={name + completed}>
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
    </div>
  );
}
