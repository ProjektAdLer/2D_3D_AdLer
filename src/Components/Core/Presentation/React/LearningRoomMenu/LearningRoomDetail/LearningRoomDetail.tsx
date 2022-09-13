import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import CheckBoxEntry from "./CheckBoxEntry";
import LearningRoomDetailViewModel from "./LearningRoomDetailViewModel";

export default function LearningRoomDetail() {
  const [viewModel] = useBuilder<LearningRoomDetailViewModel, undefined>(
    BUILDER_TYPES.ILearningRoomDetailBuilder
  );

  return (
    <div className="grid">
      <div>{viewModel.name.Value}</div>

      <div>Beschreibung:</div>
      <div>{viewModel.description.Value}</div>

      <div>Bedingungen Freischaltung:</div>
      <div>
        {viewModel.requirements.Value.map((requirement) => {
          return (
            <CheckBoxEntry checked={requirement[0]} text={requirement[1]} />
          );
        })}
      </div>

      <div>Bedingungen Abschluss:</div>
      <div>
        {viewModel.conditions.Value.map((condition) => {
          return <CheckBoxEntry checked={condition[0]} text={condition[1]} />;
        })}
      </div>

      <div>Lernelemente:</div>
      <div>
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
