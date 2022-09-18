import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import CheckBoxEntry from "./CheckBoxEntry";
import DetailSectionViewModel from "./DetailSectionViewModel";
import spaceIcon from "../../../../../../Assets/icons/lernraum_icon.svg";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import { ElementTypeStrings } from "../../../Babylon/Elements/Types/ElementTypes";

export default function DetailSection() {
  const [viewModel] = useBuilder<DetailSectionViewModel, undefined>(
    BUILDER_TYPES.IDetailSectionBuilder
  );

  const [name] = useObservable<string>(viewModel.name);
  const [description] = useObservable<string>(viewModel.description);
  const [requirements] = useObservable<[boolean, string][]>(
    viewModel.requirements
  );
  const [conditions] = useObservable<[boolean, string][]>(viewModel.conditions);
  const [elements] = useObservable<[ElementTypeStrings, string][]>(
    viewModel.elements
  );

  if (
    name === undefined ||
    description === undefined ||
    requirements === undefined ||
    conditions === undefined ||
    elements === undefined
  )
    return null;

  return (
    <div className="grid w-[100%] justify-start">
      <div className="flex flex-row items-center p-1 rounded-lg">
        <img
          src={spaceIcon}
          className="xl:w-8 lg:w-6 md:w-2 sm:w-2"
          alt="Lernraum-Icon"
        ></img>
        <div className="ml-2 text-2xl text-white roboto-black text-shadow">
          {name}
        </div>
      </div>

      {description !== "" && (
        <div>
          <div className="self-center ml-2 text-lg text-white roboto-black text-shadow">
            Beschreibung:
          </div>
          <div className="items-start ml-6 text-lg roboto-regular">
            {description}
          </div>
        </div>
      )}

      {requirements.length > 0 && (
        <div>
          <div className="self-center ml-2 text-lg text-white roboto-black text-shadow">
            Bedingungen Freischaltung:
          </div>
          <div className="items-start ml-6 text-lg roboto-regular">
            {requirements.map((requirement) => {
              return (
                <CheckBoxEntry
                  key={requirement[1]}
                  checked={requirement[0]}
                  text={requirement[1]}
                />
              );
            })}
          </div>
        </div>
      )}

      {conditions.length > 0 && (
        <div>
          <div className="self-center ml-2 text-lg text-white roboto-black text-shadow">
            Bedingungen Abschluss:
          </div>
          <div className="items-start ml-6 text-lg roboto-regular">
            {conditions.map((condition) => {
              return (
                <CheckBoxEntry
                  key={condition[1]}
                  checked={condition[0]}
                  text={condition[1]}
                />
              );
            })}
          </div>
        </div>
      )}

      {elements.length > 0 && (
        <div>
          <div className="self-center ml-2 text-lg text-white roboto-black text-shadow">
            Lernelemente:
          </div>
          <div className="items-start ml-6 text-lg roboto-regular">
            {elements.map((element) => {
              // TODO: add learning element icon
              return (
                <div key={element[1]} className="flex flex-row">
                  <div>{element[0] + " " + element[1]}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
