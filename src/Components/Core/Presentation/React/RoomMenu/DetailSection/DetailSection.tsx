import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import CheckBoxEntry from "./CheckBoxEntry";
import DetailSectionViewModel from "./DetailSectionViewModel";
import roomIcon from "../../../../../../Assets/icons/lernraum_icon.svg";

export default function DetailSection() {
  const [viewModel] = useBuilder<DetailSectionViewModel, undefined>(
    BUILDER_TYPES.IDetailSectionBuilder
  );

  return (
    <div className="grid w-[100%] justify-start">
      <div className="flex flex-row items-center p-1 rounded-lg shadow-lg">
        <img
          src={roomIcon}
          className="xl:w-8 lg:w-6 md:w-2 sm:w-2"
          alt="Lernraum-Icon"
        ></img>
        <div className="ml-2 text-2xl text-white roboto-black text-shadow">
          {viewModel.name.Value}
        </div>
      </div>

      <div className="self-center ml-2 text-lg text-white roboto-black text-shadow">
        Beschreibung:
      </div>
      <div className="items-start ml-6 text-lg roboto-regular">
        {viewModel.description.Value}
      </div>

      <div className="self-center ml-2 text-lg text-white roboto-black text-shadow">
        Bedingungen Freischaltung:
      </div>
      <div className="items-start ml-6 text-lg roboto-regular">
        {viewModel.requirements.Value.map((requirement) => {
          return (
            <CheckBoxEntry checked={requirement[0]} text={requirement[1]} />
          );
        })}
      </div>

      <div className="self-center ml-2 text-lg text-white roboto-black text-shadow">
        Bedingungen Abschluss:
      </div>
      <div className="items-start ml-6 text-lg roboto-regular">
        {viewModel.conditions.Value.map((condition) => {
          return <CheckBoxEntry checked={condition[0]} text={condition[1]} />;
        })}
      </div>

      <div className="self-center ml-2 text-lg text-white roboto-black text-shadow">
        Lernelemente:
      </div>
      <div className="items-start ml-6 text-lg roboto-regular">
        {viewModel.learningElements.Value.map((learningElement) => {
          // TODO: add learning element icon
          return (
            <div className="flex flex-row">
              <div>{learningElement[0] + " " + learningElement[1]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
